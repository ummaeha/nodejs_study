//자바스크립트에서 함수는 처리해야할 일에 대한 정보를 담고있는 구문인 동시에 값임
//변수에 넣을 수 있다면, 값이다. 
//즉, 함수는 값이다 
var f = function() {
    console.log(1+1);
    console.log(1+2);
}
console.log(f);
f();
//cf, if문, while문은 값이 아님

//서로 연관된 데이터를 그루핑하는 객체
var a = [f];
a[0](); // 2, 3 이 인쇄됨

var o = {
    func:f
}
o.func();