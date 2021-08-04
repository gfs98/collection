<template>
  <div class="process">
    <el-container>
      <el-header class="nav">
        <div class="nav-title">{{ workFlowDef.name }}</div>
        <div class="nav-button">
          <el-button size="small" @click="saveSet">发 布</el-button>
        </div>
      </el-header>
      <el-main>
        <section class="dingflow-design">
          <div
            class="box-scale"
            id="box-scale"
            :style="
              'transform: scale(' +
                nowVal / 100 +
                '); transform-origin: 50% 0px 0px;'
            "
          >
          <div class="zoom">
            <i
              :class="'el-icon-remove' + (nowVal == 50 ? ' disabled' : '')"
              @click="zoomSize(1)"
            ></i>
            <div style="display:inline-block;width:45px">{{ nowVal }}%</div>
            <i
              :class="
                'el-icon-circle-plus' + (nowVal == 300 ? ' disabled' : '')
              "
              @click="zoomSize(2)"
            ></i>
          </div>
            <nodeWrap
              :nodeConfig.sync="nodeConfig"
              :isVerify.sync="isVerify"
            ></nodeWrap>
            <!-- <displayNode :data.sync="nodeConfig"></displayNode> -->
            <div class="end-node">
              <div class="end-node-circle"></div>
              <div class="end-node-text">流程结束</div>
            </div>
            <!-- <sLine></sLine>
            <sLineb></sLineb> -->
          </div>
        </section>
      </el-main>
    </el-container>
  </div>
</template>
<script>
// import displayNode from '@/components/Node/displayNode.tsx'
// import sLine from '@/common/Line/line'
// import sLineb from '@/common/Line/lineb'
export default {
  components: {
    // displayNode,
    // sLine,
    // sLineb
  },
  data() {
    return {
      isVerify: false,
      tipList: [],
      tipVisible: false,
      nowVal: 100,
      processConfig: {},
      nodeConfig: {},
      workFlowDef: {},
      dialogVisible: true,
    };
  },
  created() {
    this.$axios
      .get(`/getNodeInfo`, {
        workFlowDefId: this.$route.params.workFlowDefId,
      })
      .then((res) => {
        this.processConfig = res.data.data;
        this.nodeConfig = this.processConfig.nodeConfig;
        this.workFlowDef = this.processConfig.workFlowDef;
      });
  },
  methods: {
    toReturn() {
      //window.location.href = ""
    },
    reErr(data) {
      // console.log(this.isVerify);
      // console.log(data);
      if(data.childNode){
        if (data.type == "start") {//审批人
					if (!data.content) {
						this.tipList.push({ name: data.nodeName, type: "发起人" })
					}
					this.reErr(data.childNode)
        } else if (data.type == "audit") {//审批人
					if (!data.content) {
						this.tipList.push({ name: data.nodeName, type: "审核人" })
					}
					this.reErr(data.childNode)
				}else if (data.type == "copy") {
					if (!data.content) {
						this.tipList.push({ name: data.nodeName, type: "抄送人" })
					}
					this.reErr(data.childNode)
				} else if (data.type == "condition") {
					this.reErr(data.childNode)
				} else if (data.type == "branch") {
					this.reErr(data.childNode)
					for (var i = 0; i < data.conditionNodes.length; i++) {
						if (!data.conditionNodes[i].content) {
							this.tipList.push({ name: data.conditionNodes[i].nodeName, type: "条件" })
						}
						this.reErr(data.conditionNodes[i])
					}
				}
      }else{
        data.childNode=null
      }
        

    },
    saveSet() {
      this.isVerify = true;
      this.tipList = [];
      this.reErr(this.nodeConfig);
      if (this.tipList.length != 0) {
        this.tipVisible = true;
        // console.log(this.tipVisible,this.tipList)
        return;
      }
      this.processConfig.flowPermission = this.flowPermission;
      console.log(JSON.stringify(this.processConfig.nodeConfig));
      // let nodes = [];
      // const ppp = JSON.parse(JSON.stringify(this.processConfig.nodeConfig));
      // this.loopProcessData(nodes, ppp); //树形json转化为数组
      // this.$axios.post("", this.processConfig).then(res => {
      //     if (res.code == 200) {
      //         this.$message.success("设置成功");
      //         setTimeout(function () {
      //             window.location.href = ""
      //         }, 200)
      //     }
      // })
    },
    //树形json转化为数组
    loopProcessData(nodes, obj) {
      // console.log(nodes)
      let self = this;
      for (let key in obj) {
        let { type,content } = obj;
        let line = {
          type,
          content,
        };
        if (key == "conditionNodes") {
          nodes.push(line);
          obj[key].forEach((item) => {
            self.loopProcessData(nodes, item);
          });
        }
        if (key == "childNode") {
          nodes.push(line);
          nodes.push(obj.childNode);
          self.loopProcessData(nodes, obj.childNode);
        }
      }
      nodes.forEach((item) => {
        delete item["childNode"];
      });

      return nodes;
    },
    zoomSize(type) {
      if (type == 1) {
        if (this.nowVal == 50) {
          return;
        }
        this.nowVal -= 10;
      } else {
        if (this.nowVal == 300) {
          return;
        }
        this.nowVal += 10;
      }
    },
  },
};
</script>
<style scoped>
@import "../../css/workflow.css";
.error-modal-list {
  width: 455px;
}
</style>
