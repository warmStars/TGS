<script>
    export default {
        name: 'MenuItem',
        functional: true,
        props: {
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        },
        render(h, context) {
            const { icon, title } = context.props
            const vnodes = []
            if (icon) {
                if (icon == "dashboard") {
                    vnodes.push(<i class="el-icon-s-platform"></i>)
                }
                if (icon == "example") {
                    vnodes.push(<i class="el-icon-menu"></i>)
                }
                if (icon == "table") {
                    vnodes.push(<i class="el-icon-s-order"></i>)
                }
                if (icon == "tree") {
                    vnodes.push(<i class="el-icon-cherry"></i>)
                }
                if (icon == "form") {
                    vnodes.push(<i class="el-icon-s-comment"></i>)
                }
            }

            if (title) {
                vnodes.push(<span slot='title'>{(title)}</span>)
            }
            return vnodes
        }
    }
</script>
<style scoped>
    i {
        margin-left: 10px;
    }
</style>