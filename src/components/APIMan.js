/* globals API_PATH */
import {
    trim as _trim,
    isFunction as _isFunction,
    endsWith as _endsWith
} from 'lodash';

/**
 * ajax 请求处理工具方法
 *
 * 配置回调处理方法，用于处理业务功能。jsonCode 可针对所有 code 和特定 code 进行处理。
 * 如：
 * jsonCode() { ... }
 * jsonCode: {
 *     'all'() {
 *         ...
 *     },
 *     '120000'() {
 *         ...
 *     }
 * }
 *
 * @param {object} options 选项，可配置 success、error、jsonCode 回调
 * @param {object} context 上行文环境
 * @return {Function}
 */
function ajaxHandler(options, context) {
    let { success, error, jsonCode, expired } = options;
    return function ({ data }) {
        let { code } = data;
        if (!context) {
            context = null;
        }
        const codeId = code || '';
        let secondCode = codeId.toString()[0] || '';
        if (secondCode === '2' && _isFunction(success)) {
            success.call(context, data);
        } else if (_isFunction(error)) {
            error.call(context, data);
        }
        let jsonCodeAll = null;
        if (typeof jsonCode === 'object') {
            if (jsonCode.all) {
                jsonCodeAll = jsonCode.all;
            }
            jsonCode = jsonCode[codeId];
        }

        if (_isFunction(jsonCode)) {
            jsonCode.call(this, data, codeId);
        }

        if (_isFunction(jsonCodeAll)) {
            jsonCodeAll.call(this, data, codeId);
        }
    };
}

function install(Vue) {
    if (install.installed) {
        return;
    }
    install.installed = true;

    Vue.ajaxHandler = ajaxHandler;

    Object.defineProperties(Vue.prototype, {
        ajaxHandler: {
            get() {
                return ajaxHandler;
            }
        }
    });
}

export default {
    install
};
