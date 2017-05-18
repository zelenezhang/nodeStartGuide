var exec=require('child_process').exec//从node环境下执行shell命令
var querystring=require('querystring')

function start(response,postData){
	console.log('request handler "start" was called')
	//获取当前路径下的所有文件('ls-lah'),然后显示在浏览器
	//响应由服务器完成,处理程序只是返回响应处理结果
	//这样启动服务器后网页显示内容为empty，因为exec使用了回调函数stdout
	//代码同步执行，调用exec后立即执行返回语句，此时回调函数还没有执行到，exec异步执行，content仍是原始内容
	//ls-lah执行完后边函数才会被调用
	// var content='empty'
	// exec('ls-lah',(error,stdout,stderr)=>{
	// 	content=stdout
	// })
	// return content
	// exec('ls-lah',(error,stdout,stderr)=>{
	// 	response.writeHead(200,{'Content-Type':'text/plain'})
	// 	response.write(stdout)
	// 	response.end()
	// })

	var body='<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>'
    response.writeHead(200,{'Content-Type':'text/html'})
	response.write(body)
	response.end()
}

function upload(response,postData){
	console.log('request handler "upload" was called')
	console.log(postData)
	response.writeHead(200,{'Content-Type':'text/plain'})
	response.write('You have sent:'+ querystring.parse(postData).text)
	response.end()
}

exports.start=start
exports.upload=upload
