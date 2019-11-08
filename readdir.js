//특정 디렉토리에 있는 파일의 목록을 배열로 인쇄함
var testFolder = './data';
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist) {
    console.log(filelist);
})