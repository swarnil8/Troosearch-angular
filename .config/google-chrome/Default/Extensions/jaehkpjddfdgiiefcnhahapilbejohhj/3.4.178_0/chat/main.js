/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var stringExt = ext_id.toString() + ext_auth.toString();
localStorage.loaded = 0;
localStorage.open = 0;
// Initializes FriendlyChat.
function FriendlyChat() {
  this.checkSetup();

  // Shortcuts to DOM Elements.
  this.messageList = document.getElementById('messages-bh');
  this.messageForm = document.getElementById('message-form-bh');
  this.messageInput = document.getElementById('message');
  this.submitButton = document.getElementById('submit');
  this.submitImageButton = document.getElementById('submitImage');
  this.imageForm = document.getElementById('image-form-bh');
  this.mediaCapture = document.getElementById('mediaCapture');
  this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');
  // this.signInButton = document.getElementById('sign-in');
  // this.signOutButton = document.getElementById('sign-out');
  this.signInSnackbar = document.getElementById('must-signin-snackbar');

  // console.log("after init " + this);

  // Saves message on form submit.
  this.messageForm.addEventListener('submit', this.saveMessage.bind(this));
  // this.signOutButton.addEventListener('click', this.signOut.bind(this));
  // this.signInButton.addEventListener('click', this.signIn.bind(this));

  // Toggle for the button.
  var buttonTogglingHandler = this.toggleButton.bind(this);
  this.messageInput.addEventListener('keyup', buttonTogglingHandler);
  this.messageInput.addEventListener('change', buttonTogglingHandler);

  // Events for image upload.
  // this.submitImageButton.addEventListener('click', function() {
  //   this.mediaCapture.click();
  // }.bind(this));
  // this.mediaCapture.addEventListener('change', this.saveImageMessage.bind(this));

  this.initFirebase();

  // console.log('Init done ' + stringExt);
   
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
FriendlyChat.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Loads chat messages history and listens for upcoming ones.
FriendlyChat.prototype.loadMessages = function() {
  // Reference to the /messages/ database path.
  stringExt = ext_id.toString() + ext_auth.toString();
  this.messagesRef = this.database.ref('chat/admin/' + stringExt + '/messages');
  this.messagesRef1 = this.database.ref('chat/messageQueue');
  this.messagesRef2 = this.database.ref('chat/users/' + stringExt + '/profile');
  this.messagesRefProfile = this.database.ref('chat/users/');
  // Make sure we remove all previous listeners.
  this.messagesRef.off();

  // Loads the last 12 messages and listen for new ones.
  var setMessage = function(data) {
    var val = data.val();
    // console.log(val);
    this.displayMessage(data.key, val.sender, val.message, val.photoUrl, val.imageUrl);
  }.bind(this);
  this.messagesRef.on('child_added', setMessage);
  this.messagesRef.on('child_changed', setMessage);
};

// Saves a new message on the Firebase DB.
FriendlyChat.prototype.saveMessage = function(e) {
  e.preventDefault();
  var d = new Date(),

    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var time =  days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
    var seconds = new Date().getTime();
  // Check that the user entered a message and is signed in.
  if (this.messageInput.value) {
    var currentUser = this.auth.currentUser;
    // console.log("User " + currentUser);
    // Add a new message entry to the Firebase Database.

    var profileObj = {};
    profileObj[stringExt] = {};
    profileObj[stringExt].profile = {};
    if(email!=""){
       profileObj[stringExt]['profile'].email = email;
    }
    
    profileObj[stringExt]['profile'].last_msg = "";
    profileObj[stringExt]['profile'].timestamp = 23;
    profileObj[stringExt]['profile'].name = "User" + ext_id;
    profileObj[stringExt]['profile'].url = window.location.href;
    profileObj[stringExt]['profile'].ua = navigator.userAgent;

    // console.log(JSON.stringify(profileObj));

    this.messagesRefProfile.update(profileObj).then(function() {
      // Clear message text field and SEND button state.
      // FriendlyChat.resetMaterialTextfield(this.messageInput);
      // this.toggleButton();
    }.bind(this)).catch(function(error) {
      // console.error('Error writing new message to Firebase Database', error);
    });


    this.messagesRef.push({
      type: "text",
      status: "0",
      sender: stringExt,
      message: this.messageInput.value,
      timestamp: time,
      // photoUrl: currentUser.photoURL || '/img/profile_placeholder.png'
    }).then(function() {
      // Clear message text field and SEND button state.
      // FriendlyChat.resetMaterialTextfield(this.messageInput);
      // this.toggleButton();
    }.bind(this)).catch(function(error) {
      // console.error('Error writing new message to Firebase Database', error);
    });


    this.messagesRef1.push({
      type: "text",
      status: "0",
      sender: stringExt,
      message: this.messageInput.value,
      timestamp: time
      // photoUrl: currentUser.photoURL || '/images/profile_placeholder.png'
    }).then(function() {
      // Clear message text field and SEND button state.
      // FriendlyChat.resetMaterialTextfield(this.messageInput);
      // this.toggleButton();
    }.bind(this)).catch(function(error) {
      // console.error('Error writing new message to Firebase Database', error);
    });

    this.messagesRef2.update({
      last_msg: this.messageInput.value,
      timestamp: -seconds
      // photoUrl: currentUser.photoURL || '/images/profile_placeholder.png'
    }).then(function() {
      // Clear message text field and SEND button state.
      FriendlyChat.resetMaterialTextfield(this.messageInput);
      this.toggleButton();
    }.bind(this)).catch(function(error) {
      // console.error('Error writing new message to Firebase Database', error);
    });

  }
};

// Sets the URL of the given img element with the URL of the image stored in Firebase Storage.
FriendlyChat.prototype.setImageUrl = function(imageUri, imgElement) {
  // If the image is a Firebase Storage URI we fetch the URL.
  if (imageUri.startsWith('gs://')) {

    imgElement.src = FriendlyChat.LOADING_IMAGE_URL; // Display a loading image first.
    this.storage.refFromURL(imageUri).getMetadata().then(function(metadata) {
      imgElement.src = metadata.downloadURLs[0];
    });
  } else {
    imgElement.src = imageUri;
  }
};

// Saves a new message containing an image URI in Firebase.
// This first saves the image in Firebase storage.
FriendlyChat.prototype.saveImageMessage = function(event) {
  var file = event.target.files[0];

  // Clear the selection in the file picker input.
  this.imageForm.reset();

  // Check if the file is an image.
  if (!file.type.match('image.*')) {
    var data = {
      message: 'You can only share images',
      timeout: 2000
    };
    this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
    return;
  }
  // Check if the user is signed-in
  // Check if the user is signed-in
  if (this.checkSignedInWithMessage()) {

    // We add a message with a loading icon that will get updated with the shared image.
    var currentUser = this.auth.currentUser;
    this.messagesRef.push({
      name: currentUser.displayName,
      sender: stringExt,
      status: "0",
      timestamp: Math.floor(Date.now() / 1000),
      imageUrl: FriendlyChat.LOADING_IMAGE_URL,
      photoUrl: currentUser.photoURL || '/img/profile_placeholder.png'
    }).then(function(data) {

      // Upload the image to Firebase Storage.
      this.storage.ref(currentUser.uid + '/' + Date.now() + '/' + file.name)
          .put(file, {contentType: file.type})
          .then(function(snapshot) {
            // Get the file's Storage URI and update the chat message placeholder.
            var filePath = snapshot.metadata.fullPath;
            data.update({imageUrl: this.storage.ref(filePath).toString()});
          }.bind(this)).catch(function(error) {
        // console.error('There was an error uploading a file to Firebase Storage:', error);
      });
    }.bind(this));


    this.messagesRef1.push({
      name: currentUser.displayName,
      sender: stringExt,
      status: "0",
      timestamp: Math.floor(Date.now() / 1000),
      imageUrl: FriendlyChat.LOADING_IMAGE_URL,
      photoUrl: currentUser.photoURL || '/img/profile_placeholder.png'
    }).then(function(data) {

      // Upload the image to Firebase Storage.
      this.storage.ref(currentUser.uid + '/' + Date.now() + '/' + file.name)
          .put(file, {contentType: file.type})
          .then(function(snapshot) {
            // Get the file's Storage URI and update the chat message placeholder.
            var filePath = snapshot.metadata.fullPath;
            data.update({imageUrl: this.storage.ref(filePath).toString()});
          }.bind(this)).catch(function(error) {
        // console.error('There was an error uploading a file to Firebase Storage:', error);
      });
    }.bind(this));
  }
};

// Signs-in Friendly Chat.
FriendlyChat.prototype.signIn = function() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

// Signs-out of Friendly Chat.
FriendlyChat.prototype.signOut = function() {
  // Sign out of Firebase.
  this.auth.signOut();
};

// Triggers when the auth state change for instance when the user signs-in or signs-out.
FriendlyChat.prototype.onAuthStateChanged = function(user) {
    this.loadMessages();
  
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = user.photoURL; // Only change these two lines!
    var userName = user.displayName;  

    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');
    // this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    // this.signInButton.setAttribute('hidden', 'true');

    // We load currently existing chant messages.
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    // this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    // this.signInButton.removeAttribute('hidden');
  }
};

// Returns true if user is signed-in. Otherwise false and displays a message.
FriendlyChat.prototype.checkSignedInWithMessage = function() {
  return true;
  /* TODO(DEVELOPER): Check if user is signed-in Firebase. */
  if (this.auth.currentUser) {
    return true;
  }
  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  return false;
};

// Resets the given MaterialTextField.
FriendlyChat.resetMaterialTextfield = function(element) {
  element.value = '';
  // element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
};

// Template for messages.
FriendlyChat.MESSAGE_TEMPLATE =
    '<div class="message-container-bh">' +
      '<div class="spacing"><div class="pic admin-background-bh"></div></div>' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
    '</div>';

FriendlyChat.MESSAGE_TEMPLATE1 =
    '<div class="message-container-bh message-alignment-bh">' +
      '<div class="spacing"><div class="pic"></div></div>' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
    '</div>';


// A loading image URL.
FriendlyChat.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Displays a Message in the UI.
FriendlyChat.prototype.displayMessage = function(key, name, text, picUrl, imageUri) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    if(name != "admin")
      container.innerHTML = FriendlyChat.MESSAGE_TEMPLATE1;
    else
      container.innerHTML = FriendlyChat.MESSAGE_TEMPLATE;

    div = container.firstChild;
    div.setAttribute('id', key);
    this.messageList.appendChild(div);
  }
  if (picUrl) {
    div.querySelector('.pic').style.backgroundImage = 'url(' + picUrl + ')';
  }
  if(name!="admin"){
      div.querySelector('.name').textContent = "You";
  }
  else {
      div.querySelector('.name').textContent = name;
  }
  
  var messageElement = div.querySelector('.message');





  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.

    var replacedText, replacePattern1, replacePattern2, replacePattern3;

        //URLs starting with http://, https://, or ftp://
        replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        replacedText = messageElement.textContent.replace(replacePattern1, '<a style="color:blue" href="$1" target="_blank">$1</a>');

        //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        replacedText = replacedText.replace(replacePattern2, '$1<a style="color:blue" href="http://$2" target="_blank">$2</a>');

        //Change email addresses to mailto:: links.
        replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
        replacedText = replacedText.replace(replacePattern3, '<a style="color:blue" href="mailto:$1">$1</a>');



    messageElement.innerHTML = replacedText;
  } else if (imageUri) { // If the message is an image.
    var image = document.createElement('img');
    image.addEventListener('load', function() {
      this.messageList.scrollTop = this.messageList.scrollHeight;
    }.bind(this));
    this.setImageUrl(imageUri, image);
    messageElement.innerHTML = '';
    messageElement.appendChild(image);
  }
  // Show the card fading-in.
  setTimeout(function() {div.classList.add('visible')}, 1);
  this.messageList.scrollTop = this.messageList.scrollHeight;
  this.messageInput.focus();
};

// Enables or disables the submit button depending on the values of the input
// fields.
FriendlyChat.prototype.toggleButton = function() {
  if (this.messageInput.value) {
    this.submitButton.removeAttribute('disabled');
  } else {
    this.submitButton.setAttribute('disabled', 'true');
  }
};

// Checks that the Firebase SDK has been correctly setup and configured.
FriendlyChat.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
    // window.alert('You have not configured and imported the Firebase SDK. ' +
        // 'Make sure you go through the codelab setup instructions.');
  } else if (config.storageBucket === '') {
    // window.alert('Your Firebase Storage bucket has not been enabled. Sorry about that. This is ' +
    //     'actually a Firebase bug that occurs rarely. ' +
    //     'Please go and re-generate the Firebase initialisation snippet (step 4 of the codelab) ' +
    //     'and make sure the storageBucket attribute is not empty. ' +
    //     'You may also need to visit the Storage tab and paste the name of your bucket which is ' +
    //     'displayed there.');
  }
};


if(document.readyState === "complete"){
   startProcess();
}
else {
  window.onload = function() {
    startProcess();
  };
}

var alreadyDone = 0; 


function startProcess(){
    if(alreadyDone==0 && ext_id!="" && ext_id!="Unspecified" && ext_auth!=""){
       showChatOption();
       alreadyDone = 1;
    }
    else if(ext_id!="" && ext_id!="Unspecified"){

    }
    else {
      setTimeout(function(){startProcess(), 500});
    }
}

function showChatOption(){
  if(document.querySelectorAll('.hk-js-sB__chat').length > 0){
    document.querySelectorAll('.hk-js-sB__chat')[0].style.display = "block"; 
    document.querySelectorAll('.hk-js-sB__chat')[0].addEventListener("click", showIcon);
  }
  else {
    setTimeout(function(){showChatOption()},500);
  }
}

function showIcon(){
    if(localStorage.open==1){
      localStorage.open = 0;
      document.querySelectorAll('.hk-bhChat')[0].style.display = "none";
      return; 
    }
    localStorage.open = 1;
    if(localStorage.loaded==0){
        localStorage.loaded = 1;
        startInit();
        checkReady();
    }
    else {
        document.querySelectorAll('.hk-bhChat')[0].style.display = "block";
    }
    
}

function checkReady(){
    if(document.querySelectorAll('#messages-bh').length > 0 && window.firebase){
        stringExt = ext_id.toString() + ext_auth.toString();
        window.friendlyChat = new FriendlyChat(); 
    }
    else {
      setTimeout(function(){checkReady();}, 500);
    }
}

