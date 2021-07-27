<template>
    <div class="w-full h-full iframe-container">
        <a-spin :spinning="loading" class="w-full h-full spin" wrapperClassName="w-full h-full" tip="正在加载中...">
            <iframe :src="frameSrc"  ref="frameRef" class="w-full h-full" @load="frameload"></iframe>
        </a-spin>
        
    </div>
</template>
<script>
import { defineComponent, ref, onMounted, nextTick  } from 'vue';
import { router } from '@/router'
export default defineComponent({
    components: {},

    setup() {
        let frameSrc = ref('')
        let loading = ref(false)
        const frameload=()=>{
            nextTick(()=>{
                loading.value = false;
            })
        }
        onMounted(()=>{
            loading.value=true
            frameSrc.value = router.currentRoute._value.meta.iframeSrc
        })
        return {
            frameSrc,
            loading,
            frameload
        }
    },
});
</script>
<style lang="less" scoped>
@scrollBarSize: 10px;
::-webkit-scrollbar {
    width: @scrollBarSize;
    height: @scrollBarSize;
    background-color: transparent;
    display: none;
}
::-webkit-scrollbar-track {
    background-color: transparent;
}
::-webkit-scrollbar-thumb {
    border-radius: @scrollBarSize;
    background-color: #eee;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);

    &:hover {
    background-color: #dddddd;
    }

    &:active {
    background-color: #bbbbbb;
    }
}
.iframe-container{
    position: relative;
}
.spin{
    position: absolute;
    left: 50%;
    top:50%;
}
</style>
<style>
.iframe-container .ant-spin-nested-loading .ant-spin-container{
    height: 100% ;
}
</style>