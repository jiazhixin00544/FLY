$(function(){
    let info = null
    const id = getCookie('goods_id')
    // console.log(id)
    //去数据库拿取信息
    getGoodsMore()
    function getGoodsMore(){
        $.get("../server/getGoodsMore.php",{goods_id:id},null,'json').then((res)=>{
            // console.log(res)
            bindHtml(res.info)
            info = res.info
            // console.log(info)

        })
    }
    function bindHtml(info){
        // console.log(info)
        //渲染放大镜
        $('.enlarge').html(`
        <div class="normal show">
            <img src="${ info.goods_big_logo }" alt="" srcset="">
            <div class="mask"></div>
        </div>
        <div class="small list">
            <ul class="s-list">
                <li class="active"><img src="${ info.goods_big_logo }" alt="" srcset=""></li>
                <li><img src="../images/fly/飞科2.jpg" alt="" srcset=""></li>
                <li><img src="../images/fly/飞科3.jpg" alt="" srcset=""></li>
                <li><img src="../images/fly/飞科4.jpg" alt="" srcset=""></li>
                <li><img src="../images/fly/飞科5.jpg" alt="" srcset=""></li>
            </ul>
        </div>
        <div class="large big"></div>
    `)
    new Enlarge('.enlarge')

    //渲染右边的列表信息
    $('.this-detail-inf').html(`
    <h4>${info.goods_name}</h4>
    <p>竭尽全力 无需隐藏</p>
    <div class="this-price">
        活动价：
        <span class="now-price">${ info.goods_price }</span>
        <span class="ever-price">[$888.00]</span>
    </div>
    <div class="service">
        <span>服务</span>
        <ul class="inf-important">
            <li>免费包邮</li>
            <li>官方正品保证</li>
            <li>两年全国联保</li>
            <li>7天无忧退货</li>
            <li>24小时发货</li>
        </ul>
    </div>
    <div class="limit-name">不包邮<span>台湾、香港、澳门、海外</span></div>
    <div class="product-name">
        规格
        <div class="product-img"><img src="${ info.goods_big_logo }" alt="" srcset=""></div>
    </div>
    <div class="product-count">
        数量：
        <button class="product-cut">-</button>
        <input type="text" value="1" class="cartNum">
        <button class="product-add">+</button>
    </div>
    <div class="btns">
        <button class="add-shopping">加入购物车</button>
        <button class="buy-shopping">立即购买</button>
    </div>
    
    `)
    }
    //加入购物车功能,
    $('.this-detail-inf').on('click','.add-shopping',function(){
        // console.log(this)
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []
        const flag = cart.some(item => item.goods_id === id)
        if (flag) {
            const cart_goods = cart.filter(item => item.goods_id === id)[0]
            cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
            } else {
            info.cart_number = 1
            cart.push(info)
        }
        window.localStorage.setItem('cart', JSON.stringify(cart))

    })
    $('.this-detail-inf')
    .on('click', '.product-cut', function () {
        // console.log('我是--')
    let num = $('.cartNum').val() - 0
    if (num === 1) return
    $('.cartNum').val(num - 1)
    // console.log(num)
    })
    .on('click', '.product-add', function () {
        // console.log('我是++')
    let num = $('.cartNum').val() - 0
    // console.log(num)
    $('.cartNum').val(num + 1)
    })



})