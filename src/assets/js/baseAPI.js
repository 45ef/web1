//注意每次调用 $.get(),$.post()或者$.ajax()的时候，都会调用$.ajaxPrefilter（）这个函数，
//在这个函数中我们可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter((option) =>{
//在发起真正的ajax请求之前，统一拼接的根路径
option.url ='http://www.liulongbin.top:3007'+ option.url;
})