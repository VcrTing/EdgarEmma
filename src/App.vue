<template>
    <div id="app">
        <layout v-if="$store.state.token"></layout>
    </div>
</template>

<script>
import Layout from './Layout.vue'

    export default {
        components: { Layout },
        name: '',
        data() {
            return {
                token: '',
                shimmer: true,
                loading: false,
            }
        },
        mounted() {
            this.init() },
        methods: {
            async init() {
                let res = await this.net._admin()
                this.$store.commit('change', [ 'token', res ])
            },

            root_router() {
                return new Promise((rej, rev) => { this.$router.onReady(() => { rej( _layout ) }) })
            },

            do_shimmer(v) { this.shimmer = v }
        },
        beforeDestroy() {
            
        },
    }
</script>

<style lang="sass">
@import "@/air/sass/base.sass"
</style>