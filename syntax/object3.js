var o ={ //연관된 변수들을 하나의 객체에 정리
    v1: 'v1',
    v2: 'v2',
    f1:function () {
        console.log(this.v1);
    },
    f2:function () {
        console.log(this.v2);
    }
}

o.f1();
o.f2();