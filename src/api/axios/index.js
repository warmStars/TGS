'use strict';
import promise from 'es6-promise';
import Vue from 'vue';
import { isArray as _isArray, isObject as _isObject, isNil as _isNil, filter as _filter, each as _each, isFunction as _isFunction } from 'lodash';
import util from '@/api/publicMethods/utils.js';
import { MessageBox, Message } from 'element-ui';
// axios兼容IE
promise.polyfill();
/**
 * 参数过滤函数
 * @param obj
 * @returns {*}
 */
function filterNull(obj) {
    if (_isArray(obj)) {
        obj = _filter(obj, function (value) {
            if (_isNil(value)) {
                return false;
            } else {
                filterNull(value);
                return true;
            }
        });
    } else if (_isObject(obj)) {
        _each(obj, function (value, key) {
            if (_isNil(value)) {
                delete obj[key];
            }
            obj[key] = filterNull(value);
        });
    }
    obj = _isNil(obj) ? '' : obj;
    return obj;
}

/***
 * axios 请求 options
 * @param url 请求的url
 * @param module 请求的模块
 * @param hasToken 是否需要带token
 * @param token 需要带token是的 token值
 * @param header 请求中header参数配置
 * @param data 请求参数
 * @param onload 成功时的回调函数
 * @param onerror 失败时的回调函数
 * NoFilterNull=true 不过滤null
 */
function apiAxios(options) {
    let data = null;
    let header = {};
    let params = null;
    options.hasNoTime = options.hasNoTime || false;
    options.noSlash = options.noSlash || false;
    if (options.data) {
        if (options.NoFilterNull) {
            params = options.data;
        } else {
            params = filterNull(options.data);
        }
    }
    // 可修改
    if (options.tokenPos) {
        data = {
            action: params,
            auth: options.hasToken ? {
                type: 'token',
                token_value: util.getLocalStorageData('token') || options.token
            } : null
        };
    } else {
        data = params;
    }
    header = {
        'Content-type': 'application/json',
        'Auth-type': options.hasToken ? 'TOKEN' : 'CERT',
        'Auth-value': options.hasToken ? util.getLocalStorageData('token') : '',
    };
    header = Object.assign(header, options.header || {});
    let method = options.method;
    let onload = options.onload || function () { };
    let onerror = options.onerror || null;
    let url = options.url;
    Vue.axios({
        method: options.method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? data : null,
        params: method === 'GET' || method === 'DELETE' ? data : null,
        headers: header,
        withCredentials: false
    }).then(
        Vue.ajaxHandler({
            success: res => {
                onload && onload(res || res.result);
            },
            error: res => {
                if (onerror && _isFunction(onerror)) {
                    onerror(res.res || res.result || res);
                } else {
                    let result = res.msg || res.result || {};
                    Message.error({
                        content: result.message || result.msg || result.mes || '请求错误!',
                        duration: 3,
                        closable: true
                    });
                }
            }
        })
    ).catch(function (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        let res = err && err.response;
        onerror && onerror(res);
        Message.error({ content: err.message || res.msg || err.mes || '请求错误!', duration: 3, closable: true });
        if (err === undefined) {
            window.alert('api error, HTTP CODE: ' + res.status);
        }
    });
}

let ajaxApi = {
    post_token: function (url, token, params, success, failure) {
        apiAxios({
            url: url,
            method: 'POST',
            tokenPos: true,
            hasToken: true,
            token: token,
            data: params,
            onload: success,
            onerror: failure
        });
    },
    post_notoken: function (url, params, success, failure) {
        apiAxios({
            url: url,
            method: 'POST',
            tokenPos: true,
            hasToken: false,
            token: null,
            data: params,
            onload: success,
            onerror: failure
        });
    },
    get_token: function (url, token, params, success, failure) {
        apiAxios({
            url: url,
            method: 'GET',
            tokenPos: true,
            hasToken: true,
            token: token,
            data: params,
            onload: success,
            onerror: failure
        });
    },
    get_notoken: function (url, params, success, failure) {
        apiAxios({
            url: url,
            method: 'GET',
            tokenPos: true,
            hasToken: false,
            token: null,
            data: params,
            onload: success,
            onerror: failure
        });
    },
    post: function (options) {
        options = options || {};
        apiAxios(
            Object.assign({ hasToken: true, tokenPos: false }, options, {
                method: 'POST'
            })
        );
    },
    get: function (options) {
        options = options || {};
        apiAxios(
            Object.assign({ hasToken: true, tokenPos: false }, options, {
                method: 'GET'
            })
        );
    },
    delete: function (options) {
        options = options || {};
        apiAxios(
            Object.assign({ hasToken: true, tokenPos: false }, options, {
                method: 'delete'
            })
        );
    }
};

/**
 * Install plugin
 * @param Vue
 * @param axios
 */

function ApiPlugin(Vue) {
    if (ApiPlugin.installed) {
        return;
    }
    ApiPlugin.installed = true;

    Object.assign(Vue.prototype, ajaxApi);
}

export { ajaxApi, ApiPlugin };
