<template>
    <div class="login-container">
        <div class="title-container">
            <div class="specific">
                <h3 class="title">Login Form</h3>
                <el-form ref="form" :model="form" :rules="rules">
                    <el-form-item prop="userName">
                        <div class="firstInputBox">
                            <el-input v-model="form.userName" placeholder="userName" prefix-icon="el-icon-user"
                                clearable maxlength="10"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item prop="passWord">
                        <div class="secondInputBox">
                            <el-input v-model="form.passWord" placeholder="passWord" prefix-icon="el-icon-s-goods"
                                show-password maxlength="10"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%;" @click="submitForm('form')">login</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '@/store/index.js';
    export default {
        name: 'login',
        data() {
            return {
                form: {
                    userName: "",
                    passWord: ""
                },
                rules: {
                    userName: [{
                        required: true,
                        message: '请输入您的账户',
                        trigger: 'blur'
                    }],
                    passWord: [{
                        required: true,
                        message: '请输入您的密码',
                        trigger: 'blur'
                    }],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 调用接口
                        // this.axios.post({
                        //     url: "/user/login",
                        //     data: {
                        //         username: this.form.userName,
                        //         password: this.form.passWord
                        //     }
                        // }).then(res => {
                        //     this.$store.state.Authorization = res.data.token;
                        //     this.setLocalData('token', res.data.token);
                        //     this.$router.push({
                        //         path: '/'
                        //     })
                        // }).catch(err => {
                        //     console.log(err);
                        // })
                        this.$store.state.Authorization = "123";
                        this.setLocalData('token', "123");
                        this.$router.push({
                            path: '/'
                        })
                    } else {
                        return false;
                    }
                });
            },
        },
        created() {

        },
    }
</script>
<style>
    /* 为了不影响其他位置的元素样式，需要定义一个特定的class类名便于区分 */
    .firstInputBox .el-input__inner {
        background-color: #283443;
        color: #FFF;
    }

    .secondInputBox .el-input__inner {
        background-color: #283443;
        color: #FFF;
    }
</style>
<style scoped>
    .login-container {
        position: fixed;
        background: #2D3A4B;
        height: 100%;
        overflow: hidden;
        width: 100%;
    }

    .title-container {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
        height: 100%;
        text-align: center;
    }

    .specific {
        position: absolute;
        top: 40%;
        left: 50%;
        margin-left: -225px;
        margin-top: -150px;
        /* background: red; */
        width: 450px;
        height: 300px;
    }

    .title {
        font-size: 26px;
        color: #fff;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
    }
</style>