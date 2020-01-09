<template>
    <component v-bind="linkProps(to)">
        <slot />
    </component>
</template>

<script>
    import util from '@/api/publicMethods/utils'

    export default {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        methods: {
            linkProps(url) {
                if (util.isExternal(url)) {
                    return {
                        is: 'a',
                        href: url,
                        target: '_blank',
                        rel: 'noopener'
                    }
                }
                return {
                    is: 'router-link',
                    to: url
                }
            }
        }
    }
</script>