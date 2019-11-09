var fs = require('fs');

/*
//readFileSync 동기적 -> A B C
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

//비동기적 (node.js가 선호함) , callback 을 주고 이를 마지막에 실행시킴 
// -> A C B 함수 안 코드가 나중에 실행된 것임 
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');