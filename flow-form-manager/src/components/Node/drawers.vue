<template>
    <div class="drawers">
        <el-drawer title="发起人" :visible.sync="inpromoterDrawer" direction="rtl" class="set_promoter" size="550px" :before-close="ok" append-to-body> 
            <div class="demo-drawer__content">
                <div class="promoter_content drawer_content">
                    <p>{{innerNodeConfig.content}}</p>
                    <el-button type="primary" @click="addPerson">添加/修改发起人</el-button>
                </div>
                <div class="demo-drawer__footer clear">
                    <el-button type="primary" @click="ok">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </div>
        </el-drawer>
        <el-drawer title="审批人设置" :visible.sync="inapproverDrawer" direction="rtl" class="set_promoter" size="550px" :before-close="ok" append-to-body> 
            <div class="demo-drawer__content">
                <div class="drawer_content">
                    <div class="approver_content">
                        <el-radio-group v-model="innerNodeConfig.settype" class="clear" @change="changeType">
                            <el-radio :label="1">指定成员</el-radio>
                            <el-radio :label="2">主管</el-radio>
                            <el-radio :label="3">发起人自选</el-radio>
                            <el-radio :label="4">发起人自己</el-radio>
                            <el-radio :label="5">连续多级主管</el-radio>
                        </el-radio-group>
                        <el-button type="primary" @click="addPerson(innerNodeConfig.nodeUserList)" v-if="innerNodeConfig.settype==1">添加/修改成员</el-button>
                        <p class="selected_list" v-if="innerNodeConfig.settype==1">
                            <span v-for="(item,index) in innerNodeConfig.nodeUserList" :key="index">{{item.name}}
                                <img src="@/assets/images/add-close1.png" @click="removeEle(innerNodeConfig.nodeUserList,item,'targetId')">
                            </span>
                            <a v-if="innerNodeConfig.nodeUserList.length!=0" @click="clearDSelect">清除</a>
                        </p>
                    </div>
                    
                </div>
                <div class="demo-drawer__footer clear">
                    <el-button type="primary" @click="ok">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </div>
        </el-drawer>
        <el-drawer title="抄送人设置" :visible.sync="incopyerDrawer" direction="rtl" class="set_copyer" size="550px" :before-close="ok" append-to-body> 
            <div class="demo-drawer__content">
                <div class="copyer_content drawer_content">
                    <el-button type="primary" @click="addPerson(innerNodeConfig.nodeUserList)">添加成员</el-button>
                    <p class="selected_list" v-if="innerNodeConfig.settype==1">
                        <span v-for="(item,index) in innerNodeConfig.nodeUserList" :key="index">{{item.name}}
                            <img src="@/assets/images/add-close1.png" @click="removeEle(innerNodeConfig.nodeUserList,item,'targetId')">
                        </span>
                        <a v-if="innerNodeConfig.nodeUserList.length!=0" @click="clearDSelect">清除</a>
                    </p>
                </div>
                <div class="demo-drawer__footer clear">
                    <el-button type="primary" @click="ok">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
                
            </div>
        </el-drawer>
        <el-drawer title="条件设置" :visible.sync="inconditionDrawer" direction="rtl" class="condition_copyer" size="550px" :before-close="ok" append-to-body> 
            <select v-model="innerNodeConfig.priorityLevel">
                <option v-for="item in priorityLevels" :value="item" :key="item">优先级{{item}}</option>
            </select>
            <div class="demo-drawer__content">
                <!-- {{innerNodeConfig}} -->
                <div class="condition_content drawer_content">
                    <p class="tip">当审批单同时满足以下条件时进入此流程</p>
                    <ul>
                        <li v-for="(item,index) in innerNodeConfig.conditionList" :key="`${index}+e`">
                            <span class="ellipsis">{{item.showName}}</span>
                            <div v-if="item.type==1">
                                <p :class="innerNodeConfig.nodeUserList.length > 0?'selected_list':''" @click.self="addPerson(innerNodeConfig.nodeUserList)" style="cursor:text">
                                    <span v-for="(item1,index1) in innerNodeConfig.nodeUserList" :key="index1">
                                        {{item1.name}}<img src="@/assets/images/add-close1.png" @click="removeEle(innerNodeConfig.nodeUserList,item1,'targetId')">
                                    </span>
                                    <input type="text" placeholder="请选择具体人员/角色/部门" v-if="innerNodeConfig.nodeUserList.length == 0" @click="addPerson">
                                </p>
                            </div>
                            <a v-if="item.type==1" @click="innerNodeConfig.nodeUserList= [];removeEle(innerNodeConfig.conditionList,item,'columnId')">删除</a>
                        </li>
                    </ul>
                    <el-button type="primary" @click="addCondition">添加条件</el-button>
                    <el-dialog title="选择条件" :visible.sync="conditionVisible" width="480px" append-to-body class="condition_list">
                        <p>请选择用来区分审批流程的条件字段</p>
                        <p class="check_box">
                            <a :class="toggleClass(conditionList,{columnId:0},'columnId')&&'active'" @click="toChecked(conditionList,{columnId:0},'columnId')">发起人</a>
                            <a v-for="(item,index) in conditions" :key="index" :class="toggleClass(conditionList,item,'columnId')&&'active'" 
                            @click="toChecked(conditionList,item,'columnId')">{{item.showName}}</a>
                        </p>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="conditionVisible = false">取 消</el-button>
                            <el-button type="primary" @click="sureCondition">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
                <div class="demo-drawer__footer clear">
                    <el-button type="primary" @click="ok">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </div>
        </el-drawer>
        <el-dialog title="选择成员" :visible.sync="selectVisible" width="600px" append-to-body class="promoter_person">
            <div class="person_body clear">
                <div class="person_tree l">
                    <el-input type="text" placeholder="搜索成员" v-model="searchName" @input="searchByName()"></el-input>
                    <el-tree
                        ref="tree"
                        :props="treeprops"
                        :data="departments.childDepartments"
                        show-checkbox
                        node-key="id"
                        @check-change="handleCheckChange">
                    </el-tree>
                </div>
                <div class="has_selected l">
                    <p class="clear">已选（{{selectedList.length}}）
                        <a @click="clearSelect">清空</a>
                    </p>
                    <ul>
                        <li v-for="(item,index) in selectedList" :key="index+'e'">
                            <!-- <img src="@/assets/images/icon_people.png">
                            <span>{{item.employeeName}}</span> -->
                            <span>{{item.departmentName}}</span>
                            <img src="@/assets/images/cancel.png" @click="removeEle(selectedList,item)">
                        </li>
                    </ul>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="selectVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureSelect">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'',
    components: {},
    props: ['nodeConfig','Pconfig','promoterDrawer','approverDrawer','copyerDrawer','conditionDrawer'],
    data() {
        return {
            inpromoterDrawer:false,
            inapproverDrawer:false,
            incopyerDrawer:false,
            inconditionDrawer:false,
            selectVisible:false,
            conditionVisible:false,
            searchName:"",
            departments:[],
            innerNodeConfig:{},
            approverEmplyessList:[],
            conditionList: [],
            selectedList:[],
            treeCheckList: [],           
            conditions: [],
            treeprops:{
                children: 'children',
                label: 'departmentName'
            },
            priorityLevels:0
        }
    },
    mounted() {
        this.getDepartmentList()
    },
    watch:{
        promoterDrawer(val){
            this.inpromoterDrawer=val
            this.innerNodeConfig=this.nodeConfig
            // this.getConfig()
        },
        approverDrawer(val){
            this.inapproverDrawer=val
            this.innerNodeConfig=this.nodeConfig
            console.log(this.nodeConfig)
            // this.getConfig()
        },
        copyerDrawer(val){
            this.incopyerDrawer=val
            this.innerNodeConfig=this.nodeConfig
            // this.getConfig()
        },
        conditionDrawer(val){
            this.inconditionDrawer=val
            this.innerNodeConfig=this.nodeConfig
            // this.getConfig()
            this.priorityLevels=this.Pconfig.conditionNodes.length
        },
    },
    methods: {
        getConfig(){
            this.innerNodeConfig = JSON.parse(JSON.stringify(this.nodeConfig))
            this.innerNodeConfig.settype = this.innerNodeConfig.settype ? this.innerNodeConfig.settype : 1
        },
        ok(){
            this.$emit("update:nodeConfig", this.innerNodeConfig);
            // this.$emit("updateNodeConfig", this.innerNodeConfig);
            this.cancel()
        },
        cancel(){
            this.inpromoterDrawer=false
            this.inapproverDrawer=false
            this.incopyerDrawer=false
            this.inconditionDrawer=false
            this.$emit("DrawerHidden")
        },
        
        getDepartmentList(parentId = 0) {
            this.$axios.get(`/getDepartments?parentId=${parentId}`).then(res => {
                this.departments = res.data;
            })
        },
        toggleClass(arr, elem, key = 'id') {
            return arr.some(item => { return item[key] == elem[key] });
        },
        toChecked(arr, elem, key = 'id') {
            var isIncludes = this.toggleClass(arr, elem, key);
            !isIncludes ? arr.push(elem) : this.removeEle(arr, elem, key);
        },
        removeEle(arr, elem, key = 'id') {
            var includesIndex;
            if(key=='targetId'){
                arr.map((item, index) => {
                    if (item[key] == elem[key]) {
                        includesIndex = index
                    }
                });
                arr.splice(includesIndex, 1);
                this.selectedList.map((item, index) => {
                    if (item.id == elem[key]) {
                        includesIndex = index
                    }
                });
                this.selectedList.splice(includesIndex, 1);
                if(this.selectedList.length==0){
                    this.clearDSelect()
                }
            }else{
                arr.map((item, index) => {
                    if (item[key] == elem[key]) {
                        includesIndex = index
                    }
                });
                arr.splice(includesIndex, 1);
            }
            
            if( key == 'id' ) {
                this.treeCheckList=this.selectedList.map((v)=>{
                    return v.id
                })
                this.$refs.tree.setCheckedKeys(this.treeCheckList);
            }
        },
        addPerson(list){
            this.selectVisible=true
            this.selectedList=[]
            this.$refs.tree.setCheckedKeys([])
            this.departments.childDepartments.map(d=>{
                list.map(u=>{
                    if(u.targetId==d.id){
                        this.selectedList.push(d)
                    }
                })
            })
            if(this.selectedList.length>0){
                this.treeCheckList=this.selectedList.map((v)=>{
                    return v.id
                })
                this.$nextTick(()=>{
                    this.$refs.tree.setCheckedKeys(this.treeCheckList);
                })
                
            }
        },
        addCondition(){
            this.conditionVisible=true
            if (this.innerNodeConfig.conditionList) {
                    for (var i = 0; i < this.innerNodeConfig.conditionList.length; i++) {
                        var { columnId } = this.innerNodeConfig.conditionList[i]
                        if (columnId == 0) {
                            this.conditionList.push({ columnId: 0 })
                        } else {
                            this.conditionList.push(this.conditions.filter(item => { return item.columnId == columnId; })[0])
                        }
                    }
                }
        },
        sureCondition(){
            for (var i = 0; i < this.conditionList.length; i++) {
                var { columnId } = this.conditionList[i]
                if (this.toggleClass(this.innerNodeConfig.conditionList, this.conditionList[i], "columnId")) {
                    continue;
                }
                if (columnId == 0) {
                    this.innerNodeConfig.nodeUserList == [];
                    this.innerNodeConfig.conditionList.push({
                        "type": 1,
                        "columnId": columnId,
                        "showName": '发起人'
                    });
                }
            }
            this.conditionVisible=false;
        },
        sureSelect(){
            this.innerNodeConfig.nodeUserList=[]
            this.selectedList.map(item => {
                this.innerNodeConfig.nodeUserList.push({
                    type: 1,
                    targetId: item.id,
                    name: item.departmentName
                })
            });
            if(this.innerNodeConfig.nodeUserList.length>0){
                let arr=this.innerNodeConfig.nodeUserList.map((n)=>{
                    return n.name
                })
                if(this.innerNodeConfig.type=='condition'){
                    this.innerNodeConfig.content='发起人属于：'+arr.join(",")
                }
                this.innerNodeConfig.content=arr.join(",")
            }else{
                this.innerNodeConfig.content=""
            }
            this.selectVisible = false
        },
        changeType(val) {
            // 清空一下选择的东西
            this.innerNodeConfig.nodeUserList = [];
            if(val==2){
                this.innerNodeConfig.content="主管"
                console.log(this.innerNodeConfig.content)
            }else if(val==3){
                this.innerNodeConfig.content="发起人自选"
            }else if(val==4){
                this.innerNodeConfig.content="发起人自己"
            }else if(val==5){
                this.innerNodeConfig.content="连续多级主管"
            }
        },
        handleCheckChange(data,checked) {
            if(checked){
                let arr=this.selectedList.concat(data);
                let set = new Set(arr);
                let newArr = Array.from(set);
                this.selectedList=newArr;
            }else{
                this.selectedList.map((item, index) => {
                    if (data.id == item.id) {
                        this.selectedList.splice(index, 1)
                    }
                })  
            }
        },
        clearSelect(){
            this.selectedList=[];
            this.$refs.tree.setCheckedKeys([]);
        },
        clearDSelect(){
            this.innerNodeConfig.content="";
            this.innerNodeConfig.nodeUserList=[];
        },
        searchByName(){
            this.$axios.get(`/getDepartments?searchName=${this.searchName}`).then(res => {
                this.departments = res.data;
            })
        }
    }
}
</script>
<style>
.demo-drawer__content {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.drawer_content {
    flex: 1;
}
.demo-drawer__content>div {
    border-top: 1px solid #F2F2F2;
}
.demo-drawer__footer {
    padding: 10px 30px;
    border-top: 1px solid #F2F2F2;
}

.demo-drawer__footer .el-button {
    float: right;
    margin-right: 10px;
}
.drawers .el-button {
    min-width: 79px;
    padding: 8px 12px;
    font-size: 12px;
    border-radius: 4px;
    background: #46A6FE;
}

.drawers .el-button.el-button--default {
    color: #323232;
    background: #f2f2f2;
}
.drawers a{
    text-decoration: none;
    cursor: pointer;
    color: #3296fa;
}
</style>
<style scoped>
.promoter_content {
    padding: 0 20px;
}
.condition_content .el-button,
.copyer_content .el-button,
.approver_self_select .el-button,
.promoter_content .el-button,
.approver_content .el-button {
    margin-bottom: 20px;
}
.promoter_content p {
    padding: 18px 0;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
}
.promoter_person .el-dialog__body {
    padding: 10px 20px 14px 20px;
}
.person_body {
    display: flex;
    flex-direction: row;
    border: 1px solid #f5f5f5;
    height: 500px;
}
.person_tree {
    padding: 10px 12px 0 8px;
    width: 280px;
    height: 100%;
    border-right: 1px solid #f5f5f5;
}
.person_tree input {
    padding-left: 22px;
    width: 210px;
    height: 30px;
    font-size: 12px;
    border-radius: 2px;
    border: 1px solid #d5dadf;
    background: url(~@/assets/images/list_search.png) no-repeat 10px center;
    background-size: 14px 14px;
    margin-bottom: 14px;
}
.tree_nav span {
    display: inline-block;
    padding-right: 10px;
    margin-right: 5px;
    max-width: 6em;
    color: #38adff;
    font-size: 12px;
    cursor: pointer;
    background: url(~@/assets/images/jiaojiao.png) no-repeat right center;
}
.tree_nav span:last-of-type {
    background: none;
}
.person_tree ul,
.has_selected ul {
    height: 420px;
    overflow-y: auto;
}
.person_tree li {
    padding: 5px 0;
}
.person_tree li i {
    float: right;
    padding-left: 24px;
    padding-right: 10px;
    color: #3195f8;
    font-size: 12px;
    cursor: pointer;
    background: url(~@/assets/images/next_level_active.png) no-repeat 10px
        center;
    border-left: 1px solid rgb(238, 238, 238);
}
.person_tree li a.active + i {
    color: rgb(197, 197, 197);
    background-image: url(~@/assets/images/next_level.png);
    pointer-events: none;
}
.person_tree img {
    width: 14px;
    vertical-align: middle;
    margin-right: 5px;
}
.has_selected {
    width: 276px;
    height: 100%;
    font-size: 12px;
}
.has_selected ul {
    height: 460px;
}
.has_selected p {
    padding-left: 19px;
    padding-right: 20px;
    line-height: 37px;
    border-bottom: 1px solid #f2f2f2;
}
.has_selected p a {
    float: right;
}
.has_selected ul li {
    margin: 11px 26px 13px 19px;
    line-height: 17px;
}
.has_selected li span {
    vertical-align: middle;
}
.has_selected li img:first-of-type {
    width: 14px;
    vertical-align: middle;
    margin-right: 5px;
}
.has_selected li img:last-of-type {
    float: right;
    margin-top: 2px;
    width: 14px;
}
.el-radio-group {
    padding: 20px 0;
}
.approver_content {
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f2f2;
}
.approver_content .el-radio,
.approver_some .el-radio,
.approver_self_select .el-radio {
    width: 27%;
    margin-bottom: 20px;
}
.copyer_content .el-checkbox {
    margin-bottom: 20px;
}
.el-checkbox__label {
    font-size: 12px;
}
.condition_content,
.copyer_content,
.approver_self_select,
.approver_manager,
.approver_content,
.approver_some {
    padding: 20px 20px 0;
}
.approver_manager p:first-of-type,
.approver_some p {
    line-height: 19px;
    font-size: 14px;
    margin-bottom: 14px;
}

.approver_manager p {
    line-height: 32px;
}
.approver_manager select {
    width: 420px;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
}
.approver_manager p.tip {
    margin: 10px 0 22px 0;
    font-size: 12px;
    line-height: 16px;
    color: #f8642d;
}
.approver_self {
    padding: 28px 20px;
}
.selected_list {
    margin-bottom: 20px;
    line-height: 32px;
    font-size: 14px;
}
.selected_list span {
    margin-right: 10px;
    padding: 3px 6px 3px 9px;
    line-height: 12px;
    white-space: nowrap;
    border-radius: 2px;
    border: 1px solid rgba(220, 220, 220, 1);
}
.selected_list img {
    margin-left: 5px;
    width: 7px;
    height: 7px;
    cursor: pointer;
}
.approver_self_select h3 {
    margin: 5px 0 20px;
    font-size: 14px;
    font-weight: bold;
    line-height: 19px;
}
.condition_copyer .el-drawer__body select {
    position: absolute;
    top: 11px;
    right: 30px;
    width: 100px;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
}
.condition_content p.tip {
    margin: 20px 0;
    width: 510px;
    text-indent: 17px;
    line-height: 45px;
    background: rgba(241, 249, 255, 1);
    border: 1px solid rgba(64, 163, 247, 1);
    color: #46a6fe;
    font-size: 14px;
}
.condition_content ul {
    max-height: 500px;
    overflow-y: scroll;
    margin-bottom: 20px;
}
.condition_content li > span {
    float: left;
    margin-right: 8px;
    width: 70px;
    line-height: 32px;
    text-align: right;
}
.condition_content li > div {
    display: inline-block;
    width: 370px;
}
.condition_content li:not(:last-child) > div > p {
    margin-bottom: 20px;
}
.condition_content li > div > p:not(:last-child) {
    margin-bottom: 10px;
}
.condition_content li > a {
    float: right;
    margin-right: 10px;
    margin-top: 7px;
}
.condition_content li select,
.condition_content li input {
    width: 100%;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(217, 217, 217, 1);
}
.condition_content li select + input {
    width: 260px;
}
.condition_content li select {
    margin-right: 10px;
    width: 100px;
}
.condition_content li p.selected_list {
    padding-left: 10px;
    border-radius: 4px;
    min-height: 32px;
    border: 1px solid rgba(217, 217, 217, 1);
}
.condition_content li p.check_box {
    line-height: 32px;
}
.condition_list .el-dialog__body {
    padding: 16px 26px;
}
.condition_list p {
    color: #666666;
    margin-bottom: 10px;
}
.condition_list p.check_box {
    margin-bottom: 0;
    line-height: 36px;
}
</style>