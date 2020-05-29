<template>
  <div class="app-container">
            <el-form label-width="120px">
              <el-form-item label="加班类别描述">
                <el-input type="textarea" rows="10" v-model="overWorkInfo.description"/>
              </el-form-item>

              <!-- <el-form-item label="加班类别描述">
                  <tinymce :height="300" v-model="overWorkInfo.description"/>
              </el-form-item> -->

              <el-form-item label="加班费用">
                 <el-input v-model="overWorkInfo.fee"/>
              </el-form-item>

              <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdateOverWorkInfo">保存</el-button>
              </el-form-item>
            </el-form>
    </div>
</template>
<script>
import overWorkInfo from '@/api/payroll/overWorkInfo'
import Tinymce from '@/components/Tinymce'
export default {
     components: { Tinymce },
     data(){
         return{
             overWorkInfo:{},
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
         init(){
             //判断路径中是否有id值
           if(this.$route.params && this.$route.params.id){
              //从路径中获取id
              const id=this.$route.params.id
              this.getOverWorkInfo(id)
            }else{
              //清空表单
              this.overWorkInfo={}
            }
         },
         saveOrUpdateOverWorkInfo(){
             if(this.overWorkInfo.id){
                this.updateOverWorkInfo()
             }else{
                this.saveOverWorkInfo()
             }
         },
         saveOverWorkInfo(){
             overWorkInfo.addOverWorkInfo(this.overWorkInfo)
                .then(response=>{
                    this.$message({
                     type:'success',
                     message:'添加成功!'
                   });
                   this.$router.push({path:'/overWorkInfo/list'})
                })
         },
         getOverWorkInfo(id){
            overWorkInfo.getOverWorkInfoById(id)
                .then(response=>{
                   this.overWorkInfo=response.data.overWorkInfo
                })
         },
         updateOverWorkInfo(){
             overWorkInfo.updateOverWorkInfo(this.overWorkInfo)
                  .then(response=>{
                      this.$message({
                          type:'success',
                          message:'修改成功！'
                      });
                      this.$router.push({path:'/overWorkInfo/list'})
                  })
         }
     }
}
</script>