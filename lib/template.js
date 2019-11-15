module.exports = {
    html:function(title, list, body, control) {
      return ` 
      <!doctype html>
      <html>
      <head>
        <title>WEB2 - ${title}</title>
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
    list:function(filelist) {
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

  
  