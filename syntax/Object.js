var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]); //k8805
var i = 0;
while(i<members.length) {
    console.log('arrray loop', members[i]);
    i++;
}

//Object - 오브젝트의 리터럴은 중괄호{}임
var roles = { //key : value
    'programmer' : 'yangha',
    'designer' : 'seoyoung',
    'manager' : 'hayan'
}
console.log(roles.designer); //seoyoung
console.log(roles['designer']); //key값을 문자로 전달하는 것들 통해서도 value를 가져올 수 있음

//객체에 있는 걸 꺼내서 반복문으로 처리함

for(var name in roles) { //name 자리에는 아무거나 들어가도됨
    console.log('object =>', name,'/ value => ', roles[name]);
}