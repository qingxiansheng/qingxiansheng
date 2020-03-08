


#  单独的服务器 

#  前后端 分离  

#  my-server  后端服务器 

#  my-vue     前端 页面 

#  优点 
a.   各自独立开发  提高各自效率   
b.   避免甩锅  
c.   方便后期维护和迭代  

# 缺点
a.  跨域问题
b.  session / 反向代理  
c.  不能做SSR(服务器端渲染,不能做SEO优化)



app.set   设置中间件 
app.use   使用中间件  如果存在这个中间件就直接使用 
app.get
app.post
app.all