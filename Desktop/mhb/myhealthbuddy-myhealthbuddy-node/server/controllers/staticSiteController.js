const apiService = require('services/apiService'),
  apiConfig = require('config/apiConfig'),
  mailerService = require("services/mailerService"),
  path = require('path');

module.exports = function(app) {
  let dir = 'public';
  if (!app.get('isDevEnv')) {
    dir = 'dist';
  }

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'main.html'));
  });

  app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'about.html'));
  });
  app.get('/comingSoon', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'comingSoon.html'));
  });

  app.get('/calculate', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'calculate.html'));
  });

  app.get('/faq', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'faq.html'));
  });

  app.get('/programs', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'programs.html'));
  });

  app.get('/recipes', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'recipes.html'));
  });

  app.get('/services', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'services.html'));
  });

  app.get('/team', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'team.html'));
  });
  app.get('/stories', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'comingSoon.html'));
  });
  app.get('/process', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'process.html'));
  });
  app.get('/process/discover', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'discover.html'));
  });
  app.get('/process/design', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'design.html'));
  });
  app.get('/process/drive', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'drive.html'));
  });
  app.get('/process/destination', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'destination.html'));
  });
  app.get('/story-vasundhara', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'story-vasundhara.html'));
  });
  app.get('/story-mukesh', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'story-mukesh.html'));
  });
  app.get('/contact', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'contact.html'));
  });
  app.get('/blog', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'comingSoon.html'));
  });
  app.get('/blog/article', function(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', dir, 'article.html'));
  });

  app.post('/send-mail', function(req, res) {
    // console.log("sending mail   ");
    //  console.log(res);
    var data = res.req.body.data;
    var data = data.split('&');

    var name = data[0].split('name=');
    name = name[1];
    var emailto = data[1].split("email=");
    emailto = emailto[1];
    emailto = emailto.replace('%40', "@");
    // console.log(data[2]);
    var msg = data[2].split("message=");
    msg = msg[1];

    // console.log(name);
    // console.log(emailto);
    // console.log(msg);

    var mailtext = "<table><tr> <th>Name</th> <th>Email</th> <th>MESSAGE</th></tr> <tr><th>" + name + "</th> <th>" + emailto + "</th> <th>" + msg + "</th></tr> </table>";
    mailerService.Gmail(emailto, "New Mail MHB", mailtext);
  });
}
