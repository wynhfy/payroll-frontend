import request from '@/utils/request'

export default{
    //查询员工列表(分页条件查询)
    getEmployeeList(current,limit,employeeQuery){
        return request({
            url:`payroll/employee/pageCondition/${current}/${limit}`,
            method:'post',
            data:employeeQuery
        })
    },
    //查询某部门下的员工
    getEmployeeByDeptId(current,limit,deptId,employeeQuery){
        return request({
            url:`payroll/employee/pageConditionByDeptId/${current}/${limit}/${deptId}`,
            method:'post',
            data:employeeQuery
        })
    },
    //根据id获取员工信息
    getEmployeeInfo(id){
        return request({
            url:`payroll/employee/getEmployeeInfo/${id}`,
            method:'get'
        })
    },
    //更新员工信息
    updateEmployee(employeeVo){
        return request({
            url:`payroll/employee/updateEmployee`,
            method:'post',
            data:employeeVo
        })
    },
    //添加员工信息
    addEmployee(employeeVo){
        return request({
            url:`payroll/employee/addEmployee`,
            method:'post',
            data:employeeVo
        })
    },
    //删除员工信息
    removeEmployee(id){
        return request({
            url:`payroll/employee/${id}`,
            method:'delete'
        })
    }

}