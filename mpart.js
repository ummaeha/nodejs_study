var M = {
    v:'v',
    f:function() {
        console.log(this.v);
    }
}
//모듈 바깥에서 사용할 수 있도록 export 하는 것
module.exports = M;