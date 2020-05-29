<template>
  <div class="app-container">
       <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="employeeQuery.id" placeholder="员工工号"/>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="employeeQuery.name" placeholder="员工姓名"/>
                </el-form-item>

                <el-form-item>
                    <el-radio v-model="employeeQuery.sex" label="男">男</el-radio>
                    <el-radio v-model="employeeQuery.sex" label="女">女</el-radio>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="employeeQuery.age" placeholder="年龄"/>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="employeeQuery.nation" placeholder="民族"/>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="employeeQuery.telephone" placeholder="电话"/>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="employeeQuery.email" placeholder="邮箱"/>
                </el-form-item>

                <el-select v-model="employeeQuery.academic" placeholder="学历 请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>

                <el-select v-model="employeeQuery.workId" placeholder="工种 请选择">
                    <el-option
                    v-for="work in workList"
                    :key="work.id"
                    :label="work.name"
                    :value="work.id">
                    </el-option>
                </el-select>

                <el-form-item label="添加时间">
                    <el-date-picker
                    v-model="employeeQuery.begin"
                    type="datetime"
                    placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="00:00:00"
                    />
                </el-form-item>

                <el-form-item>
                    <el-date-picker
                    v-model="employeeQuery.end"
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

                <el-table-column prop="id" label="员工工号" width="160" />
                <el-table-column prop="name" label="姓名" />
                <el-table-column label="性别" width="80">
                    <template slot-scope="scope">
                    {{ scope.row.sex==='男'?'男':'女' }}
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄" />
                <el-table-column prop="academic" label="学历" />
                <el-table-column prop="telephone" label="电话" />
                <el-table-column prop="email" label="邮箱" />
                <el-table-column prop="nation" label="民族" />
                <el-table-column label="是否激活" width="80">
                    <template slot-scope="scope">
                    {{ scope.row.isActive===true?'已激活':'未激活' }}
                    </template>
                </el-table-column>
                <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
                
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                    <router-link :to="'/department/edit/'+scope.row.id+'/'+scope.row.deptId">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
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
import employee from '@/api/payroll/employee'
import work from '@/api/payroll/work'
export default {
    data(){
        return{
            deptId:'',
            list:[],
            workList:[],
            page:1,
            limit:3,
            total:0,
            employeeQuery:{},
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
                }],
        }
    },
    created(){
        if(this.$route.params && this.$route.params.id){
            this.deptId=this.$route.params.id
        }
        this.getList()
        this.getWorkList()
    },
    methods:{
         getWorkList(){
            work.getWorkList()
                .then(response=>{
                    this.workList=response.data.items
                })
        },
        getList(page =1){
            this.page=page
            employee.getEmployeeByDeptId(this.page,this.limit,this.deptId,this.employeeQuery)
                .then(response=>{
                    this.total=response.data.total
                    this.list=response.data.items
                })
        },
        resetData(){
            this.employeeQuery={}
            this.getList()
        },
        removeDataById(id){
            this.$confirm('将永久删除该员工，是否继续?','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
               employee.removeEmployee(id)
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
</script>s