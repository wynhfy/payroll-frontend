<template>
  <div class="app-container">
        <!-- 表格 -->
        <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="数据加载中"
        border
        fit
        highlight-current-row>
                <el-table-column
                    label="序号"
                    width="70"
                    align="center">
                    <template slot-scope="scope">
                    {{ scope.$index + 1}}
                    </template>
                </el-table-column>

                <!-- <el-table-column prop="description" label="加班类别描述" /> -->

                <el-table-column label="加班类别描述">
                    <template slot-scope="scope">
                        <p v-html='scope.row.description'></p>
                    </template>
                </el-table-column>


                <el-table-column prop="fee" label="加班费用" />
                <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
                
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                    <router-link :to="'/overWorkInfo/edit/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>

        
  </div>
</template>
<script>
import overWorkInfo from '@/api/payroll/overWorkInfo'
export default {
    data(){
        return {
            list:[],   //查询后接口返回的集合
        }
    },
    created(){
        //初始化页面数据
        this.getList()
    },
    methods:{
        //得到部门列表
        getList(){
            overWorkInfo.getOverWorkInfoList()
                .then(response=>{
                      this.list=response.data.items
                })
        },
        removeDataById(id){
            this.$confirm('将永久删除该加班类别，是否继续?','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                overWorkInfo.removeOverWorkInfo(id)
                    .then(response=>{
                        this.$message({
                            type:'success',
                            message:'删除成功!'
                        });
                        this.getList()
                    })
            })
        }

   }

}
</script>