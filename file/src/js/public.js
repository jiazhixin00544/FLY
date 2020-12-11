function setCookie(key, value, expires) {
  if (!expires) return document.cookie = key + '=' + value

  const time = new Date()
  time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)
  document.cookie = `${key}=${value};expires=` + time
}

function getCookie(key) {
  const obj = {}

  const tmp = document.cookie.split('; ')
  tmp.forEach(item => {
    const t = item.split('=')
    obj[t[0]] = t[1]
  })

  return key ? obj[key] : obj
}
// 在这里，我们要实现的是登录页面，在五个页面同时显示，给他们创建一个公共的js,
//在使用的时候直接调用就可以了 
$(function(){
  const nickname=getCookie('nickname')
  if(nickname){
      $('.off').addClass('hide')
      $('.on').removeClass('hide').text(`欢迎您：${nickname}`)
  }
  else{
      $('off').removeClass('hide')
      $('.on').addClass('hide')
  }
})
