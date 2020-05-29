<template>
    <el-container>
          <!-- 主要区域容器 -->
          <el-main style="background-color: #EBEEF5">
                <!--查询表单-->
                <el-form :inline="true" class="demo-form-inline">

                        <el-form-item>
                            <el-radio v-model="attendanceVo.status" label="已到">已到</el-radio>
                            <el-radio v-model="attendanceVo.status" label="迟到">迟到</el-radio>
                        </el-form-item>

                        <el-form-item >
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
                        <el-button type="success" @click="arrive()">考勤打卡</el-button>
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

                        <el-table-column prop="gmtCreate" label="签到时间" />
                        <el-table-column prop="status" label="签到情况" width="180">
                          <template slot-scope="scope">
                             {{scope.row.status===true?'已到':'迟到'}}
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
          </el-main>
    </el-container>
</template>
<script>
import attendance from '@/api/attendance'
export default {
    layout: 'home_page',
    data() {
        return {
            id:'',  //员工的工号
            list:[],
            page:1,
            limit:10,
            total:0,
            attendanceVo:{

            }
        }
    },
    created(){
        if(this.$route.params && this.$route.params.id){
            this.id=this.$route.params.id  //从地址栏中获得员工的工号
            this.attendanceVo.employeeId=this.id
        }
        this.getList()
    },
    methods:{
        //根据条件查询
        getList(){
            attendance.getList(this.page,this.limit,this.attendanceVo)
                .then(response=>{
                    this.list=response.data.data.items
                })
        },
        resetData(){
            this.attendanceVo={}
            this.attendanceVo.employeeId=this.id
            this.getList()
        },
        arrive(){
            attendance.add(this.id)
                .then(response=>{
                    if(response.data.data.message){
                        this.$message(response.data.data.message)
                    }else{
                        this.$message({
                            type:'success',
                            message:'打卡成功'
                        })
                        this.getList()
                    }
                })
        }
    }
}
</script>