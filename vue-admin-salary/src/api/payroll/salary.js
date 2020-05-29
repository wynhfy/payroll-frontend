import request from '@/utils/request'
export default{
    getList(page,limit,monthSalaryQuery){
        return request({
            url:`/payroll/month-salary/pageCondition/${page}/${limit}`,
            method:'post',
            data:monthSalaryQuery
        })
    }

}