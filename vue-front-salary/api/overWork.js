import request from '@/utils/request'
export default{
    
    getList(page,limit,overWorkQuery){
        return request({
            url:`/payroll/over-work/pageCondition/${page}/${limit}`,
            method:'post',
            data:overWorkQuery
        })
    },
    getOverWorkInfoList(){
        return request({
            url:`/payroll/over-work-info/getOverWorkInfoList`,
            method:'get'
        })
    },
    startWork(overWork){
        return request({
            url:`/payroll/over-work/addOrUpdateOverWork`,
            method:'post',
            data:overWork
        })
    },
    getInfo(id){
        return request({
            url:`/payroll/over-work/getOverWorkInfo/${id}`,
            method:'get'
        })
    }

}