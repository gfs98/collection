<template>
    <golbalLayout> 
        <RouterView>
            <template #default="{ Component, route }">
                <transition
                    name="fade"
                    mode="out-in"
                    appear
                >
                    <keep-alive v-if="needCache" :include="getCaches">
                        <component :is="Component" :key="route.fullPath" />
                    </keep-alive>
                    <component v-else :is="Component" :key="route.fullPath" />
                </transition>
            </template>
        </RouterView>
    </golbalLayout>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue';
import  golbalLayout  from './golbalLayout';
export default defineComponent({
    components: {
        golbalLayout
    },
    setup() {
        let data = reactive({
            needCache:false,
            getCaches:[]
        })
        return {
            ...toRefs(data),
        }
    },
});
</script>
<style scoped>
</style>