import request from '@/utils/request'

export default{
    //查询部门列表(分页条件查询)
    getDepartmentList(current,limit,departmentQuery){
        return request({
            url:`payroll/department/pageCondition/${current}/${limit}`,
            method:'post',
            data:departmentQuery
        })
    },
    //查询所有部门名字
    getAllDepartment(){
        return request({
            url:`payroll/department/getAllDepartment`,
            method:'get'
        })  
    },
    //删除部门
    deleteDepartment(id){
        return request({
            url:`payroll/department/${id}`,
            method:'delete'
        })
    },
    //添加部门
    addDepartment(department){
        return request({
            url:`payroll/department/addDepartment`,
            method:'post',
            data:department
        })
    },
    //根据id查询部门信息
    getDepartmentInfo(id){
        return request({
            url:`payroll/department/getDepartmentInfoById/${id}`,
            method:'get'
        })
    },
    //更新部门信息
    updateDepartment(department){
        return request({
            url:`payroll/department/updateDepartment`,
            method:'post',
            data:department
        })
    }

}


