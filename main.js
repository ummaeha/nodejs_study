//조건에 따라 다르게 동작하는 어플리케이션 
var http = require('http');
var fs = require('fs');
var url = require('url'); //url이라는 모듈을 url이라는 변수를 통해 사용할거다

function templateHTML(title, list, body) {
  return ` 
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}
function templateLIST(filelist) {
  //[ 'CSS', 'HTML', 'JavaScript' ]라고 data 디렉토리에 있는 파일들이 담겨있는 리스트인 filelist에서 불러옴
  var list = '<ul>';
  var i = 0 ;
  while(i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}"> ${filelist[i]}</a></li>`;
    i++;
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined) {
        //query스트링에 따라 파일명이 생성됨 - data 디렉토리 내 각 이름(HTML,CSS,JavaScript)
        //fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
        fs.readdir('./data', function(error, filelist){
          //console.log(filelist); 로그 찍어보면 [ 'CSS', 'HTML', 'JavaScript' ]가 나옴
          var title ='Welcome';
          var description = 'Hello, Node.js!'
          var list = templateLIST(filelist);
          //1단제목은 동적으로, 웹페이지 내용은 정적으로 만드는데 성공!
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);

          response.writeHead(200);
          response.end(template);
          })
      //}); 
        } else { //id 값이 있을 때
          fs.readdir('./data', function(error, filelist){
            var list = templateLIST(filelist);

            fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
              //1단제목은 동적으로, 웹페이지 내용은 정적으로 만드는데 성공!
              var title = queryData.id;
              var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);;
              response.writeHead(200);
              response.end(template);
            });
          });
      } 
    }else {
        response.writeHead(404);
        response.end('Not Found');
      }
});
app.listen(3000);
