//중복을 제거하면 좋은 코드가 된다!!!
var name = 'yangha'
var letter = name + " hello" + name + " my name "+ name + " is Joy";

console.log(letter);

letter =  `hello ${name} my name ${name} is Joy`;

console.log(letter);