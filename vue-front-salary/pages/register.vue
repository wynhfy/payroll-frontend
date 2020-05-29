<template>
  <body id="poster">
    <el-form class="login-container" :model="params"  label-position="left" label-width="0px">
      
      <div class="login_title"> 
            <a href="/" style="color: #505458">登录</a>
            <span>·</span>
            <a class="active" href="/register" style="color: #505458">注册</a>
      </div>
     
      <el-form-item prop="employeeId" :rules="[{ required: true, message: '请输入你的工号', trigger: 'blur' }]">
          <div>
            <el-input type="text" placeholder="工号" v-model="params.employeeId"/>
            <i class="iconfont icon-user"/>
          </div>
      </el-form-item>
 
     <el-form-item prop="mobile" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
           <div>
               <el-input type="text" placeholder="手机号" v-model="params.mobile"/>
               <i class="iconfont icon-phone"/>
          </div>
      </el-form-item>

     <el-form-item  prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
            <div style="width: 100%;display: block;float: left;position: relative">
               <el-input type="text" placeholder="验证码" v-model="params.code"/>
               <i class="iconfont icon-phone"/>
            </div>
            <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
              <a href="javascript:" type="button" @click="getCodeFun()" :value="codeTest" style="border: none;background-color: none">{{codeTest}}</a>
            </div>
     </el-form-item>

     <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="设置密码" v-model="params.password"/>
            <i class="iconfont icon-password"/>
          </div>
     </el-form-item>

 
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>
 
 
<script>
import registerApi from '@/api/register'
export default {
     name: "Login",
     data() {
          return {
               params: {
                    employeeId: '',
                    mobile:'',
                    code:'',
                    password: ''
               },
               sending: true,      //是否发送验证码
               second: 60,        //倒计时间
               codeTest: '获取验证码'
          }
     },
     methods: {
          register(){
             registerApi.register(this.params)
               .then(response=>{
                    this.$message({
                         type:'success',
                         message:'注册成功'
                    })
                    this.$router.push({path:'/'})
            })
          },
          //发送验证码
          getCodeFun(){
               registerApi.sendCode(this.params.mobile)
                    .then(response=>{
                         this.sending=false
                         this.timeDown()
                    })
          },
          //计时器的实现，每隔1s执行一次里面的方法
          timeDown() {
               let result = setInterval(() => {
                    --this.second;
                    this.codeTest = this.second
                    if (this.second < 1) {
                    clearInterval(result);
                    this.sending = true;
                    //this.disabled = false;
                    this.second = 60;
                    this.codeTest = "获取验证码"
                    }
               }, 1000);
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

