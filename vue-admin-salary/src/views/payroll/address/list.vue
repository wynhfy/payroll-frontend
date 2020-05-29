<template>
  <div class="app-container">
       <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="addressQuery.id" placeholder="工号"/>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="addressQuery.province" placeholder="省份"/>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="addressQuery.city" placeholder="城市"/>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="addressQuery.area" placeholder="区"/>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="addressQuery.detail" placeholder="详细住址"/>
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

                <el-table-column prop="id" label="工号" width="80" />
                <el-table-column prop="province" label="省份" />
                <el-table-column prop="city" label="城市" />
                <el-table-column prop="area" label="区" />
                <el-table-column prop="detail" label="详细地址" width="160"/>
                
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="editAddress(scope.row.id)">修改</el-button>
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

        <!-- 修改地址信息表单 -->
        <el-dialog :visible.sync="dialogChapterFormVisible" title="修改地址信息">
            <el-form :model="address" label-width="120px">
                <el-form-item label="省份">
                    <el-input v-model="address.province"/>
                </el-form-item>
                <el-form-item label="城市">
                    <el-input v-model="address.city" />
                </el-form-item>
                <el-form-item label="区">
                    <el-input v-model="address.area" />
                </el-form-item>
                <el-form-item label="详细住址">
                    <el-input v-model="address.detail" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateAddress">确 定</el-button>
            </div>
        </el-dialog>
        
  </div>
</template>
<script>
import address from '@/api/payroll/address'
export default {
    data(){
        return {
            list:[],   //查询后接口返回的集合
            page:1,      //当前页
            limit:3,     //每一页的记录数
            total:0,     //总记录数
            addressQuery:{}, //条件封装对象
            address:{},
            dialogChapterFormVisible:false
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
            address.getAddressList(this.page,this.limit,this.addressQuery)
                .then(response=>{
                    this.list=response.data.items
                    this.total=response.data.total
                })
        },
        //查询数据时清空
        resetData(){
            this.addressQuery={}
            this.getList()
        },
        editAddress(id){
            this.dialogChapterFormVisible=true
            address.getAddressInfo(id)
                .then(response=>{
                    this.address=response.data.address
                })
        },
        updateAddress(){
            address.updateAddress(this.address)
                .then(response=>{
                    this.dialogChapterFormVisible=false
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        });
                        this.getList()
                })
        }

   }

}
</script>