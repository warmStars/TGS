<template>
    <div>
        <button>发消息</button>
    </div>
</template>

<script>
    import SockJS from 'sockjs-client';
    import Stomp from 'stompjs';
    export default {
        name: "socket",
        data() {
            return {
                // path: "ws://192.168.0.200:8005/qrCodePage/ID=1/refreshTime=5",
                socket: ""
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                let socket = new SockJS('http://192.168.1.34:8080/hello');
                let stompClient = Stomp.over(socket);
                let headers = {
                    token: "@23"
                }
                stompClient.connect(headers, (frame) => {   // 连接
                    console.log(frame,88);
                    // stompClient.subscribe('/wshello', (greeting) => {   // 这里接受后端推送的数据
                    //     console.log(greeting)
                    // }, headers);
                    // stompClient.send("/app/demo", headers, '134567');  // 发送数据 1234567
                }, (err) => {
                    console.log('失败')
                    console.log(err)
                })
            }
        }
    }
</script>

<style>

</style>