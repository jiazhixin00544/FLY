// jquery 的入口函数
$(function () {

  // 0. 进行登录判断
  // 如果没有登录, 直接跳转回登录页
  // 通过 cookie
  const nickname = getCookie('nickname')
  if (!nickname) return window.location.href = './login.html'

  // 1. 拿到 localStorage 里面的 cart 数据
  const cart = JSON.parse(window.localStorage.getItem('cart')) || []

  // 2. 判断 cart 的 length, 决定执行进行哪一个渲染
  if (!cart.length) {
    // 表示购物车没有数据
    // 购物车列表添加 hide 类名, 进行隐藏
    $('.on').addClass('hide')
    $('.off').removeClass('hide')
    return
  }

  // 3. 能来到这里表示 cart 里面有数据
  // 就要进行渲染了
  $('.off').addClass('hide')
  $('.on').removeClass('hide')

  bindHtml()
  function bindHtml() {
    const selectAll = cart.every(item => item.is_select === '1')
    let total = 0
    let totalMoney = 0
    // cart.forEach(item => {
    // if (item.is_select === '1') {
    //     total += item.cart_number - 0
    //     totalMoney += item.cart_number * item.goods_price
    // }
    // })

    let str = `
    <div class="count-top">
    <div class="top1"> <input type="checkbox"><span>全选</span></div>
    <div class="top2"><span>商品信息</span></div>
    <ul class="count-control">
        <li>单价</li>
        <li>数量</li>
        <li>小计</li>
        <li>操作</li>
    </ul>
    </div>
    `
    cart.forEach(item => {
        str +=`
        <div class="count-center">
        <div class="buy-first">
            <div class="center1"><input type="checkbox"></div>
            <div class="count-inf"><img src="${ item.goods_big_logo }" alt="" srcset=""><span>飞科电吹风FH6376</span></div>
            <div class="count-price">${ item.goods_price }</div>
            <div class="count-num"><button>-</button><span>1</span><button>+</button></div>
            <div class="count-price-end">${ item.goods_price }</div>
            <button class="del">删除</button>
        </div>
        </div>
        `
        str +=`
        <div class="count-bottom">
        <span class="counting">应付金额：</span>
        <div class="total-money">$89.00</div>
        <button class="buy">去结算<span>(1)</span></button>
        </div>
        `
        console.log(str)
        $('.count-money').html(str)
    })
    



}
})