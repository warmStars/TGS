import util from '../api/publicMethods/utils.js';

function install(Vue, axios) {
    if (process.env.NODE_ENV == "development") {
        axios.defaults.baseURL = "/pro";
        // yapi
    } else {
        axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
    }
    if (install.installed) {
        return;
    }
    install.installed = true;
    if (!axios) {
        // eslint-disable-next-line no-console
        console.error('You have to install axios');
        return;
    }
    /**
     * 生成符合要求的请求 JSON 体
     *
     * @param {object} obj action 节数据对象
     * @param {boolean|string} token 是否带 token 或者字符串作为 token 值
     * @param {string} type token 类型
     * @return {object} 请求 JSON 体对象
     */
    axios.param = function param(obj, token, type) {
        let params = {
            auth: null,
            action: obj
        };

        if (typeof token === 'string') {
            params.auth = {
                type: type || 'token',
                token_value: token
            };
        } else if (token === true && util.getLocalStorageData('token') !== undefined) {
            params.auth = {
                type: type || 'token',
                token_value: util.getLocalStorageData('token')
            };
        }
        if (params.action) {
            params.action.token = util.getLocalStorageData('token');
        }
        return params;
    };

    axios.header = function header(options) {
        options = options || {};

        let headers = {
            'Auth-type': 'TOKEN',
            'Auth-value': ''
        };

        let { token, type } = options;

        if (typeof type === 'string') {
            headers['Auth-type'] = type;
        }

        if (typeof token === 'string') {
            headers['Auth-value'] = token;
        } else if (util.getLocalStorageData('token') !== undefined) {
            headers['Auth-value'] = util.getLocalStorageData('token');
        }

        return headers;
    };

    axios.interceptors.request.use(function (config) {
        return config;
    });
    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
    axios.defaults.headers.common['Auth-type'] = 'TOKEN';
    axios.defaults.headers.common['Auth-value'] = util.getLocalStorageData('token');
    Vue.axios = axios;

    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return axios;
            }
        },
        $http: {
            get() {
                return axios;
            }
        }
    });
}

export default {
    install
};
