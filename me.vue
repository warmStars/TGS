<template>
    <view>
        <view class="header">
            <view class="logo">
                <open-data type="userAvatarUrl"></open-data>
            </view>
            <view class="nickName">
                <open-data type="userNickName"></open-data>
            </view>
        </view>
        <view class="headDetails">
            <ul>
                <li @click="viveProgress">查看办理进度
                    <text class="tipname">></text>
                </li>
                <li @click="vivewallet">工行电子账户
                    <text class="tipname">></text>
                </li>
                <li @click="generateQrCode">生成营销二维码
                    <text class="tipname">></text>
                </li>
            </ul>
        </view>
    </view>
</template>

<script>
    /**
    * @todo 我的ETC
    * @author guanhui
    * @version 2019/08/16
    *
     **/

    import { mapState, mapMutations } from 'vuex';
    import uniList from '@/components/uni-list/uni-list.vue';
    import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
    import store from '@/store/index.js';
    import api from '../../../common/api';
    import http from '@/common/http';
    export default {
        components: { uniList, uniListItem },
        data() {
            return {
                isBankShow: true,
                progress: true
            };
        },
        computed: mapState(['state']),
        methods: {
            viveProgress() {
                uni.navigateTo({
                    url: '../progress/progress'
                })
            },
            vivewallet() {
                store.dispatch('getOpenId').then(openid => {
                    http.request({
                        url: '/etcWallet/settlementAccountStatusQuery',
                        data: {
                            corpMediumId: openid,//使用openId
                        }
                    }).then(data => {
                        if (data.cardStat == "" && data.certFlag == "" && data.mediumId == "") {
                            uni.showToast({
                                title: "您还没有办理ETC",
                                icon: 'none'
                            });
                        } else if (!data.mediumId == "" && data.cardStat == 0) {
                            this.$store.state.icbCcardNumber = data.mediumId;
                            uni.navigateTo({
                                url: '../wallet/wallet'
                            })
                        }
                    }).catch(e => {
                        uni.showToast({
                            title: e,
                            icon: 'none'
                        });
                    });
                })
            },
            generateQrCode() {
                uni.navigateTo({
                    url: '../qrcode/qrcode'
                })
            }
        }
    };
</script>

<style scoped>
    .header {
        background: #fff;
        padding: 20upx;
        display: flex;
        flex-direction: row;
    }

    .logo {
        height: 120upx;
        width: 120upx;
        border-radius: 120upx;
        display: inline-block;
        overflow: hidden;
    }

    .nickName {
        padding: 20upx;
        color: #000;
    }

    .headDetails {
        /* background: #fff; */
        margin: 30upx;
        border: 10%;
    }

    .details {
        margin-top: 30upx;
    }

    li {
        width: 100%;
        height: 80upx;
        background: #fff;
        font-size: 30upx;
        line-height: 80upx;
        text-align: left;
        margin-top: 20upx;
        position: relative;
        text-indent: 30upx;
        border-radius: 10upx;
    }

    li:active {
        background: #F4F5F6;
    }

    .tipname {
        color: #ccc;
        float: right;
        margin-right: 50upx;
        font-size: 40upx;
    }
</style>