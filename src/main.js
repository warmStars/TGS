import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';
import '@/styles/index.scss'
import './plugins/element.js';
import LocalData from './api/publicMethods/LocalData';
import { ApiPlugin } from './api/axios/index';
import OSPAjax from './components/Ajax';
import OSPApi from './components/APIMan';
Vue.use(OSPApi);
Vue.use(OSPAjax, axios);
Vue.use(ApiPlugin);
Vue.use(LocalData);
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
