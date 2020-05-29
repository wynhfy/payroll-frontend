import request from '@/utils/request'
export default{
    getList(page,limit,attendanceVo){
        return request({
            url:`/payroll/attendance/pageCondition/${page}/${limit}`,
            method:'post',
            data:attendanceVo
        })
    },
    add(employeeId){
        return request({
            url:`/payroll/attendance/add/${employeeId}`,
            method:'get'
        })
    }

}