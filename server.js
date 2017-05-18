var http=require('http')//请求node自带http模块
var url=require('url')

var start=(route,handler)=>{
	http.createServer((request,response)=>{//有请求事件时触发
		//获取到请求
		if (request.url=='/favicon,ico') { request.end() }
		var pathname=url.parse(request.url).pathname//请求的url
		console.log(`request form ${pathname} received`)
		request.setEncoding('utf-8')
		//监听request事件
		var postData=''
		request.addListener('data',function(piece){//
			//有新数据到来时执行
			postData+=piece
			console.log(`Recieved postData piece: ${piece} .`)
		})
		request.addListener('end',function(){
			//所有数据接收完毕后执行
			//路由请求
			route(pathname,handler,response,postData)
		})

		
		//请求响应
		// response.writeHead(200,{'Content-Type':'text/plain'})
		// response.write('Hello world')
		// response.end()
	}).listen(8888)//监听8888号端口

	console.log('server start')
}

exports.start=start//导出创建服务器的函数，以便在其他模块中使用
