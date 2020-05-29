import request from '@/utils/request'

export default{
    //查询工种列表(条件查询)
    getWorkList(){
        return request({
            url:`payroll/work/getAllWork`,
            method:'get',
        })
    },
    //查询工种列表(条件查询)
    getWorkListCondition(workQuery){
        return request({
            url:`payroll/work/condition`,
            method:'post',
            data:workQuery
        })
    },
    deleteWork(id){
        return request({
            url:`payroll/work/${id}`,
            method:'delete'
        })
    },
    updateWork(work){
        return request({
            url:`payroll/work/updateWork`,
            method:'post',
            data:work
        })
    },
    getWorkInfo(id){
        return request({
            url:`payroll/work/getWorkInfo/${id}`,
            method:'get'
        })
    }

}