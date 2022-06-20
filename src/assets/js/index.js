$(function(){
  //调用用户信息
  getUserInfo()
  
  const layer =layui.layer
  $('#btnLogout').on('click', function(){
    //提示用户是否确认退出
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
      //do something
      localStorage.removeItem('token')
      location.href ='/login.html'
      layer.close(index)
    })
})
})

//获取用户信息
function getUserInfo(){
$.ajax({
  method:'GET',
  url:"/my/userinfo",
 // headers:{
   // Authorization:localStorage.getItem('token') || ''
 // },
  success:(res) =>{
    console.log(res)
    if(res.status !== 0){
    return layer.msg('获取用户信息失败!')}

    layer.msg('获取用户信息成功!')
    
    renderAvatar(res.data)


  }
  




})
}

//渲染用户信息
function renderAvatar(user){
//获取用户头像
  let name=user.nickname|| user.username
$('#welcome').html('欢迎 &nbsp;'+name)
if(user.user_pic !==null){
  //渲染图片头像
  $('.layui-nav-img').attr('src',user.user_pic).show()
  $('.text-avatar').hide()
}else{
  $('.layui-nav-img').hide()
let first = name[0].toUpperCase()
$('.text-avatar').html(first).show()
}
}