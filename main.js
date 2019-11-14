//조건에 따라 다르게 동작하는 어플리케이션 
//step3 : template 이라고 동일하게 이름붙여진 애들을 객체로 정리해보겠음!
var http = require('http'); //node.js 가 가지고있는 모듈을 가져오는 것
var fs = require('fs');
var url = require('url'); //url이라는 모듈을 url이라는 변수를 통해 사용할거다
var qs = require('querystring');

var template = {
  html:function(title, list, body, control) {
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
      ${control}
      ${body}
    </body>
    </html>
    `;
  },
  list:function templateLIST(filelist) {
    //[ 'CSS', 'HTML', 'JavaScript' ]라고 data 디렉토리에 있는 파일들이 담겨있는 리스트인 filelist에서 불러옴
    var list = '<ul>';
    var i = 0 ;
    while(i < filelist.length) {
      list = list + `<li><a href="/?id=${filelist[i]}"> ${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list + '</ul>';
    return list;
  }
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
      if(pathname === '/'){ //home으로 갔느냐?
       if(queryData.id === undefined) {
        //query스트링에 따라 파일명이 생성됨 - data 디렉토리 내 각 이름(HTML,CSS,JavaScript)
        //fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
          fs.readdir('./data', function(error, filelist){
          //console.log(filelist); 로그 찍어보면 [ 'CSS', 'HTML', 'JavaScript' ]가 나옴
            var title ='Welcome';
            var description = 'Hello, Node.js!'
            /*var list = templateLIST(filelist);
            //1단제목은 동적으로, 웹페이지 내용은 정적으로 만드는데 성공!
            var template = templateHTML(title, list, 
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a>` //control 부분
              );
            response.writeHead(200);
            response.end(template);*/
            //template 객체를 작성하면서 새로 쓴 부분
            var list = template.list(filelist);
            var html = template.html(title, list, 
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a>`
              );
            response.writeHead(200);
            response.end(html);
            })
      //}); 
        } else { //id 값이 있을 때
          fs.readdir('./data', function(error, filelist){
            fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
              var title = queryData.id;
              var list = templateLIST(filelist);
              var template = templateHTML(title, list, 
                `<h2>${title}</h2>${description}`,
                ` <a href="/create">create</a> 
                  <a href="/update?id=${title}">update</a>
                  <form action="/delete_process" method="post">
                    <input type="hidden" name="id" value="${title}">
                    <input type="submit" value="delete">
                  </form>
                `
                );
              response.writeHead(200);
              response.end(template);
            });
          });
        } 
      }else if(pathname ==='/create'){
        fs.readdir('./data', function(error, filelist){
            var title ='WEB - create';
            //${body}에 들어가는 부분
            var list = templateLIST(filelist);
            var template = templateHTML(title, list, `
              <form action="/create_process" method="post"> 
              <p><input type="text" name="title" placeholder="title"></p>
              <p>
                  <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
                  <input type="submit">
              </p>
              </form>
            `,'');
            response.writeHead(200);
            response.end(template);
            });
      } else if(pathname === '/create_process') {
        //form 에서 post형식으로 작성된 내용을 nodejs 로 가져오려면 어떻게 해야할 것인가?
        var body = ''; //createServer로 전송된 callback 함수 
                      // request : 사용자가 요청할 때 보낸 정보 / response : 응답할 때 우리가 웹브라우저에게 전송할 정보들
        request.on('data', function(data){ //post방식으로 전송된 데이터가 많은 경우 서버가 조각조각으로 수신하면서 콜백함수 호출
          body = body + data; //콜백이 실행될 때마다, body에 추가해줌
        });
        request.on('end', function(){ //더이상 들어올 정보가 없으면 end다음에 있는 콜백함수가 실행됨.
          var post = qs.parse(body); //post라는 변수에 지금까지의 정보를 넣어줌 {title : 'Node.js'} -> 이런식으로 터미널에 출력됨
          var title = post.title;
          var description = post.description;
          fs.writeFile(`data/${title}`, description,'utf8',function(err){
            response.writeHead(302, {Location:`/?id=${title}`});
            //response.writeHead(200); //200 -> 성공했다는 뜻!
            response.end(); //파일 생성이 완료되면 success
          })
        });

      } else if(pathname === '/update'){
        fs.readdir('./data', function(error, filelist){
          var list = templateLIST(filelist);
          fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
            var title = queryData.id;
            var template = templateHTML(title, list, 
              `
              <form action="/update_process" method="post"> 
              <input type="hidden" name="id" value="${title}"> 
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                  <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                  <input type="submit">
              </p>
              </form>
              `,
              `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
              );
            response.writeHead(200);
            response.end(template);
        });
      });
      } else if (pathname ==='/update_process'){
            var body = ''; 
            request.on('data', function(data){ 
            body = body + data; 
          });
          request.on('end', function(){ 
            var post = qs.parse(body); 
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function(error){
              fs.writeFile(`data/${title}`, description,'utf8',function(err){
              response.writeHead(302, {Location:`/?id=${title}`});
              response.end(); 
              })
          })
          console.log(post);
          
      });
      } else if (pathname ==='/delete_process'){
        var body = ''; 
        request.on('data', function(data){ 
          body = body + data; 
        });
        request.on('end', function(){ 
          var post = qs.parse(body); 
          var id = post.id;
          fs.unlink(`data/${id}`,function(error){
            response.writeHead(302, {Location:`/`});
            response.end(); 
          })
        }); 
      } else {
      response.writeHead(404);
      response.end('Not Found');
      }
});
app.listen(3001);
