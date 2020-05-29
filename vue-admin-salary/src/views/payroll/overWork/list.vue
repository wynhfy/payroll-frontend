<template>
  <div class="app-container">
       <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="overWorkQuery.employeeId" placeholder="工号"/>
                </el-form-item>

                <el-select v-model="overWorkQuery.typeId" placeholder="加班类别 请选择">
                    <el-option
                        v-for="(overWorkInfo) in overWorkInfoList"
                        :key="overWorkInfo.id"
                        v-html="overWorkInfo.description"
                        :label="overWorkInfo.description"
                        :value="overWorkInfo.id">
                    </el-option>
                </el-select>

                <el-form-item>
                    <el-radio v-model="overWorkQuery.status" label="开始加班">正在加班</el-radio>
                    <el-radio v-model="overWorkQuery.status" label="结束加班">结束加班</el-radio>
                </el-form-item>

                <el-form-item>
                    <el-date-picker
                    v-model="overWorkQuery.begin"
                    type="datetime"
                    placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    default-time="00:00:00"
                    />
                </el-form-item>

                <el-form-item>
                    <el-date-picker
                    v-model="overWorkQuery.end"
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
                <el-table-column prop="description" label="加班类别" />
                <el-table-column prop="status" label="加班状态" width="180">
                          <template slot-scope="scope">
                             {{scope.row.status==='开始加班'?'正在加班':'加班结束'}}
                          </template>
                </el-table-column>
                <el-table-column prop="gmtCreate" label="加班开始时间"></el-table-column>
                <el-table-column prop="gmtModified" label="加班结束时间"></el-table-column>
                
                
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
import overWork from '@/api/payroll/overWork'
import overWorkInfo from '@/api/payroll/overWorkInfo'
export default {
    data(){
        return {
            list:[],   //查询后接口返回的集合
            page:1,      //当前页
            limit:10,     //每一页的记录数
            total:0,     //总记录数
            overWorkQuery:{}, //条件封装对象
            overWork:{},
            overWorkInfoList:[]
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
            overWork.getList(this.page,this.limit,this.overWorkQuery)
                .then(response=>{
                    this.list=response.data.items
                    this.total=response.data.total
                })
        },
        getOverWorkInfoList(){
            overWorkInfo.getOverWorkInfoList()
                .then(response=>{
                    this.overWorkInfoList=response.data.items
                })
        },
        //查询数据时清空
        resetData(){
            this.overWorkQuery={}
            this.getList()
        },
        remove(id){
            overWork.remove(id)
                .then(response=>{
                    this.$message({
                        type:'success',
                        message:'删除成功!'
                    })
                    this.getList()
                })
        },
        removeByBatch(){
            overWork.removeByBatch(this.list)
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