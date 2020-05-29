<template>
        <div class="app-container">
            <el-form label-width="120px">
                  <h3>员工基本信息:</h3>

                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="employeeVo.name"/>
                  </el-form-item>
                  
                  <el-form-item label="性别">
                      <el-radio v-model="employeeVo.sex" label="男">男</el-radio>
                      <el-radio v-model="employeeVo.sex" label="女">女</el-radio>
                   </el-form-item>   
                  
                  <el-form-item label="年龄">
                    <el-input v-model="employeeVo.age"/>
                  </el-form-item>

                  <el-form-item label="民族">
                    <el-input v-model="employeeVo.nation"/>
                  </el-form-item>

                  <el-form-item label="电话">
                    <el-input v-model="employeeVo.telephone"/>
                  </el-form-item>

                  <el-form-item label="邮箱">
                    <el-input v-model="employeeVo.email"/>
                  </el-form-item>

                  <el-form-item label="学历">
                      <el-select v-model="employeeVo.academic" placeholder="学历 请选择" prop="academic" label="学历">
                          <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                          </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="所属部门" >
                      <el-select v-model="employeeVo.deptId" placeholder="请选择">
                        <el-option v-for="department in departmentList" :key="department.deptId"  :label="department.deptName" :value="department.deptId"></el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="工种" >
                      <el-select v-model="employeeVo.workId" placeholder="请选择">
                        <el-option v-for="work in workList" :key="work.id"  :label="work.name" :value="work.id"></el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="头像" >
                      <el-upload
                        class="avatar-uploader"
                        :action="BASE_API+'/payroll/oss/avatar'"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img  :src="employeeVo.avatar" class="avatar">
                      </el-upload>
                  </el-form-item>

                  <h3>家庭住址:</h3>

                  <el-form-item >
                    <el-input v-model="employeeVo.province" placeholder="省" style="width:160px"/>
                    <el-input v-model="employeeVo.city" placeholder="市" style="width:160px"/>
                    <el-input v-model="employeeVo.area" placeholder="区" style="width:160px"/>
                  </el-form-item>

                  <el-form-item label="详细地址">
                    <el-input v-model="employeeVo.detail"/>
                  </el-form-item>

                  <el-form-item>
                    <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
                    <el-button type="default" @click="resetData()">清空</el-button>
                  </el-form-item>
          </el-form>
    </div>

</template>
<script>
import employee from '@/api/payroll/employee'
import address from '@/api/payroll/address'
import department from '@/api/payroll/department'
import work from '@/api/payroll/work'
export default {
    data(){
      return{
          employeeVo:{
              avatar:'/static/默认头像.jpg'
          },
          departmentList:[],
          workList:[],
          BASE_API:process.env.BASE_API,//获取dev.env.js里面地址
          saveBtnDisabled:false,
          options: [
                {
                value: '博士',
                label: '博士'
                },
                {
                value: '硕士',
                label: '硕士'
                }, {
                value: '本科',
                label: '本科'
                }, {
                value: '大专',
                label: '大专'
                }, {
                value: '职校',
                label: '职校'
                }]
      }
    },
    created(){
        this.init()
    },
    watch:{
        $route(to,from){
            this.init()
        }
    },
    methods:{
        init(){
            this.getDepartmentList()
            this.getWorkList()
            if(this.$route.params && this.$route.params.id){
                const id=this.$route.params.id
                this.getEmployeeInfo(id)
            }else{
                this.employeeVo={
                   avatar:'/static/默认头像.jpg'
                }
            }
        },
        resetData(){
           this.employeeVo={
              avatar:'/static/默认头像.jpg'
          }
        },
        getDepartmentList(){
           department.getAllDepartment()
                .then(response=>{
                    this.departmentList=response.data.list
                })
        },
        getWorkList(){
            work.getWorkList()
                .then(response=>{
                    this.workList=response.data.items
                })
        },
        //上传头像前的判断
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        //上传封面成功
        handleAvatarSuccess(response,file){ 
            this.employeeVo.avatar=response.data.url
        },
        saveOrUpdate(){
             if(!this.employeeVo.id){
                 this.saveEmployee()
             }else{
                 this.updateEmployee()
             }
        },
        //添加员工
        saveEmployee(){
           employee.addEmployee(this.employeeVo)
                .then(response=>{
                      this.$message({
                        type:'success',
                        message:'添加成功!'
                      });
                      this.$router.push({path:'/employee/list'})
                })
           
        },
        //根据id查询员工信息
        getEmployeeInfo(id){
            employee.getEmployeeInfo(id)
                .then(response=>{
                    this.employeeVo=response.data.employeeVo
                })
        },
        updateEmployee(){
            employee.updateEmployee(this.employeeVo)
                .then(response=>{
                      this.$message({
                      type:'success',
                      message:'修改成功！'
                      });
                      this.$router.push({path:'/employee/list'})
                })
        }
    }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
