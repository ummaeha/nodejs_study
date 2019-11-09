//어려움
function a() {
    console.log('A');
}
var a = function() { //이름이 없는 익명함수 -> javascript에서는 함수가 값이기 때문에 변수에 대입 가능
    console.log('A');
}
//a();

//함수 실행이 끝났으니 그 다음일을 하세요 -> 인자로 callback을 받음
function slowfunc(callback) {
    callback();
}

//callback 파라미터는 var a 가 가르키는 함수를 가르키게 됨
slowfunc(a);