$(function(){
    const list_info={
        cat_one:'all',
        cat_two:'all',
        sort_method:'综合',
        sort_type:'ASC',
        current:'1',
        pagesize:12
    }
    // console.log(list_info)
    //请求得到一级分类列表信息 
    getOne()
    function getOne(){
        $.get('../server/first.php','nul','null','json').then((res)=>{
            // console.log(res)
            let str =`
                    <li data-type="all" class="active">全部</li>
                    `
            res.list.forEach((item)=>{
                str +=`
                        <li data-type="${ item.cat_one_id }">${item.cat_one_id}</li>
                        `
                // console.log(str)
                $('.all').html(str)
            })
        })
    }
    //请求总页数，把页数进行分页
    getPages()
    function getPages(){
        $.get('../server/getPages.php',list_info,null,'json').then((res)=>{
            console.log(res)
            // 渲染分页内容
            $('.pagination').pagination({
                pageCount: res.total,
                callback (index) {
                list_info.current = index.getCurrent()
                getGoodsList()
                }
            }) 
        })
    }
    getGoodsList()
    function getGoodsList(){
        $.get('../server/getGoodsList.php',list_info,null,'json').then((res)=>{
            // console.log(res)
            const list=res.list
            let str=''
            list.forEach(item=>{
                str +=`
                <li>
                <div class="every-product">
                <div class="every-product-img"><img src="${item.goods_big_logo}" alt="" srcset=""></div>
                <div class="every-product-dp"><span>自由控温每1℃,柔滑奢宠每一丝</span></div>
                <div class="every-product-type">
                    <span data-id="${item.goods_id}" class="jump">${item.goods_name}</span>
                    <div class="icon-img">
                        <span class="iconfont">&#xe503;</span>
                    </div>
                </div>
                <div class="every-product-price"><p>${item.goods_price}</p><button id="go-shopping">去结算</button></div>

            </div>
            </li>
                `
            // console.log(str)
            $('.total-goods-ul').html(str)
            })

        })
    }
    // 给一级分类信息添加点击事件
    $('.all').on('click',"li",function(){
        // console.log('我执行点击事件了')
        // console.log($(this))
        $(this).addClass('active').siblings().removeClass('active')
        const type = $(this).data('type')
        //得到我们想要的商品分类名称
        // console.log(type)
        list_info.cat_two='all'
        list_info.current = 1
        list_info.cat_one=type
        getGoodsList()
        getPages()
    })
    //添加排序方式（进行修改）
    $('.clarify').on('click','li',function(){
        // console.log('我执行点击事件了')
        const method = $(this).attr('data-method')
        const type = $(this).attr('data-type')
        // console.log(method)
        $(this).addClass("active").siblings().removeClass('active')
        list_info.sort_method=method
        list_info.sort_type=type
        getPages()
        getGoodsList()
        console.log(list_info)
        //修改data-type属性
        $(this)
        .attr('data-type', type === 'ASC' ? 'DESC' : 'ASC')
        .siblings()
        .attr('data-type', 'ASC')
    })
    //点击跳转到详情页面
    $('.total-goods').on('click','.jump',function(){
        // console.log("我执行点击了")
        console.log(this)
        const id=$(this).data('id')
        // console.log(id)
        setCookie('goods_id',id)
        window.location.href='../pages/goods-detail.html'
    })
    //存储数据（加入购物车按钮(添加失败)） 
    $('.total-goods-ul').on('click','.iconfot',function(){
        console.log("我要加进购物车")
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



})