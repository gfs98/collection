<template>
    <div>
        <div class="search">
            <el-input v-model="searchData" placeholder="请输入内容"></el-input>
            <el-button size="middle">查询</el-button>
        </div>
        <el-table border :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="look(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <mydialog :dialogVisible="dialogVisible" :data="dialogData" @dialogClose="dialogClose"></mydialog>
    </div>
</template>
<script>
import mydialog from '@/common/dialog'
export default {
    name:'',
    components: {
        mydialog
    },
    props: [],
    data() {
        return {
            searchData:"",
            dialogVisible:false,
            componentData:{
                dialogwidth:"50%",
                dialogtitle:"流程",
                component: ()=>import(`@/views/process/index`)
                // component: require(`@/views/process/index`)
            },
            dialogData:{},
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    mounted() {

    },
    methods: {
        look(row){
            row.dialogwidth=this.componentData.dialogwidth;
            row.dialogtitle=this.componentData.dialogtitle;
            row.component=this.componentData.component;
            this.dialogData=row;
            this.dialogVisible=true
        },
        edit(row){
            row.dialogwidth=this.componentData.dialogwidth;
            row.dialogtitle=this.componentData.dialogtitle;
            row.component=this.componentData.component;
            this.dialogData=row;
            this.dialogVisible=true
        },
        dialogClose(val){
            this.dialogVisible=val
        }
    }
}
</script>
<style scoped>
.search{
    display: flex;
    width: 300px;
    padding: 10px;
}
.search .el-input,.search .el-button{
    margin: 10px;
}
</style>