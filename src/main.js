import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';
import "./styles/global.css";
import './plugins/element.js';
import LocalData from './api/publicMethods/LocalData';
// 富文本
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { ApiPlugin } from './api/axios/index';
import OSPAjax from './components/Ajax';
import OSPApi from './components/APIMan';
Vue.use(OSPApi);
Vue.use(VueQuillEditor);
Vue.use(OSPAjax, axios);
Vue.use(ApiPlugin);
Vue.use(LocalData);
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
