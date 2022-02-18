<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
import CompanyMy from '../CompanyMy/CompanyMy.vue'

    export default {
        components: {CompanyMy },
        name: '',
        data() {
            return {
                alive: true,
            }
        },
        methods: {
            reload() {
                this.alive = false
                this.$nextTick(function() { this.alive = true })
            },
        },  
        provide() {
            return {
                reload: this.reload
            }
        },
        
        watch: {
            $route(to, from) {
                const _to = to.path.split('/').length
                const _from = from.path.split('/').length

                this.transitionName = _to < _from ? 'ani_up' : 'ani_down'
                if (!this.transitionName) { this.transitionName = 'ani_up' }
            }
        },
    }
</script>

<style lang="sass" scoped>
.ani_up, 
.ani_down
    transition: all 1s

.ani_up
    transform: translateY(20vh)    
.ani_down
    transform: translateY(-20vh)
</style>