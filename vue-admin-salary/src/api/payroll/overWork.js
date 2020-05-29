import request from '@/utils/request'

export default{
    getList(page,limit,overWorkQuery){
        return request({
            url:`/payroll/over-work/pageCondition/${page}/${limit}`,
            method:'post',
            data:overWorkQuery
        })
    },
    remove(id){
        return request({
            url:`/payroll/over-work/${id}`,
            method:'delete'
        })
    },
    removeByBatch(list){
        return request({
            url:`/payroll/over-work/removeByBatch`,
            method:'post',
            data:list
        })
    }
}