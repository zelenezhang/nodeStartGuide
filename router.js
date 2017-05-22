//路由选择
function route(pathname,handler,response,request){
	console.log(`About to route a request for ${pathname}`)
	if (typeof handler[pathname]=='function') {
		handler[pathname](response,request)//执行相应的事件处理函数
	} else{
		console.log(`No request for ${pathname}`)
		response.writeHead(404,{'Content-Type':'text/plain'})
		response.write('404 Not found')
		response.end()
	}
}
exports.route=route