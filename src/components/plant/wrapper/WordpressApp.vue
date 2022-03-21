<template>
    <div>
        <tool-recive-wordpress :recive="reciveData"></tool-recive-wordpress>
        <sign v-if="$store.state.token" @sign="init"></sign>
    </div>
</template>

<script>
import Sign from '../../tool/sign.vue'
import ToolReciveWordpress from '../ToolReciveWordpress.vue'
    export default {
        components: { 
            ToolReciveWordpress,
                Sign,
        },
        data() {
            return {
                def: {
                    wordpress_id: 2,
                    email: 'edic@163.com',
                    wordpress_name: 'Edic',
                    token: [ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTY0NjkwNTE3NywiZXhwIjoxNjQ5NDk3MTc3fQ.kyBfv17XotaOzJchJOFbtBvTHKiocb8y0sBH8MEUOco" ],
                    user_id: 2
                }
            }
        },
        methods: {
            async init() {
                if (this.conf.TEST) {
                    console.log('使用默认数据登录。。。token =', this.$store.state.token)
                    this.doLogin( this.ser_plant( this.def ) )
                }
            },

            async doLogin(plant) {
                let res = await this.serv.user.user_from_strapi(this, plant.wordpress_id)
                if (res) { await this.$store.commit('change', [ 'user', res ]) }
            },

            ser_plant(plant) {
                let tk = null
                tk = plant.token ? plant.token : [ ]
                tk = tk.length > 0 ? tk[ 0 ] : null
                if (!this.conf.TEST) {
                    this.$store.commit('change', [ 'token', tk ]) 
                }
                return { wordpress_id: plant.user_id, token: tk }
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