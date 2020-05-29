import request from '@/utils/request'
export default{
    //根据手机号发送验证码
    sendCode(phone){
        return request({
            url:`/payroll/msm/send/${phone}`,
            method:'get'
        })
    },
    //注册
    register(form){
        return request({
            url:'/payroll/account/register',
            method:'post',
            data:form
        })
    }

}