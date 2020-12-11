// 这里我们要实现的是放大镜的功能，利用JS代码来书写

class Enlarge{
    constructor(ele){
        //获取元素
        this.ele=document.querySelector(ele)
        this.mask=document.querySelector('.mask')
        this.maskW=parseInt(getComputedStyle(this.mask).width)
        this.maskH=parseInt(getComputedStyle(this.mask).height)
        this.list=document.querySelector('.list')
        this.lists=document.querySelector('.s-list')
        this.big=document.querySelector('.big')
        this.bigW=parseInt(getComputedStyle(this.big).width)
        this.bigH=parseInt(getComputedStyle(this.big).height)
        this.show=document.querySelector('.show')
        this.showW=this.show.clientWidth
        this.showH=this.show.clientHeight
        this.picW=parseInt(getComputedStyle(this.big).backgroundSize.split('')[0])
        this.picH=parseInt(getComputedStyle(this.big).backgroundSize.split('')[2])
        // console.log(this.mask)
        this.init()
    }
    //建立入口函数
    init(){
        this.inOut()
        this.Move()
        this.Change()

    }
    //第一步，一入一出
    inOut(){
        //添加鼠标的移入事件，让他显示出来
        this.show.addEventListener('mouseover',()=>{
            this.mask.style.display='block'
            this.big.style.display='block'
        })
        //添加鼠标的移入事件，让他显示出来
        this.show.addEventListener('mouseout',()=>{
            this.mask.style.display='none'
            this.big.style.display='none'
        })
    }
    //添加移动事件
    Move(){
        this.show.addEventListener('mousemove',(e)=>{
            e=e||window.event
            //遮罩移动
            let x=e.offsetX-this.maskW/2
            let y=e.offsetY-this.maskH/2
            if(x<=0){x=0}
            if(y<=0){y=0}
            if(x>this.showW-this.maskW){x=this.showW-this.maskW}
            if(y>this.showH-this.maskH){y=this.showH-this.maskH}
            this.mask.style.left=x+'px'
            this.mask.style.top=y+'px'
            const X=x*2
            const Y=y*2
            // 让大图片移动
            this.big.style.backgroundPosition=`-${X}px -${Y}px`
        })
    }
    //添加图片切换事件
    Change(){
        this.list.addEventListener('click',(e)=>{
            // console.log('我执行点击事件了')
            //处理事件兼容问题
            e=e||window.event
            // console.log(e)
            const target=e.target
            //target is not defied???
            // console.log(target)
            if(target.nodeName==='IMG'){
                const imgUrl=target.src
                // console.log(imgUrl)
                this.show.firstElementChild.src=imgUrl
                this.big.style.backgroundImage = `url(${imgUrl})`
                for (let i = 0; i < this.lists.children.length; i++) {
                    this.lists.children[i].classList.remove('active')
                    } 
                target.parentElement.classList.add('active')
    
    



            }
            // console.log(this)
        })
    }


}