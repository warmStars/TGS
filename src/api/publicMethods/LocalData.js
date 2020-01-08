/* globals API_PATH */
import util from './utils.js';

/**
 *  获取本地存储的信息
 * @param {string} key 需要获取的信息的字段名
 * @return 返回所需要取得数据
 *
 */
function getLocalData(key) {
    return util.getLocalStorageData(key);
}
/**
 *  设置本地存储信息
 * @param key 需要存储的信息的key
 * @param data 所需要存储的信息 字符串或json字符串
 */

function setLocalData(key, data) {
    util.setLocalStorageData(key, data);
}

/**
 *  移除本地存储信息
 * @param key
 */

function removeLocalData(key) {
    util.removeStorageData(key);
}

function install(Vue) {
    if (install.installed) {
        return;
    }
    install.installed = true;

    Vue.getLocalData = getLocalData;
    Vue.setLocalData = setLocalData;
    Vue.removeLocalData = removeLocalData;

    Object.defineProperties(Vue.prototype, {
        getLocalData: {
            get() {
                return getLocalData;
            }
        },
        setLocalData: {
            get() {
                return setLocalData;
            }
        },
        removeLocalData: {
            get() {
                return removeLocalData;
            }
        },
    });
}

export default {
    install
};
