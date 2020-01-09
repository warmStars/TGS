<template>
    <div class="dashboard-container">
        <div class="dashboard-text">name: {{ name }}</div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'Dashboard',
        data() {
            return {
                name: "123"
            }
        },
        created() {
            this.post({
                url: "/etcWallet/settlementAccountStatusQuery",
                data: {
                    corpMediumId: "!@#@23",
                },
                onload: ({ data }) => {
                    console.log(data);
                }
            })
        },
    }
</script>

<style lang="scss" scoped>
    .dashboard {
        &-container {
            margin: 30px;
        }

        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }
</style>