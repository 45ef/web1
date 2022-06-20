//注意每次调用 $.get(),$.post()或者$.ajax()的时候，都会调用$.ajaxPrefilter（）这个函数，
//在这个函数中我们可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter((option) =>{
//在发起真正的ajax请求之前，统一拼接的根路径
option.url ='http://www.liulongbin.top:3007'+ option.url

//统一为有权限的接口,设置headers请求头
if(option.url.indexOf('/my/') !==-1){
  option.headers={
    Authorization:localStorage.getItem('token') || ''
}

}
//全局统一挂载complete
option.complete = function(res){
//console.log(res)
    if(res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败!'){
      localStorage.removeItem('token')
      location.href ='/login.html'
    }
  }

})