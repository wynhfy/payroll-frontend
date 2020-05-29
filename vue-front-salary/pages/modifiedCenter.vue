<template>
    <!-- 主要区域容器 -->
          <el-main style="background-color: #EBEEF5">
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

                  <!-- <el-form-item label="头像" >
                      <el-upload
                        class="avatar-uploader"
                        :action="BASE_API+'/payroll/oss/avatar'"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img  :src="employeeVo.avatar" class="avatar">
                      </el-upload>
                  </el-form-item> -->

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
                    <el-button :disabled="saveBtnDisabled" type="primary" @click="update()">保存</el-button>
                    <el-button type="default" @click="resetData()">清空</el-button>
                  </el-form-item>
          </el-form>

          </el-main>
</template>
<script>
import center from '@/api/center'
export default {
    layout:'home_page',
    data(){
        return{
            id:'',
            employeeVo:{
              
            },
            departmentList:[],
            workList:[],
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
        if(this.$route.params && this.$route.params.id){
            this.id=this.$route.params.id
        }
        this.getDepartmentList()
        this.getWorkList()
        this.getUserInfo()
    },
    methods:{
        getUserInfo(){
            center.getUserInfo(this.id)
                .then(response=>{
                    this.employeeVo=response.data.data.employeeVo
                })
        },
        getDepartmentList(){
            center.getDepartmentList()
                .then(response=>{
                    this.departmentList=response.data.data.list
                })
        },
        getWorkList(){
            center.getWorkList()
                .then(response=>{
                     this.workList=response.data.data.items
                })  
        },
        update(){
            center.updateUserInfo(this.employeeVo)
                .then(response=>{
                    this.$message({
                        type:'success',
                        message:'修改成功！'
                    })
                    this.$router.push({path:'/center/'+this.id})
                })
        },
        resetData(){
            this.employeeVo={}
        }
    }
}
</script>