import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/axios'
import ElementUI from 'element-ui';
import './mock/mock.js'
import store from './store'

import '@/views/bpmn/customPalette/customPalette.css';

import 'element-ui/lib/theme-chalk/index.css';
import nodeWrap from '@/components/Node/nodeWrap'
Vue.component('nodeWrap', nodeWrap)
Vue.use(ElementUI);

// import FormControls from './components/FormControls/index.js'
// Vue.use(FormControls)

Vue.config.productionTip = false
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    el.focus()
  }
});
Vue.directive('drag', {
  bind: function () { },
  inserted: function (el) {
    el.onmousedown = function (e) {
      var disx = e.pageX - el.offsetLeft;
      var disy = e.pageY - el.offsetTop;
      document.onmousemove = function (e) {
        el.style.left = e.pageX - disx + 'px';
        el.style.top = e.pageY - disy + 'px';
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      }
    }
  },
  //当VNode更新的时候会执行updated，可以触发多次
  updated: function () { }
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
