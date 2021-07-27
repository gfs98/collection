<template>
    <a-layout-header class="top-header">
        <div class="header-left">
            <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
                <MenuUnfoldOutlined v-if="collapsed" />
                <MenuFoldOutlined v-else />
            </a-button>
        </div>
        <div class="header-right"></div>
    </a-layout-header>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons-vue';
import { menu } from "@/store/modules/menu";

export default defineComponent({
    components:{
        MenuFoldOutlined,
        MenuUnfoldOutlined
    },
    setup() {
        const data = reactive({
            collapsed: false,
        });
        const toggleCollapsed = () => {
            data.collapsed = !data.collapsed;
            menu.dispatch("setCollapsed", data.collapsed);
        };
        return {
            ...toRefs(data),
            toggleCollapsed,
        }
    },
});
</script>
<style scoped>
.top-header{
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
}
</style>