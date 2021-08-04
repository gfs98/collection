<template>
    <div>
        <div v-if="nodeConfig.type != 'branch'" :class="'node-wrap '+nodeConfig.type+'-node'">
            <div class="node-wrap-box" :class="isVerify&&!nodeConfig.content?'nodeError':''">
                <div class="node-title" :style="'background:rgb('+colorList[nodeConfig.type]+')'">
                    <i :class="iconList[nodeConfig.type]"></i>
                    &nbsp;{{nodeConfig.nodeName}} 
                    <i class="el-icon-close icon node-title-close" @click="delNode"></i></div>
                <div class="node-content" @click="setContent(nodeConfig)">
                    <span>{{nodeConfig.content?nodeConfig.content:"请设置"+placeholderList[nodeConfig.type]}}</span>
                    <i class="el-icon-arrow-right icon right-arrow"></i>
                </div>
                <div class="error_tip" v-if="isVerify&&!nodeConfig.content">
                    <i class="el-icon-warning" style="color: rgb(242, 86, 67);"></i>
                </div>
            </div>
            <addNode :childNodeP.sync="nodeConfig.childNode"></addNode>
        </div>
        <div class="branch-wrap" v-if="nodeConfig.type == 'branch'">
            <div class="branch-wrap-box">
                <el-button class="add-button" size="small" @click="addTerm">添加条件</el-button>
                <div class="condition-wrap-box">
                    <div class="condition-add-box" v-for="(item,index) in nodeConfig.conditionNodes" :key="index">
                        <div class="center-line"></div>
                        <div class="condition-box" :class="isVerify&&!item.content?'nodeError':''">
                            <div class="condition-left" v-if="index != 0" @click="arrTransfer(index,-1)">
                                <i class="el-icon-arrow-left icon left-arrow"></i>
                            </div>
                            <div class="condition-title-content">
                                <div class="condition-title">
                                    <span class="title">{{item.nodeName}}</span>
                                    <span class="priority">优先级{{item.priorityLevel}}</span>
                                    <i class="el-icon-close icon condition-title-close" @click="delTerm(index)"></i>
                                </div>
                                <div class="condition-content" @click="setContent(item,nodeConfig)">
                                    <span>{{item.content?item.content:"请设置"+placeholderList[item.type]}}</span>
                                </div>
                            </div>
                            <div class="condition-right" v-if="index != nodeConfig.conditionNodes.length-1" @click="arrTransfer(index)">
                                <i class="el-icon-arrow-right icon right-arrow"></i>
                            </div>
                            <div class="error_tip" v-if="isVerify&&!item.content">
                                <i class="el-icon-warning" style="color: rgb(242, 86, 67);"></i>
                            </div>
                        </div>
                        <addNode :childNodeP.sync="item.childNode"></addNode>
                        <nodeWrap v-if="item.childNode && item.childNode" :nodeConfig.sync="item.childNode" :isVerify.sync="isVerify"></nodeWrap>
                    </div>
                </div>
            </div>
            <addNode :childNodeP.sync="nodeConfig.childNode"></addNode>
        </div>
        <nodeWrap v-if="nodeConfig.childNode && nodeConfig.childNode" :nodeConfig.sync="nodeConfig.childNode" :isVerify.sync="isVerify"></nodeWrap>
        <drawers :nodeConfig="activeNodeConfig" :Pconfig="Pconfig" :promoterDrawer="promoterDrawer" :approverDrawer="approverDrawer" :copyerDrawer="copyerDrawer" :conditionDrawer="conditionDrawer" @DrawerHidden="DrawerHidden" @updateNodeConfig="updateNodeConfig"></drawers>
    </div>
</template>
<script>
import addNode from '@/components/Node/addNode'
import drawers from '@/components/Node/drawers'
export default {
    name:'nodeWrap',
    components: {
        addNode,
        drawers
    },
    props: ['nodeConfig','isVerify'],
    data() {
        return {
            colorList: {
                "start":"87, 106, 149",
                "audit":"255, 148, 62",
                "copy":"50, 150, 250"
            },
            iconList : {
                "start":"",
                "audit":"el-icon-user-solid",
                "copy":"el-icon-s-promotion"
            },
            placeholderList: {"start":"发起人", "audit":"审核人", "copy":"抄送人", "condition":"条件"},
            nodeconfig:{},
            Pconfig:{},
            activeNodeConfig:{},
            promoterDrawer:false,
            approverDrawer:false,
            copyerDrawer:false,
            conditionDrawer:false,
            eventList : {
                "start":"",
                "audit":"",
                "copy":"",
                "condition":""
            }
        }
    },
    mounted() {
    
    },
    methods: {
        getDepartment(arr){
            let nameList=arr&&arr.map((v)=>{return v.name})
            let str='请设置条件'
            if(nameList.length!=0){
                str='发起人属于：'+nameList.join(',')
            }
            return str
        },
        arrTransfer(index, type = 1) {//向左-1,向右1
            this.nodeConfig.conditionNodes[index] = this.nodeConfig.conditionNodes.splice(index + type, 1, this.nodeConfig.conditionNodes[index])[0];
            this.nodeConfig.conditionNodes.map((item, index) => {
                item.priorityLevel = index + 1
            })
            // this.$emit("update:nodeConfig", this.nodeConfig);
        },
        delNode() {
            this.$emit("update:nodeConfig", this.nodeConfig.childNode);
        },
        addTerm() {
            let len = this.nodeConfig.conditionNodes.length + 1
            this.nodeConfig.conditionNodes.push({
                    "nodeName": "条件"+len,
                    "type": "condition",
                    "priorityLevel": len,
                    "selectRange": 0,
                    "conditionList": [],
                    "nodeUserList": [],
                    "childNode": null,
                    "error": false
                });
            // for (var i = 0; i < this.nodeConfig.conditionNodes.length; i++) {
            //     this.nodeConfig.conditionNodes[i].error = this.conditionStr(this.nodeConfig.conditionNodes[i], i) == "请设置条件" && i != this.nodeConfig.conditionNodes.length - 1
            // }
            this.$emit("update:nodeConfig", this.nodeConfig);
        },
        delTerm(index) {
            // console.log(index,this.nodeConfig.conditionNodes)
            this.nodeConfig.conditionNodes.splice(index, 1)
            // for (var i = 0; i < this.nodeConfig.conditionNodes.length; i++) {
            //     this.nodeConfig.conditionNodes[i].error = this.conditionStr(this.nodeConfig.conditionNodes[i], i) == "请设置条件" && i != this.nodeConfig.conditionNodes.length - 1
            // }
            this.$emit("update:nodeConfig", this.nodeConfig);
            if (this.nodeConfig.conditionNodes.length == 1) {
                if (this.nodeConfig.childNode) {
                    if (this.nodeConfig.conditionNodes[0].childNode) {
                        this.reData(this.nodeConfig.conditionNodes[0].childNode, this.nodeConfig.childNode)
                    } else {
                        this.nodeConfig.conditionNodes[0].childNode = this.nodeConfig.childNode
                    }
                }
                this.$emit("update:nodeConfig", this.nodeConfig.conditionNodes[0].childNode);
            }
        },
        reData(data, addData) {
            if (!data.childNode) {
                data.childNode = addData
            } else {
                this.reData(data.childNode, addData)
            }
        },
        setContent(config,nodeConfig){
            this.activeNodeConfig=config
            this.Pconfig=nodeConfig
            // console.log(config.type)
            switch (config.type) { 
                case "start":
                    this.promoterDrawer=true;
                    break;
                case "audit":
                    this.approverDrawer=true;
                    break;
                case "copy":
                    this.copyerDrawer=true;
                    break;
                case "condition":
                    this.conditionDrawer=true;
                    break;
                default:
                    
                    break;
            }
                
        },
        DrawerHidden(){
            this.promoterDrawer=false;
            this.approverDrawer=false;
            this.copyerDrawer=false;
            this.conditionDrawer=false;
        },
        updateNodeConfig(config){
            // this.$emit("update:nodeConfig", config);
            this.$emit("update:activeNodeConfig", config);
        }
    }
}
</script>
<style scoped>
@import '../../css/node.css'
</style>