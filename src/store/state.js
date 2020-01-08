import util from '@/api/publicMethods/utils.js';
export default {
    // 存token
    Authorization: util.getLocalStorageData('token'),
}