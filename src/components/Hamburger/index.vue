<template>
    <div style="padding: 0 15px;" @click="toggleClick">
        <img src="../../assets/images/bar_export.png" :class="{'is-active':isActive}" class="hamburger" width="64"
            height="64">
    </div>
</template>

<script>
    export default {
        name: 'Hamburger',
        props: {
            isActive: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            toggleClick() {
                this.$emit('toggleClick')
            }
        }
    }
</script>

<style scoped>
    .hamburger {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
    }

    .hamburger.is-active {
        transform: rotate(180deg);
    }
</style>