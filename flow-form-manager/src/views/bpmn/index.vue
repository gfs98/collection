<template>
  <div class="bpmn-container">
    <div id="canvas"></div>
    <div class="properties-panel-parent" id="js-properties-panel"></div>
  </div>
</template>
<script>
import "./css/panel.css";
import BpmnJS from "bpmn-js/lib/Modeler";

// 默认属性面板设置
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda.json";

//自定义属性节点面板
// import bpmnPropertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/bpmn';
// import magicPropertiesProviderModule from './provider/magic';
// import magicModdleDescriptor from './descriptors/magic.json';

// 自定义节点
import customModule from "./customPalette";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import diagramXml from './assets/diagram.bpmn';

// 翻译文字
import customTranslate from "./customTranslate/customTranslate";
// const url ='https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn'

export default {
  name: "",
  components: {},
  props: [],
  data() {
    return {};
  },
  mounted() {
    this.initBpmn();
  },
  methods: {
    async openDiagram(viewer, bpmnXML) {
      // import diagram
      try {
        await viewer.importXML(bpmnXML);

        // access modeler components
        var canvas = viewer.get("canvas");

        // var overlays = viewer.get('overlays');

        // zoom to fit full viewport
        canvas.zoom("fit-viewport");

        var eventBus = viewer.get("eventBus");

        var events = [
          // 'element.hover',
          // 'element.out',
          "element.click",
          // 'element.dblclick',
          // 'element.mousedown',
          // 'element.mouseup'
        ];

        events.forEach(function(event) {
          eventBus.on(event, function(e) {
            // e.element = the model element
            // e.gfx = the graphical element
            console.log(event, "on", e.element);
          });
        });

        // attach an overlay to a node
        // overlays.add('SCAN_OK', 'note', {
        //     position: {
        //         bottom: 0,
        //         right: 0
        //     },
        //     html: '<div class="diagram-note">Mixed up the labels?</div>'
        // });

        // // add marker
        // canvas.addMarker('SCAN_OK', 'needs-discussion');
      } catch (err) {
        console.error("could not import BPMN 2.0 diagram", err);
      }
    },
    initBpmn() {
      var customTranslateModule = {
        translate: ["value", customTranslate],
      };
      var viewer = new BpmnJS({
        container: "#canvas",
        keyboard: {
          bindTo: window,
        },
        propertiesPanel: {
          parent: "#js-properties-panel",
        },
        additionalModules: [
          customTranslateModule,
          propertiesPanelModule,
          propertiesProviderModule,
          // magicPropertiesProviderModule,
          // bpmnPropertiesProviderModule,
          customModule,
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor,
          // magic: magicModdleDescriptor
        },
      });
      // console.log(viewer)
      this.openDiagram(viewer, diagramXml);
      // this.$axios.get(url).then((bpmnXML)=>{
      //     this.openDiagram(viewer,bpmnXML)
      // })
    },
  },
};
</script>
<style>
.bpmn-container {
  height: 100%;
  display: flex;
}
#canvas {
  width: 100%;
  height: 100%;
}
.properties-panel-parent {
  display: block;
}
.properties-panel-parent {
  border-left: 1px solid #ccc;
  overflow: auto;
}
.properties-panel-parent:empty {
  display: none;
}
.properties-panel-parent > .djs-properties-panel {
  padding-bottom: 70px;
  min-height: 100%;
}
.needs-discussion:not(.djs-connection) .djs-visual > :nth-child(1) {
  stroke: rgba(66, 180, 21, 0.7) !important; /* color elements as red */
}
</style>
