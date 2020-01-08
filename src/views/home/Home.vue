<template>
    <div class="home">
        <!-- 富文本编辑器 -->
        <div class="edit_container">
            <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)" @change="onEditorChange($event)">
            </quill-editor>
            <el-button @click="saveHtml">保存</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                content: "",
                editorOption: {}
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },
        methods: {
            onEditorReady(editor) { // 准备编辑器
            },
            onEditorBlur() { }, // 失去焦点事件
            onEditorFocus() { }, // 获得焦点事件
            onEditorChange() { }, // 内容改变事件
            saveHtml: function (event) {
                alert(this.content);
            },
        },
        created() {
            this.post({
                url: "/etcWallet/settlementAccountStatusQuery",
                data: {
                    corpMediumId: "osrfN4msTMXLMVxJzdBCi66ZKImU"
                },
                onload: res => {
                    console.log(res);
                },
                onerror: err => {
                    console.log(err);
                }
            })
        },
    }
</script>