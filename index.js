var server=require('./server')//请求当前路径下的server文件
var router=require('./router')
var requestHandlers=require('./requestHandlers')

//通过依赖注入，将不同请求注入server，再注入路由，便于扩展
//依据路径不同进行路由
var handler={}
handler['/']=requestHandlers.start
handler['/start']=requestHandlers.start
handler['/upload']=requestHandlers.upload

//路由注入
server.start(router.route,handler)
