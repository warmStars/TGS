import { ajaxApi } from '@/api/axios/index.js';
export function login(options) {
    ajaxApi.post({
        url: '/etcWallet/settlementAccountStatusQuery',
        data: options.data,
        onload: function (res) {
            options.onload && options.onload(res);
        },
        onerror: options.onerror || null
    });
}