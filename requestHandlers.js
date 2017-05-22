//事件处理
//var exec=require('child_process').exec//从node环境下执行shell命令
var querystring=require('querystring')
var fs=require('fs')//将文件读取到服务器模块
var formidable=require('formidable')

function start(response,request){
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
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" />'+
    '<input type="submit" value="upload file" />'+
    '</form>'+
    '</body>'+
    '</html>'
    response.writeHead(200,{'Content-Type':'text/html'})
	response.write(body)
	response.end()
}
//将node-formidable整合到我们的upload请求处理程序中，用于将上传的图片保存到/tmp/test.png
function upload(response,request){
	console.log('request handler "upload" was called')
	var form=new formidable.IncomingForm()//在upload处理程序中对上传的文件进行处理，这样的话，我们就需要将request对象传递给node-formidable的form.parse函数。
	form.uploadDir='tmp'//不加这句就出错，why？？？？
	console.log('about to parse')
	form.parse(request,function(error,fields,files){
		console.log('parse done')
		fs.renameSync(files.upload.path,'./tmp/test.png')
		response.writeHead(200,{'Content-Type':'text/html'})
		response.write('recieved image:<br>')
		response.write('<img src="/show" />')
		response.end()
	})
	
}

function show(response){
	console.log('request handler show was called')
	fs.readFile('./tmp/test.png','binary',function(error,file){//node默认当前目录，不用再./tmp/test.png
		if (error) {
			response.writeHead(500,{'Content-Type':'text/plain'})
			response.write('error'+'\n')
			response.end()
		} else {
			response.writeHead(200,{'Content-Type':'text/plain'})
			response.write(file,'binary')
			response.end()
		}
	})
}

exports.show=show
exports.start=start
exports.upload=upload
