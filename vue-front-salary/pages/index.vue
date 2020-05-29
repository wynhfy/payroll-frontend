<template>
  <body id="poster">
    <el-form class="login-container" :model="user"   label-position="left" label-width="0px">
      <!-- <h3 class="login_title">系统登录</h3> -->
      <div class="login_title"> 
            <a href="/" style="color: #505458">登录</a>
            <span>·</span>
            <a class="active" href="/register" style="color: #505458">注册</a>
      </div>
    
      <el-form-item class="input-prepend restyle" prop="mobile" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="手机号" v-model="user.mobile"/>
            <i class="iconfont icon-phone" />
          </div>
      </el-form-item>
 
      <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
       </el-form-item>
 
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>
 
  
<script>
import loginApi from '@/api/login'
import cookie from 'js-cookie'
export default {
        name: "Login",
        data() {
            return {
                user:{
                    mobile:'',
                    password:'' 
                },
                loginInfo:{}
            }
        },
        methods: {
            login(){
                loginApi.submitLogin(this.user)
                    .then(response=>{
                       //将token设置到cookie中
                       cookie.set('token',response.data.data.token,{domain:'localhost'})
                       loginApi.getUserInfo()
                          .then(response=>{
                             this.loginInfo=response.data.data.userInfo
                            //  console.log(response.data.data.userInfo)
                            //  console.log(this.loginInfo)
                            var userStr=response.data.data.userInfo
                            //console.log(userStr)
                            cookie.set('user',userStr,{domain:'localhost'})

                            //跳转页面
                            window.location.href="/home_page"  
                        })
                    })  
            },
            checkPhone (rule, value, callback) {
                //debugger
                if (!(/^1[34578]\d{9}$/.test(value))) {
                  return callback(new Error('手机号码格式不正确'))
                }
                return callback()
            }
        }
    }
</script>
 

 <style>
  #poster {
    background:url("../assets/img/money.jpeg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
    padding: 0;
  }
 
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
 
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>

