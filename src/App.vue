<template>
    <div id="app">
        <router-view class="page"></router-view>
    </div>
</template>

<script>
    import store from '@/store/index.js';
    export default {
        name: 'app',
        created() {
            console.log("vuex",this.$store.state.Authorization);
        },
    }
</script>

<style>

</style>