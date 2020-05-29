import request from '@/utils/request'

export default{
    //查询地址列表(分页条件查询)
    getAddressList(current,limit,addressQuery){
        return request({
            url:`payroll/address/pageCondition/${current}/${limit}`,
            method:'post',
            data:addressQuery
        })
    },
    getAddressInfo(id){
        return request({
            url:`payroll/address/getAddressById/${id}`,
            method:'get'
        })
    },
    updateAddress(address){
        return request({
            url:`payroll/address/updateAddress`,
            method:'post',
            data:address
        })
    }


}