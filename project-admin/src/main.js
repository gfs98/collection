import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from './router';
import { setupStore } from './store';

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import 'animate.css/animate.css';
// import './assets/css/chensee.css';
import './assets/css/common.css';
import './assets/less/variable.less';


function bootstrap() {
    const app = createApp(App);

    setupRouter(app);
    setupStore(app);
    router.isReady();
    app.use(Antd)
    app.config.productionTip = false;
    app.mount('#app', true);
}
bootstrap();
