var str = '11001asds11';

var returnNumber = function( str ) {
  var num = 0;
  var arr = str.split( "1" );
  for ( var i = 0; i <= arr.length; i++ ) {
    if( Number(arr[i]) == 0 ) {
      num++;
    }
    return num;
  }
}

console.log( returnNumber( str ));
