<template>
    <div class="add-node-btn-box">
        <div class="add-node-btn">
            <el-popover placement="right-start" trigger="click" v-model="visible">
                <div class="add-node-popover-body">
                    <a class="add-node-popover-item approver" @click="addType('audit')">
                        <div class="item-wrapper">
                            <i class="el-icon-user-solid"></i>
                        </div>
                        <p>审批人</p>
                    </a>
                    <a class="add-node-popover-item notifier" @click="addType('copy')">
                        <div class="item-wrapper">
                            <i class="el-icon-s-promotion"></i>
                        </div>
                        <p>抄送人</p>
                    </a>
                    <a class="add-node-popover-item condition" @click="addType('branch')">
                        <div class="item-wrapper">
                            <branchIcon/>
                        </div>
                        <p>条件分支</p>
                    </a>
                </div>
                <button class="btn" type="button" slot="reference">
                    <i class="el-icon-plus icon"></i>
                </button>
            </el-popover>
        </div>
    </div>
</template>
<script>
import initialdata from '@/mock/data/initialdata.json';
import branchIcon from '@/components/Node/branchIcon'
export default {
    props: ["childNodeP"],
    components: {
        branchIcon,
    },
    data() {
        return {
            visible:false
        }
    },
    methods: {
        addType(type) {
            let newNode=JSON.parse(JSON.stringify(initialdata[type]))
            this.visible=false
            newNode.childNode = this.childNodeP
            this.$emit("update:childNodeP",newNode)
            
        }
    }
}
</script>
<style scoped>
    .add-node-btn-box {
        width: 240px;
        display: inline-flex;
        flex-shrink: 0;
        position: relative;
        padding: 20px 0 32px;
        justify-content: center;
    }
    .add-node-btn-box:before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        margin: auto;
        width: 2px;
        height: 100%;
        background-color: #cacaca;
    }
    .btn{
        width: 32px;
        height: 32px;
        border-radius: 15px;
        cursor: pointer;
        outline: none;
        color: #fff;
        background-color: #3296fa;
        border-color: transparent;
        transition: transform 0.5s;
    }
    .add-node-popover-body{
        display: flex;
    }
    .add-node-popover-item{
        display: flex;
        flex-direction: column;
        margin-right: 10px;
        text-align: center;
    }
    .condition{
        margin-right: 0px;
    }
    .item-wrapper{
        width: 50px;
        height: 50px;
        font-size: 24px;
        border:1px solid #eee;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .item-wrapper .el-icon-user-solid{
        color: #ff943e;
    }
    .item-wrapper .el-icon-s-promotion{
        color: #3296fa;
    }
    .icon-condition{
        fill:currentColor;
        color: #15bc83;
    }
</style>

