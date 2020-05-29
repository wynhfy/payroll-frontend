import request from '@/utils/request'

export default{
    getList(page,limit,attendanceVo){
        return request({
            url:`/payroll/attendance/pageCondition/${page}/${limit}`,
            method:'post',
            data:attendanceVo
        })
    },
    remove(id){
        return request({
            url:`/payroll/attendance/${id}`,
            method:'delete'
        })
    },
    removeByBatch(list){
        return request({
            url:`/payroll/attendance/removeByBatch`,
            method:'post',
            data:list
        })
    }
}