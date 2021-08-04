import CustomPalette from './customPalette';
import CustomRenderer from './customRender';
export default {
  __init__: ['customPalette','customRenderer'],
  customPalette: ['type', CustomPalette],
  customRenderer: ['type', CustomRenderer]
};