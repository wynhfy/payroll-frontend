import request from '@/utils/request'

export default{
    getList(page,limit,accountQuery){
        return request({
            url:`/payroll/account/pageCondition/${page}/${limit}`,
            method:'post',
            data:accountQuery
        })
    },
    forbid(id){
        return request({
            url:`/payroll/account/forbid/${id}`,
            method:'get'
        })
    },
    unforbid(id){
        return request({
            url:`/payroll/account/unforbid/${id}`,
            method:'get'
        })
    }


}