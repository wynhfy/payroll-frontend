<template>
  <div class="app-container">
       <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="accountQuery.employeeId" placeholder="工号"/>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="accountQuery.mobile" placeholder="手机号"/>
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
                    {{ (page - 1) * limit + scope.$index + 1 }}
                    </template>
                </el-table-column>

                <el-table-column prop="employeeId" label="工号"/>
                <el-table-column prop="mobile" label="手机号" />
                <el-table-column label="是否禁用" width="80">
                    <template slot-scope="scope">
                    {{ scope.row.isDisabled===true?'禁用':'未禁用' }}
                    </template>
                </el-table-column>
                
                <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button  v-if="scope.row.isDisabled===false"  type="danger" size="mini" icon="el-icon-delete" @click="disable(scope.row.id)">禁用</el-button>
                         <el-button v-else-if="scope.row.isDisabled===true"  type="primary" size="mini" icon="el-icon-check" @click="undisable(scope.row.id)">启用</el-button>
                    </template>
                </el-table-column>
        </el-table>


        <!-- 分页 -->
        <el-pagination
        :current-page="page"
        :page-size="limit"
        :total="total"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="getList"
        />
        
  </div>
</template>
<script>
import account from '@/api/payroll/account'
export default {
    data(){
        return {
            list:[],   //查询后接口返回的集合
            page:1,      //当前页
            limit:10,     //每一页的记录数
            total:0,     //总记录数
            accountQuery:{}, //条件封装对象
            account:{}
        }
    },
    created(){
        //初始化页面数据
        this.getList()
    },
    methods:{
        //得到部门列表
        getList(page =1){
            this.page=page
            account.getList(this.page,this.limit,this.accountQuery)
                .then(response=>{
                    this.list=response.data.items
                    this.total=response.data.total
                })
        },
        //查询数据时清空
        resetData(){
            this.accountQuery={}
            this.getList()
        },
        disable(id){
            account.forbid(id)
                .then(response=>{
                     this.$message({
                         type:"warning",
                         message:"已禁用"
                     })
                     this.getList()
                })
        },
        undisable(id){
            account.unforbid(id)
                .then(response=>{
                    this.$message({
                        type:"success",
                        message:"已启用"
                    })
                    this.getList()
                })
        }
   }

}
</script>