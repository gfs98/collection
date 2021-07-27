<template>
    <a-layout>
        <sideMenu
            :menus="menus"
            :collapsed="collapsed"
            @menuSelect="myMenuSelect"
            @openMenu="openMenu"
        ></sideMenu>
        <a-layout>
            <golbalHeader></golbalHeader>
                <a-layout-content>
                    <slot></slot>
                </a-layout-content>
            <golbalFooter v-if="false"></golbalFooter>
        </a-layout>
    </a-layout>
</template>
<script>
import { defineComponent, reactive, toRefs, computed } from 'vue';
import  sideMenu  from '../menu/sideMenu.vue';
import { menu } from "@/store/modules/menu";
import  golbalHeader  from '../golbalHeader/golbalHeader.vue';
import  golbalFooter  from '../golbalFooter/golbalFooter.vue';
export default defineComponent({
    components: {
        sideMenu,
        golbalHeader,
        golbalFooter
    },
    setup() {
        let data = reactive({
            // collapsed: false,
            menus: [
                {
                    hidden:false,
                    path:"/system",
                    children:[
                        {
                            hidden:false,
                            path:"/system/account",
                            meta:{
                                target:"router-link",
                                icon:null,
                                title:"用户管理"
                            },
                            route:"/system/account",
                        },
                        {
                            hidden:false,
                            path:"/system/dept",
                            meta:{
                                target:"router-link",
                                icon:null,
                                title:"部门管理"
                            },
                            route:"/system/dept",
                        }
                    ],
                    meta:{
                        target:"router-link",
                        icon:'icon-fangge',
                        title:"系统管理"
                    },
                    route:"/system",
                },
                {
                    hidden:false,
                    path:"/iframe",
                    children:[
                        {
                            hidden:false,
                            path:"/iframe/antd",
                            meta:{
                                target:"router-link",
                                icon:null,
                                title:"antd文档"
                            },
                            route:"/iframe/antd",
                        },
                    ],
                    meta:{
                        target:"router-link",
                        icon:'icon-fangge',
                        title:"外部项目"
                    },
                    route:"/iframe",
                }
            ],
        })

        const collapsed = computed(() => menu.state.collapsed);

        function myMenuSelect(obj){
            console.log(obj)
        }
        function openMenu(obj){
            console.log(obj)
        }
        return {
            ...toRefs(data),
            myMenuSelect,
            openMenu,
            collapsed
        }
    },
});
</script>
<style scoped>
</style>