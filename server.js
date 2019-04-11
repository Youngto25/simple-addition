var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('��ָ���˿ںźò�����\nnode server.js 8888 ����������')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** �����￪ʼ�������治Ҫ�� ************/

  console.log('����˵������ѯ�ַ�����·��\n' + pathWithQuery)

  if(path === '/'){
    var string = fs.readFileSync('./index.html','utf8')
    var num = fs.readFileSync('./database','utf8')
    console.log(num)
    string = string.replace('Blake_Yang',num)
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/style.css'){
    var string = fs.readFileSync('./style.css','utf8')
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }else if(path === '/main.js'){
    var string = fs.readFileSync('./main.js','utf8')
    response.setHeader('Content-Type', 'application/javascript')
    response.write(string)
    response.end()
  }else if(path === '/pay'){
    //&& method.toUpperCase() === 'POST'删除这一条件
    var num = fs.readFileSync('./database','utf8')
    var newNum = num - 1
    fs.writeFileSync('./database',newNum)
    response.setHeader('Content-Type','application/javascript')
    //此处为img的数据类型
    //response.setHeader('Content-Type','image/jpg')
    response.statusCode = 200
    response.write(`
      alert("script在执行")
      acount.innerText = acount.innerText - 1`)
    //此处为img上传内容
    //response.write(fs.readFileSync('./2.jpg'))
    /*
    if(Math.randow()>0.5){
      fs.writeFileSync('./database',newNum)
      response.setHeader('Content-Type','image/jpg')
      response.statusCode = 200
      response.write(fs.readFileSync('./2.jpg'))
    }else{
      response.statusCode = 400
      response.write('fail')
    }
    */
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('找不到对应的路径，你需要自行修改')
    response.end()
  }

  /******** ������������治Ҫ�� ************/
})

server.listen(port)
console.log('���� ' + port + ' �ɹ�\n�����ڿ���ת��720��Ȼ���õ緹�Ҵ� http://localhost:' + port)