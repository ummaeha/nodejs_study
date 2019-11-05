var args = process.argv;
console.log(args[2]);
console.log(args);
console.log('A');
if(args[2] === '1') {
    console.log('C1');
} else {
    console.log('c2');
}
console.log('D');