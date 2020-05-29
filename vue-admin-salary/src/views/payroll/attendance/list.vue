<template>
  <div class="app-container">
       <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="attendanceVo.employeeId" placeholder="工号"/>
                </el-form-item>

                <el-form-item>
                    <el-radio v-model="attendanceVo.status" label="已到">已到</el-radio>
                    <el-radio v-model="attendanceVo.status" label="迟到">迟到</el-radio>
                </el-form-item>

                <el-form-item>
                    <el-date-picker
                    v-model="attendanceVo.begin"
                    type="datetime"
                    placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="00:00:00"
                    />
                </el-form-item>

                <el-form-item>
                    <el-date-picker
                    v-model="attendanceVo.end"
                    type="datetime"
                    placeholder="选择截止时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="00:00:00"
                    />
                </el-form-item>                            

                <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
                <el-button type="default" @click="resetData()">清空</el-button>
                <el-button type="danger" @click="removeByBatch()">清空列表里数据</el-button>
        </el-form>
    
        <br><br>

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
                <el-table-column prop="status" label="状态" />
                <el-table-column prop="gmtCreate" label="考勤打卡时间"></el-table-column>
                
                
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="remove(scope.row.id)"></el-button>
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
import attendance from '@/api/payroll/attendance'
export default {
    data(){
        return {
            list:[],   //查询后接口返回的集合
            page:1,      //当前页
            limit:10,     //每一页的记录数
            total:0,     //总记录数
            attendanceVo:{}, //条件封装对象
            overWork:{}
        }
    },
    created(){
        //初始化页面数据
        this.getList()
        this.getOverWorkInfoList()
    },
    methods:{
        getList(page =1){
            this.page=page
            attendance.getList(this.page,this.limit,this.attendanceVo)
                .then(response=>{
                    this.list=response.data.items
                    this.total=response.data.total
                })
        },
        //查询数据时清空
        resetData(){
            this.attendanceVo={}
            this.getList()
        },
        remove(id){
            attendance.remove(id)
                .then(response=>{
                    this.$message({
                        type:'success',
                        message:'删除成功!'
                    })
                    this.getList()
                })
        },
        removeByBatch(){
            attendance.removeByBatch(this.list)
                .then(response=>{
                    this.$message({
                        type:'success',
                        message:'批量删除成功！'
                    })
                    this.resetData()
                })
        }
   }

}
</script>