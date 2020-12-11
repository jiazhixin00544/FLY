const ul=document.querySelector('.search-inf')
const inp=document.querySelector('.searching-inp')
// const li=document.querySelectorAll(".search-inf li")[0]
// console.log(ul)
// console.log(inp)
inp.addEventListener('input',()=>{
    // console.log('我输入内容了')
    const value=inp.value.trim()
    // console.log(value)
    if(!value){
        ul.classList.remove('active')
        // console.log('此次输入内容是空的')
        return
    }
    const script=document.createElement('script')
    // console.log(script)
    const url=`https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
    script.src=url
    // console.log(script)
    document.body.appendChild(script)
    script.remove()
})
function bindHtml(res){
    // console.log(res)
    if(!res.g){
        ul.classList.remove('active')
        return
    }
    let str =''
    for(let i=0;i<res.g.length;i++){
        str +=`
        <li>${res.g[i].q}</li>
        `
        ul.innerHTML=str
        ul.classList.add('active')

    }
    document.addEventListener('click',()=>{
        ul.classList.remove('active')
        inp.value=''
    })
    ul.addEventListener('mouseover',(e)=>{
        e=e||window.event
        target=e.target||e.srcElement
        // console.log(target)
        if(target.nodeName==="LI"){
            // console.log('我进来了')
            target.style.color='skyblue'
        }
    })
    ul.addEventListener('mouseout',(e)=>{
        e=e||window.event
        target=e.target||e.srcElement
        // console.log(target)
        if(target.nodeName==="LI"){
            // console.log('我进来了')
            target.style.color='black'
        }
    })
}