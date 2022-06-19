$(function(){
    //点击去注册账号的链接
    $('#link_reg').on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击去登录账号的链接
    $('#link_login').on('click', function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

//从layui中获取form对象
const form = layui.form
const layer = layui.layer

//通过form.verify()函数自定义规则
form.verify({
    pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
      repwd: function(value){
//通过形参拿到的是确认密码框中的内容
//还需要拿到密码框中的内容
//然后进行一次等于的判断
//如果判断失败，则return一个提示消息即可
var pwd=$('.reg-box [name=password]')
  .val()   
if(pwd !==value){
    return'两次密码不一致!'
}

}
})


//监听注册表单的提交事件
$('#form_reg').on('submit',(e)=>{
//1.阻止默认的提交行为
e.preventDefault()
//2.发起AjAX的post请求
$.ajax({
    method: 'POST',
        url:  '/api/reguser',
        data: {
            username: $("#form_reg [name=username").val(),
            password: $("#form_reg [name=password").val(),},
            success: (res) => {
 if(res.status !==0){
        return layer.msg(res.message)
        
    }
    layer.msg('注册成功,请登录!')
    $("#link_login").click()
}
})
})
//监听登录表单的提交事件
$('#form_login').submit((e) =>{
    //阻止默认提交行为
    e.preventDefault()
//2.发起AjAX的post请求
$.ajax({
       method: 'POST',
        url:  '/api/login',
        //快速获取到表单中的数据
        data: $('#form_login').serialize(),
         success: (res) => {
            if(res.status !==0){
        return layer.msg(res.message)
      
    }
    layer.msg("登录成功！")
  localStorage.setItem('token',res.token)
  //跳转到后台主页
  location.href ='/index.html'
}
})
})
})

