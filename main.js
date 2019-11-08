//조건에 따라 다르게 동작하는 어플리케이션 
var http = require('http');
var fs = require('fs');
var url = require('url'); //url이라는 모듈을 url이라는 변수를 통해 사용할거다


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
   
    console.log(queryData.id);
    
    if(pathname === '/'){
      if(queryData.id === undefined) {
        //query스트링에 따라 파일명이 생성됨 - data 디렉토리 내 각 이름(HTML,CSS,JavaScript)
        fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
        var title ='Welcome';
        var description = 'Hello, Node.js!'
        //1단제목은 동적으로, 웹페이지 내용은 정적으로 만드는데 성공!
        var template = ` 
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ol>
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template);
      }); } else {
        fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
          //1단제목은 동적으로, 웹페이지 내용은 정적으로 만드는데 성공!
          var title = queryData.id;
          var template = ` 
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ol>
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        });
      } 
    }else {
        response.writeHead(404);
        response.end('Not Found');
      }
});
app.listen(3000);
