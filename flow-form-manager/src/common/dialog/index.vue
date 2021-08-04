<template>
    <div>
        <el-dialog
            :title="newData.dialogtitle ? newData.dialogtitle : `提示`"
            :visible.sync="visible"
            :width="newData.dialogwidth ? newData.dialogwidth : `30%`"
            :before-close="handleClose">
            <component :key="Number(new Date())"
                       :is="newData ? newData.component : null"
            />
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="visible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'mydialog',
    components: {},
    props: [
        'data',
        'dialogVisible',
    ],
    watch: {
        data(val) {
            this.newData = val
        },
        dialogVisible(val) {
            this.visible = val
        }
    },
    data() {
        return {     
            newData:{},
            visible:false
        }
    },
    mounted() {
        // component: require('@/views/process/index.vue').default,
    },
    methods: {
        handleClose(){
            this.$emit("dialogClose",false)
        }
    }
}
</script>
<style scoped>
</style>