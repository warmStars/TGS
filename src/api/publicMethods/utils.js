// import { isArray as _isArray, isFunction as _isFunction, each as _each } from 'lodash';
import dayjs from 'dayjs';
import defaultSettings from '@/settings'
const title = defaultSettings.title || 'VAT'
let util = {};
util.formatDateTime = function (date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
util.formatDateTime2 = function (date) {
    return dayjs(date).format('YYYY-MM-DD 00:00:00');
};
util.formatDate = function (date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
util.formatDate2 = function (date) {
    return dayjs(date).format('YYYY-MM-DD');
};
// 进入全屏API
util.requestFullScreen = function requestFullScreen(ele) {
    if (ele.requestFullscreen) {
        // W3C 标准
        ele.requestFullscreen();
    } else if (ele.mozRequestFullScreen) {
        // Firefox 10+
        ele.mozRequestFullScreen();
    } else if (ele.webkitRequestFullScreen) {
        // Safari5.1 and Chrome 15
        ele.webkitRequestFullScreen();
    } else if (ele.msRequestFullScreen) {
        // ie 10,11
        ele.msRequestFullScreen();
    }
};
// 退出全屏API
util.exitFullscreen = function exitFullscreen() {
    if (document.exitFullscreen) {
        // w3c 标准
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        // Firefox 10+
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        // Safari5.1 and Chrome 15
        document.webkitCancelFullScreen();
    } else if (document.msExitRequestFullscreen) {
        // ie 10,11
        document.msExitRequestFullscreen();
    }
};
// 将json格式转成echart data格式
util.jsonToList = function jsonToList(json) {
    if (json) {
        return Object.keys(json).map(key => {
            return {
                name: key,
                value: json[key]
            };
        });
    }
};
// 手机号格式校验
util.validatephone = function (rule, value, callback, mag, msg) {
    if (!value) {
        return callback(new Error('手机号不可为空'));
    } else if (!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/.test(value)) {
        return callback(new Error('手机号输入错误'));
    } else {
        callback();
    }
};
// 邮箱格式校验
util.validatemail = function (rule, value, callback, mag, msg) {
    if (!value) {
        return callback(new Error('邮箱不可为空'));
    } else if (!(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))) {
        return callback(new Error('邮箱输入错误'));
    } else {
        callback();
    }
};
util.singleValidIP = function (str) {
    //  IP地址合法校验: 排除 0.0.0.0; 排除 255.255.255.255; 支持区间录入
    let reg = /^((25[0-5]|2[0-4]\d|[1]{1}\d{1}\d{1}|[1-9]{1}\d{1}|\d{1})($|(?!\.$)\.)){4}$/;
    let regS = /^((25[0-5]|2[0-4]\d|[1]{1}\d{1}\d{1}|[1-9]{1}\d{1}|\d{1})($|(?!\.$)\.))$/;
    let regZ = /(^0{1,3}(\.0{1,3}){3}$)/;
    let regM = /(^255(\.255){3}$)/;
    if (/([-])/.test(str)) {
        // 支持区间录入
        let arr = str.split('-');
        if (arr.length === 2) {
            return reg.test(arr[0]) && regS.test(arr[1]);
        } else {
            return false;
        }
    } else {
        return reg.test(str) && !regZ.test(str) && !regM.test(str);
    }
};
util.getLocalStorageData = function (key) {
    if (localStorage.getItem(key)) {
        let data = localStorage.getItem(key);
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    }
    return '';
}
util.setLocalStorageData = function (key, data) {
    if (typeof data === 'undefined') {
        data = '';
    }
    data = JSON.stringify(data);
    localStorage.setItem(key, data);
}
util.removeStorageData = function (key) {
    localStorage.removeItem(key);
}
util.getPageTitle = function (pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}
util.isExternal = function (path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
export default util;