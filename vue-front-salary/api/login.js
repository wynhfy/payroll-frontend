import request from '@/utils/request'
export default{
    
    submitLogin(member){
        return request({
            url:`/payroll/account/login`,
            method:'post',
            data:member
        })
    },
    getUserInfo(){
        return request({
            url:`/payroll/account/getInfo`,
            method:'get'
        })
    }

}