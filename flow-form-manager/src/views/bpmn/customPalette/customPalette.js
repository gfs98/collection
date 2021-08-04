export default class CustomPalette {
    constructor(bpmnFactory, create, elementFactory, palette, translate) {
      this.create = create;
      this.elementFactory = elementFactory;
      this.bpmnFactory = bpmnFactory;
      this.translate = translate;
      palette.registerProvider(this);
    }
   
   
    // 这个是绘制palette的核心，函数名不要变
    getPaletteEntries() {
      // const elementFactory = this.elementFactory;
      // const create = this.create;
      const {
        bpmnFactory,
        create,
        elementFactory,
        translate
      } = this;
   
      function dragEventFactory(type) {
        return function (event) {
          const businessObject = bpmnFactory.create('bpmn:Task');
          const taskShape = elementFactory.create('shape', {
            type: type,
            businessObject: businessObject
          });
          create.start(event, taskShape);
        };
      }
   
      return {
        'create.cake': {
          title: translate('Create Cake Task'),    // 鼠标悬浮到节点上显示的文字
          className: 'icon-custom bpmn-icon-cake',   // 样式名
          action: {      // 操作该节点时会触发的事件，此时只注册一个拖动事件即可，否则拖动时没有效果
            dragstart: dragEventFactory('bpmn:Task')
          }
        }
      };
    }
  }
  CustomPalette.$inject = [
    'bpmnFactory',
    'create',
    'elementFactory',
    'palette',
    'translate'
  ];