<template>
    <div class="menu-top">
        <nav>
            <ul>
                <li 
                    v-for="(v, i) in menu" :key="i"
                    :class="{ 'active': v.index == now }"
                    @click="go(v)"
                >
                    {{ v.txt }}
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
    data() {
        return {
            now: 0,
        }
    },
    computed: {
        is_admin() { return this.$store.state.plant.is_admin },
        menu() {
            let res = [
                {
                    txt: 'Add Company', index: 0, admin: false,
                    link: '/home/add_company',
                },
                {
                    txt: 'My Company', index: 1, admin: false,
                    link: '/home/company_my',
                }
            ]
            if (this.is_admin) {
                res.push({
                    txt: 'Import', index: 2, admin: true,
                    link: '/home/csv',
                })
            }
            return res
        }
    },
    mounted() { this.localRoute(this.$route.fullPath) },
    watch: { $route(to,from){ } },
    methods: {
        localRoute(path) {
            this.menu.map(e => { if (path.indexOf(e.link) >= 0) { this.now = e.index } })
        },
        go(v) {
            this.now = v.index
            this.$router.push(v.link)
        }
    }
}
</script>
<style lang="sass">
</style>