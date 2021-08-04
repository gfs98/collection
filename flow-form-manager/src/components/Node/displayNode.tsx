import '../css/flow.css'
import { defineComponent, watch } from 'vue';
import branchIcon from '@/components/branchIcon'
export default defineComponent({
  name: 'BasicBreadcrumb',
  props: {
    data: { type: Object, required: true },
    // 点击发布时需要校验节点数据完整性 此时打开校验模式
    verifyMode: {type: Boolean, default: true},
    isPreview: {type: Boolean, default: true},
  },
  setup() {
    // const isStart = data => data.type === "start";
// const isAudit = data => data.type === "audit";
// const isCopy = data => data.type === "copy";
const isBranch = data => data.type === "branch";
const isCondition = data => data.type === "condition";
const notEmptyArray = arr => Array.isArray(arr) && arr.length > 0;
// const hasBranch = data => notEmptyArray(data.conditionNodes);
// const stopPro = ev => ev.stopPropagation();

function createNormalCard(ctx, conf) {
    const iconList= {
            "start":"",
            "audit":"el-icon-user-solid",
            "copy":"el-icon-s-promotion"
        }
    const colorList = {
        "start":"87, 106, 149",
        "audit":"255, 148, 62",
        "copy":"50, 150, 250"
    }
  const icon = iconList[conf.type]
  const color = "bakcground:rgb("+colorList[conf.type]+")"
  console.log(icon,color)
  return ()=>(
    <>
      <div class="node-wrap">
          <div class="node-wrap-box">
              <div class="title" style={color}><i class={icon}></i>{conf.nodeName}</div>
              <div class="content">
                  <span>{notEmptyArray(conf.nodeUserList)?conf.nodeUserList.join(' '):'所有人'}</span>
                  <i class="el-icon-arrow-right icon right-arrow"></i>
              </div>
          </div>
      </div>
    </>
  );
}

const createFunc = (...arg) => createNormalCard.call(arg[0], ...arg)

let nodes = {
  start: createFunc,
  audit: createFunc,
  copy: createFunc,
  countersign: createFunc,
  empty: () => '',
  condition: function(ctx, conf) {
    let content=conf.nodeUserList&&conf.nodeUserList.map((v)=>{return v.name})
    return (
      <div class="condition-add-box">
        <div class="center-line"></div>
        <div class="condition-box">
            <div class="condition-left"><i class="el-icon-arrow-left icon left-arrow"></i></div>
            <div class="condition-title-content">
                <div class="condition-title">
                    {conf.nodeName}
                </div>
                <div class="condition-content">
                    <span>发起人属于：{content.join(',')}</span>
                </div>
            </div>
            <div class="condition-right"><i class="el-icon-arrow-right icon right-arrow"></i></div>
        </div>
    </div>
    );
  }
};

function addNodeButton(ctx, data, isBranch = false) {
  // 只有非条件节点和条件分支树下面的那个按钮 才能添加新分支树
//   let couldAddBranch = !hasBranch(data) || isBranch;
  let isEmpty = data.type === "empty";
  if (isEmpty && !isBranch) {
    return "";
  }
  return (
    <div class="add-node-btn-box">
        <div class="add-node-btn">
            <el-popover placement="right-start" trigger="click">
                <div class="add-node-popover-body">
                    <a class="add-node-popover-item approver" onClick={ctx.eventLancher.bind( ctx, "addApprovalNode",  data, isBranch )}>
                        <div class="item-wrapper">
                            <i class="el-icon-user-solid"></i>
                        </div>
                        <p>审批人</p>
                    </a>
                    <a class="add-node-popover-item notifier" onClick={ctx.eventLancher.bind( ctx, "addApprovalNode",  data, isBranch )}>
                        <div class="item-wrapper">
                            <i class="el-icon-s-promotion"></i>
                        </div>
                        <p>抄送人</p>
                    </a>
                    <a class="add-node-popover-item condition" onClick={ctx.eventLancher.bind( ctx, "addApprovalNode",  data, isBranch )}>
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
  );
}

function NodeFactory(ctx, data) {
  if (!data) return
  const showErrorTip = false
  let res = [],
  branchNode = "",
  selfNode = (
    <div class="node-wrap">
      <div class={`node-wrap-box ${data.type} ${showErrorTip ? 'error' : ''}` }>
        <el-tooltip content="未设置条件" placement="top" effect="dark">
          <div class="error-tip" onClick={this.eventLancher.bind(ctx, "edit", data)}>!!!</div>
        </el-tooltip>
        {nodes[data.type].call(ctx, ctx, data)}
        {addNodeButton.call(ctx, ctx, data)}
      </div>
    </div>
  );

  if (isBranch(data)) {
    // 如果节点是数组 一定为条件分支 添加分支样式包裹
    // {data.childNode && NodeFactory.call(ctx, ctx, data.childNode)}
    branchNode = (
        <div class="branch-wrap">
            <div class="branch-wrap-box">
                <el-button class="add-button" size="small">添加条件</el-button>
                {data.conditionNodes.map(d => NodeFactory.call(ctx, ctx, d))} 
            </div>
            {addNodeButton.call(ctx, ctx, data, true)}
        </div>
    );
  }

  if (isCondition(data)) {
    return (
      <div class="condition-wrap-box">
        {selfNode}
        {branchNode}
        {NodeFactory.call(ctx, ctx, data.childNode)}       
      </div>
    );
  }
  res.push(selfNode);
  branchNode && res.push(branchNode);
  data.childNode && res.push(NodeFactory.call(ctx, ctx, data.childNode));
  return res;
}

    watch(
      () => {},
    );

    return () => (
      <>
       <branchIcon/>
        <div style="display: inline-flex; flex-direction: column; align-items: center;">
            {this.data && NodeFactory.call(this, this, this.data)}
        </div>
      </>
    );
  },
});