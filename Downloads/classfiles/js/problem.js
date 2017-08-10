var str='11000011ahg1000000100aa1';

var returnNumber = function(str){
  var num=0,j=0;
  var arr=str.split('1');

  /*for(var i=0;i<arr.length;i++)
  {
    if(arr[i]!="")
      {var x= Number(arr[i]);
      if(x == 0)
        num++;}
  }*/

  arr.forEach(function(val,index)
{
  if(val!='' && (Number(val)==0))
    num++;
});
  return num;
}
//alert(arr);
//alert(returnNumber(str));
console.log(returnNumber(str));
