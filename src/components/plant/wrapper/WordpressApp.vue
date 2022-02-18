<template>
    <div>
        <tool-recive-wordpress :recive="reciveData"></tool-recive-wordpress>
    </div>
</template>

<script>
import ToolReciveWordpress from '../ToolReciveWordpress.vue'
    export default {
        components: { 
            ToolReciveWordpress,
        },
        data() {
            return {
                def: {
                    wordpress_id: 1,
                    email: 'edic@163.com',
                    wordpress_name: 'Edic'
                }
            }
        },
        async mounted() {
            if (!this.conf.TEST) {
                this.doLogin(this.def)
            }
        },
        methods: {
            async doLogin(plant) {
                let res = await this.serv.user.user_from_strapi(this, plant.wordpress_id, plant.email)
                console.log('拿了 USER RES =', res)

                if (res) {
                    await this.$store.commit('change', [ 'user', res ])
                }
            },

            ser_plant(plant) {
                return plant
            },

            async reciveData(data) {
                let res = data && data.params ? data.params : null

                res = res ? this.ser_plant(res) : null

                await this.$store.commit('change', [ 'plant', res ])

                this.doLogin(res)
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>