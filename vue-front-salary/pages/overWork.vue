<template>
     <!-- 主要区域容器 -->
          <el-main style="background-color: #EBEEF5">
               
               <!--查询表单-->
                <el-form :inline="true" class="demo-form-inline">
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

                </el-form>

                <el-form inline="true">
                    <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
                    <el-button type="default" @click="resetData()">清空</el-button>

                    <el-button type="success" @click="start()">开始加班</el-button>
                </el-form>
                <br><br>

                <!-- 加班打卡表单 -->
                <el-dialog :visible.sync="dialogWorkFormVisible" title="加班打卡">
                    <el-form :model="overWork" label-width="120px">
                        <el-select v-model="overWork.typeId" placeholder="加班类别 请选择">
                            <el-option
                                v-for="(overWorkInfo) in overWorkInfoList"
                                :key="overWorkInfo.id"
                                v-html="overWorkInfo.description"
                                :label="overWorkInfo.description"
                                :value="overWorkInfo.id">
                            </el-option>
                        </el-select>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancel()">取 消</el-button>
                        <el-button type="primary" @click="startWork()">确 定</el-button>
                    </div>
                </el-dialog>


               <el-table
                    :data="list" stripe style="width: 100%">
                    <el-table-column
                            label="序号"
                            width="70"
                            align="center">
                            <template slot-scope="scope">
                            {{ scope.$index + 1 }}
                            </template>
                    </el-table-column>
                    
                    <el-table-column prop="description"  label="加班类别"  width="180"></el-table-column>
                    
                    <el-table-column prop="status" label="加班状态" width="180">
                          <template slot-scope="scope">
                             {{scope.row.status==='开始加班'?'正在加班':'加班结束'}}
                          </template>
                    </el-table-column>

                    <el-table-column prop="gmtCreate" label="加班开始时间"></el-table-column>

                    <el-table-column prop="gmtModified" label="加班结束时间">
                        <template slot-scope="scope">
                            {{scope.row.status==='结束加班'?scope.row.gmtModified:''}}
                        </template>
                    </el-table-column>

                    <el-table-column>
                         <template slot-scope="scope">
                              <el-button v-if="scope.row.status==='开始加班'" type="danger" icon="el-icon-delete" @click="finishWork(scope.row.id)">结束加班</el-button>
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
</template>
<script>
import overWork from '@/api/overWork'
export default {
    layout:'home_page',
    data(){
        return{
            list:[],
            overWorkInfoList:[],
            overWorkQuery:{
                
            },
            id:'', //员工的工号
            page:1,
            limit:10,
            total:0,
            dialogWorkFormVisible:false,
            overWork:{
                id:'',
                typeId:'',
                status:'',
                employeeId:'',
                description:''
            },
        }
    },
    created(){
        if(this.$route.params && this.$route.params.id){
            this.overWorkQuery.employeeId=this.$route.params.id
            this.id=this.$route.params.id
            this.overWork.employeeId=this.$route.params.id
        }
        this.getList()
        this.getOverWorkInfoList()
    },
    methods:{
        resetData(){
            this.overWorkQuery={}
            this.overWorkQuery.employeeId=this.id
            this.getList()
        },
        getList(){
            overWork.getList(this.page,this.limit,this.overWorkQuery)
                .then(response=>{
                    this.total=response.data.data.total
                    this.list=response.data.data.items
                })
        },
        getOverWorkInfoList(){
            overWork.getOverWorkInfoList()
                .then(response=>{
                    this.overWorkInfoList=response.data.data.items
                })
        },
        start(){
            this.dialogWorkFormVisible=true
            //每次打开都清空
            this.overWork={}
        },
        startWork(){
            this.overWork.status='开始加班'
            this.overWork.employeeId=this.id
            overWork.startWork(this.overWork)
                .then(response=>{
                    if(response.data.data.error){
                        this.$message(response.data.data.error)
                    }else{
                        this.$message({
                            type:'success',
                            message:'开始加班!'
                        })
                    }
                    this.dialogWorkFormVisible=false
                    this.getList()
                })
        },
        finishWork(id){
            overWork.getInfo(id)
                .then(response=>{
                    this.overWork=response.data.data.overWork
                    console.log(this.overWork)

                    this.overWork.status='结束加班'
                    overWork.startWork(this.overWork)
                        .then(response=>{
                            this.$message({
                                type:'success',
                                message:'加班结束！'
                            })
                            this.dialogWorkFormVisible=false
                            this.overWork.typeId=''
                            this.getList()
                        })
                })
            //this.overWork.status='结束加班'
            
        },
        cancel(){
            this.dialogWorkFormVisible = false
            this.overWork.typeId=''
        }
    }
}
</script>