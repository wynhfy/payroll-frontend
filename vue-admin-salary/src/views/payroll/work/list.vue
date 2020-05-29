<template>
  <div class="app-container">
       <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="workQuery.name" placeholder="工种名称"/>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="workQuery.grade" placeholder="等级"/>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="workQuery.baseSalary" placeholder="基础工资"/>
                </el-form-item>

                <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>

                <el-button type="default" @click="resetData()">清空</el-button>
        </el-form>
    
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
                    {{scope.$index+1}}
                    </template>
                </el-table-column>

                <el-table-column prop="name" label="工种名称" width="80" />
                <el-table-column prop="grade" label="等级" />
                <el-table-column prop="baseSalary" label="基础薪资" />
                
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="openDialog(scope.row.id)">修改</el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>


        <!-- 修改工种的表单 -->
        <el-dialog :visible.sync="dialogChapterFormVisible" title="修改工种">
            <el-form :model="chapter" label-width="120px">
                <el-form-item label="工种名字">
                    <el-input v-model="work.name"/>
                </el-form-item>
                <el-form-item label="工种等级">
                    <el-input v-model="work.grade"/>
                </el-form-item>
                <el-form-item label="基础薪资">
                    <el-input v-model="work.baseSalary"/>
                </el-form-item>
            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateWork">确 定</el-button>
            </div>
        </el-dialog>
 
  </div>
</template>
<script>
import work from '@/api/payroll/work'
export default {
    data(){
        return {
            list:[],   //查询后接口返回的集合
            workQuery:{}, //条件封装对象
            work:{},
            dialogChapterFormVisible:false
        }
    },
    created(){
        //初始化页面数据
        this.getList()
    },
    methods:{
        //得到部门列表
        getList(){
            work.getWorkListCondition(this.workQuery)
                .then(response=>{
                    this.list=response.data.items
                })
        },
        //查询数据时清空
        resetData(){
            this.workQuery={}
            this.getList()
        },
        removeDataById(id){
            work.deleteWork(id)
                .then(response=>{
                    this.$confirm('将删除该工种，是否继续？','提示',{
                        confirmButtonText:'确定',
                        cancelButtonText:'取消',
                        type:'warning'
                    }).then(()=>{
                        work.deleteWork(id)
                            .then(response=>{
                                this.$message({
                                    type:'success',
                                    message:'删除成功！'
                                })
                                this.getList()
                            })
                    })
                })
        },
        openDialog(id){
            work.getWorkInfo(id)
                .then(response=>{
                    this.work=response.data.work
                })
            this.dialogChapterFormVisible=true
        },
        updateWork(){
            work.updateWork(this.work)
                .then(response=>{
                    this.$message({
                        type:'success',
                        message:'修改成功！'
                    })
                    this.dialogChapterFormVisible=false
                    this.getList()
                })
        }
   }

}
</script>