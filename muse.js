// var M = {
//      v:'v',
//      f:function() {
//          console.log(this.v);
//      }
// }

//모듈을 가져올 때 require
var part = require('./mpart.js');
console.log(part); //mpart에서 가져온 모듈 객체가 콘솔에 나옴
part.f();