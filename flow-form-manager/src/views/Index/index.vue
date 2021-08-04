<template>
    <div class="">
        <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside class="myside" width="225px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '2']" @select="menuSelect">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>表单</template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">表单管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>流程</template>
                <el-menu-item-group>
                    <el-menu-item index="2-1">流程管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="2-2">流程配置</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-aside>
        
        <el-container>
            <el-header style="line-height:60px;text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>
            
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
    name:'',
    components: {},
    props: [],
    data() {
        return {
            
        }
    },
    mounted() {
        // console.log(this.$router)
    },
    methods: {
        menuSelect(index){
            switch (index){
                case "1-1":
                    this.routerJump("/index/table")
                    break;
                case "2-1":
                    this.routerJump("/index/bpmn")
                    break;
                case "2-2":
                    this.routerJump("/index/process")
                    break;
                default:
                    break;
            }
        },
        routerJump(path){
            this.$router.currentRoute.path == path? "" :this.$router.push(path)
        }
    }
}
</script>
<style>
.myside::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
}
.myside::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(0,0,0,0.2);
}
.myside::-webkit-scrollbar-track{
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
</style>