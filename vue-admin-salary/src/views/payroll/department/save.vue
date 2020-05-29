<template>
  <div class="app-container">
            <el-form label-width="120px">
              <el-form-item label="部门名称">
                <el-input v-model="department.deptName"/>
              </el-form-item>

              <el-form-item label="部门地址">
                 <el-input v-model="department.deptAddress"/>
              </el-form-item>
              
              <el-form-item label="部门负责人工号">
                <el-input v-model="department.employeeId"/>
              </el-form-item>

              <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
              </el-form-item>
            </el-form>
    </div>
</template>
<script>
import department from '@/api/payroll/department'
export default {
     data(){
         return{
             department:{},
             saveBtnDisabled : false   //保存按钮是否禁用
         }
     },
     created(){
         this.init()
     },
     watch:{
        $route(to,from){ //路由变化方式，路由发生变化，方法就会执行
            this.init()
       }
     },
     methods:{
         //判断路径是否有id
         init(){
            //判断路径中是否有id值
           if(this.$route.params && this.$route.params.id){
              //从路径中获取id
              const id=this.$route.params.id
              this.getDepartmentInfo(id)
            }else{
              //清空表单
              this.department={}
            }
         },
         saveOrUpdate(){
              if(!this.department.deptId){
                 this.saveDepartment()
              }else{
                 this.updateDepartment()
              }
         },
         //添加部门
         saveDepartment(){
             department.addDepartment(this.department)
                .then(response=>{
                   this.$message({
                     type:'success',
                     message:'添加成功!'
                   });
                   this.$router.push({path:'/department/table'})
                })
         },
         //根据id查询部门信息
         getDepartmentInfo(id){
           department.getDepartmentInfo(id)
              .then(response=>{
                this.department=response.data.department
              })
         },
         //修改部门信息
         updateDepartment(){
            department.updateDepartment(this.department)
              .then(response=>{
                 this.$message({
                    type:'success',
                    message:'修改成功！'
                 });
                 this.$router.push({path:'/department/table'})
              })
         }
     }
}
</script>