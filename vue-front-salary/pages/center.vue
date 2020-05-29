<template>
    <el-container>
          <!-- 主要区域容器 -->
          <el-main style="background-color: #EBEEF5">
                <div class="title">
                        <el-divider content-position="center">个人信息</el-divider>

                        <el-tag size="medium">个人</el-tag><br><br>
                        
                    <el-form>    
                        <el-form-item label="工号">
                                <p>{{user.id}}</p>
                            </el-form-item>
                        <el-form ref="form" :model="user" label-width="80px" inline="true">
                            <el-form-item label="姓名">
                                <p>{{user.name}}</p>
                            </el-form-item>

                            <el-form-item label="年龄">
                                <p>{{user.age}}</p>
                            </el-form-item>

                            <el-form-item label="性别">
                                <p>{{user.sex}}</p>
                            </el-form-item>

                            <el-form-item label="民族">
                                <p>{{user.nation}}</p>
                            </el-form-item>

                        </el-form>
                        
                        <el-form ref="form" :model="user" label-width="80px" inline="true">
                            <el-form-item label="电话">
                                <p>{{user.telephone}}</p>
                            </el-form-item>

                            <el-form-item label="邮箱">
                                <p>{{user.email}}</p>
                            </el-form-item>

                            <el-form-item label="学历">
                                <p>{{user.academic}}</p>
                            </el-form-item>

                            <el-form-item label="所属部门">
                                <p>{{deptName}}</p>
                            </el-form-item>

                            <el-form-item label="入职日期">
                                <p>{{user.gmtCreate}}</p>
                            </el-form-item>
                        </el-form>
                        

                        <el-tag size="medium">家庭住址</el-tag><br><br>

                        <el-form ref="form" :model="address" label-width="80px" inline="true">

                            <el-form-item label="省">
                                <p>{{address.province}}</p>
                            </el-form-item>

                            <el-form-item label="市">
                                <p>{{address.city}}</p>
                            </el-form-item>

                            <el-form-item label="区">
                                <p>{{address.area}}</p>
                            </el-form-item>

                            <el-form-item label="详细地址">
                                <p>{{address.detail}}</p>
                            </el-form-item>
                        </el-form>

                            <el-form-item>
                                <el-button type="primary" @click="update()">修改</el-button>
                            </el-form-item>
                    </el-form>    
                </div>

          </el-main>
    </el-container>
</template>
<script>
import center from '@/api/center'
export default {
    layout: 'home_page',
    data() {
        return {
            id:'',
            user:{},
            address:{},
            deptName:''
        }
    },
    created(){
        if(this.$route.params && this.$route.params.id){
            this.id=this.$route.params.id
        }
        this.getInfo()
    },
    methods:{
        getInfo(){
            center.getInfo(this.id)
                .then(response=>{
                    this.user=response.data.data.user
                    this.address=response.data.data.address
                    this.deptName=response.data.data.deptName
                })
        },
        update(){
            this.$router.push({path:'/modifiedCenter/'+this.id})
        }
    }
}
</script>