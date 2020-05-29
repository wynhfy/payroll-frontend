import request from '@/utils/request'
export default{
     getInfo(id){
        return request({
            url:`/payroll/center/getInfo/${id}`,
            method:'get'
        })
     },
     getDepartmentList(){
         return request({
             url:`/payroll/department/getAllDepartment`,
             method:'get'
         })
     },
     getWorkList(){
         return request({
             url:`/payroll/work/getAllWork`,
             method:'get'
         })
     },
     getUserInfo(id){
         return request({
             url:`/payroll/employee/getEmployeeInfo/${id}`,
             method:'get'
         })
     },
     updateUserInfo(employeeVo){
         return request({
             url:`/payroll/employee/updateEmployee`,
             method:'post',
             data:employeeVo
         })
     }
}