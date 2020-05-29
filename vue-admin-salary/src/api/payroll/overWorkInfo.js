import request from '@/utils/request'

export default{
    //添加加班类别信息
    addOverWorkInfo(overWorkInfo){
        return request({
            url:`payroll/over-work-info/addOverWorkInfo`,
            method:'post',
            data:overWorkInfo
        })
    },
    getOverWorkInfoList(){
        return request({
            url:`payroll/over-work-info/getOverWorkInfoList`,
            method:'get'
        })
    },
    getOverWorkInfoById(id){
        return request({
            url:`payroll/over-work-info/getOverWorkInfoById/${id}`,
            method:'get'
        })
    },
    updateOverWorkInfo(overWorkInfo){
        return request({
            url:`payroll/over-work-info/updateOverWorkInfo`,
            method:'post',
            data:overWorkInfo
        })
    },
    removeOverWorkInfo(id){
        return request({
            url:`payroll/over-work-info/${id}`,
            method:'delete'
        })
    }
}