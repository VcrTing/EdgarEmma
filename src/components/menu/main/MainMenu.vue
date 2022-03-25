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
            menu: [
                {
                    txt: 'Add Company',
                    link: '/home/add_company',
                    index: 0
                },
                {
                    txt: 'My Company',
                    link: '/home/company_my',
                    index: 1
                },
                {
                    txt: 'Import',
                    link: '/home/csv',
                    index: 2
                }
            ]
        }
    },
    mounted() { 
        let rout = this.$route.fullPath
        console.log(rout)
        this.localRoute(rout)
    },
    watch: {
        $route(to,from){
            console.log('path =', from.path) //从哪来
        }
    },
    methods: {
        localRoute(path) {
            this.menu.map(e => {
                if (path.indexOf(e.link) >= 0) {
                    this.now = e.index
                }
            })
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