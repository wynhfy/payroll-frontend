<template>
  <el-container style="height: 800px; border: 1px solid #eee">
      <!-- 侧边栏 -->
      <el-aside width="200px" style="background-color: #545c64">

            <el-menu
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">

                    <el-menu-item @click="center()">
                      <i class="el-icon-location"></i><span slot="title">个人中心</span>
                    </el-menu-item>
                    
                    <el-menu-item @click="attendance()">
                      <i class="el-icon-menu"></i><span slot="title">考勤打卡</span>
                    </el-menu-item>

                    <el-menu-item @click="overWork()">
                      <i class="el-icon-document"></i><span slot="title">加班打卡</span>
                    </el-menu-item>

                    <el-menu-item @click="salary()">
                      <i class="el-icon-bank-card"></i><span slot="title">工资查询</span>
                    </el-menu-item>
                    
            </el-menu>
              
      </el-aside>
  
      
      <el-container>
            <!-- 顶栏容器 -->
            <el-header style="text-align: right; font-size: 16px">
                <!-- <el-form inline="true"> -->
                    <span style="float:left">{{loginInfo.name}}</span>
                    <button style="float:right; margin-top:20px" @click="logout()">
                        <i class="el-icon-setting" ></i>
                        退出
                    </button>
                <!-- </el-form> -->

            </el-header>

             <nuxt/>
      </el-container>

</el-container>
</template>

<script>
import cookie from 'js-cookie'
export default {
     layout: 'home_page',
      data() {
          return {
              token:'',
              loginInfo:{
                 id:'',
                 employeeId:'',
                 name:'',
                 mobile:''
              }
          }
      },
      created(){
          this.showInfo()
      },
      methods:{
          //从cookie中获取用户信息
          showInfo(){
              var userStr=cookie.get('user')
              //将字符串转换成json对象
              if(userStr){
                console.log(userStr+'success')
                 this.loginInfo=JSON.parse(userStr)
              }
         },
         logout(){
              cookie.set('token','',{domain:'localhost'})
              cookie.set('user','',{domain:'localhost'})
              window.location.href="/" 
              // console.log("退出")
         },
         center(){
              this.$router.push({path:'/center/'+this.loginInfo.employeeId})
         },
         attendance(){
              this.$router.push({path:'/attendance/'+this.loginInfo.employeeId})
         },
         overWork(){
              this.$router.push({path:'/overWork/'+this.loginInfo.employeeId})
         },
         salary(){
              this.$router.push({path:'/salary/'+this.loginInfo.employeeId})
         }
      }
};
</script>


<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.ml5 {
  text-decoration:none;
  color: aliceblue;
}

.el-header {
    background-color:#909399;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #67C23A;
  }
</style>

