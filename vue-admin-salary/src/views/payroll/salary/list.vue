<template>
     <div class="app-container">
         <!--查询表单-->
                <el-form :inline="true" class="demo-form-inline">

                        <el-form-item>
                            <el-input v-model="monthSalaryQuery.year" placeholder="年份"/>
                        </el-form-item>

                        <el-form-item>
                            <el-input v-model="monthSalaryQuery.month" placeholder="月份"/>
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

                        <el-table-column prop="employeeId" label="工号" />
                        <el-table-column prop="name" label="姓名" width="180"/>
                        <el-table-column prop="year" label="年"/>
                        <el-table-column prop="month" label="月"/>  
                        <el-table-column prop="baseSalary" label="基础薪资(元)"/>
                        <el-table-column prop="benefit" label="津贴(元)"/>
                        <el-table-column prop="deductMoney" label="扣费(元)"/>
                        <el-table-column prop="finalMoney" label="最终工资(元)"/>
                        
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
import salary from '@/api/payroll/salary'
export default {
    data() {
        return {
            list:[],
            page:1,
            limit:10,
            total:0,
            monthSalaryQuery:{

            }
        }
    },
    created(){
        this.getList()
    },
    methods:{
        //根据条件查询
        getList(){
            salary.getList(this.page,this.limit,this.monthSalaryQuery)
                .then(response=>{
                    this.total=response.data.total
                    this.list=response.data.items
                })
        },
        resetData(){
            this.monthSalaryQuery={}
            this.monthSalaryQuery.employeeId=this.id
            this.getList()
        }
    }
}
</script>