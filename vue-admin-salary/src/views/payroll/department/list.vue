<template>
  <div class="app-container">
       <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="departmentQuery.deptName" placeholder="部门名称"/>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="departmentQuery.employeeId" placeholder="负责人工号"/>
                </el-form-item>

                <el-form-item label="添加时间">
                    <el-date-picker
                    v-model="departmentQuery.begin"
                    type="datetime"
                    placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="00:00:00"
                    />
                </el-form-item>

                <el-form-item>
                    <el-date-picker
                    v-model="departmentQuery.end"
                    type="datetime"
                    placeholder="选择截止时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="00:00:00"
                    />
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

                <el-table-column prop="deptName" label="部门名称" width="80" />
                <el-table-column prop="deptAddress" label="部门地址" />
                <el-table-column prop="totalNum" label="部门人数" />
                <el-table-column prop="employeeId" label="部门负责人" />
                <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
                
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                    <router-link :to="'/department/edit/'+scope.row.deptId">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.deptId)">删除</el-button>
                    <router-link :to="'/department/list/'+scope.row.deptId">
                        <el-button type="info" size="mini" icon="el-icon-menu">员工列表</el-button>
                     </router-link>
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
import department from '@/api/payroll/department'
export default {
    data(){
        return {
            list:[],   //查询后接口返回的集合
            page:1,      //当前页
            limit:2,     //每一页的记录数
            total:0,     //总记录数
            departmentQuery:{} //条件封装对象
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
            department.getDepartmentList(this.page,this.limit,this.departmentQuery)
                .then(response=>{
                    this.list=response.data.items
                    this.total=response.data.total
                })
        },
        //查询数据时清空
        resetData(){
            this.departmentQuery={}
            this.getList()
        },
        //删除部门
        removeDataById(id){
            this.$confirm('将永久删除该部门，是否继续?','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                department.deleteDepartment(id)
                    .then(response=>{
                        this.$message({
                            type:'success',
                            message:'删除成功!'
                        });
                        this.getList()
                    })
                    .catch(response=>{
                        this.$message.error('部门人数不为空,不能删除');
                    })
            })
        }


   }

}
</script>