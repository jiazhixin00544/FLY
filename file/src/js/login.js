//建立入口函数，使用validate插件进行表单的验证操作
$(function(){
    $('#login').validate({
        rules:{
            username:{
                required:true,
                minlength:6,
                maxlength:12,
            },
            first_password:{
                required:true,
                minlength:6,
                maxlength:12,
            },
            final_password:{
                required:true,
                minlength:6,
                maxlength:12,
            }
        },
        message:{
            username:{
                required:'请输入您的账号',
                minlength:'最少输入6个字符',
                maxlength:'最多输入12个字符',
            },
            first_password:{
                required:'请输入您的账号',
                minlength:'最少输入6个字符',
                maxlength:'最多输入12个字符',
            },
            final_password:{
                required:'请输入您的账号',
                minlength:'最少输入6个字符',
                maxlength:'最多输入12个字符',
            }
    
        },
        submitHandler(form){
            const information=$(form).serialize()
            console.log(information)
            $.post('../server/login.php',information,null,'json').then(res=>{
                console.log(res)
                if (res.code === 0) {
                    // 登录失败
                    $('.login_error').removeClass('hide')
                    $(window).click(function(){
                        // console.log('我执行了点击事件')
                        $('.login_error').css('display','none')

                    })

                } else if (res.code === 1) {
                    // 3-2. 登录成功, 跳转页面, 存储 cookie
                    // 为了在首页还需要使用
                    setCookie('nickname', res.nickname)
                    // 跳转页面
                    window.location.href = '../pages/index.html'
                }
            })
        }
        
    })
})