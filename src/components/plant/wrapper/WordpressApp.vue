<template>
    <tool-recive-wordpress></tool-recive-wordpress>
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
                    user_id: 2,
                    is_admin: true
                }
            }
        },
        mounted () { this.init() },
        methods: {
            async init() {
                console.log('this.conf.TEST =', this.conf.TEST)
                if (this.conf.TEST) {
                    console.log('使用默认数据登录。。。token =', this.$store.state.token)
                    this.doLogin( this.ser_plant( this.def ) )
                }
            },

            async doLogin(plant) {
                let res = await this.serv.user.user_from_strapi(this, plant.wordpress_id)
                if (res) { await this.$store.commit('change', [ 'user', res ]); console.log('默认的用户 =', res) }
            },

            async ser_plant(plant) {
                let tk = plant.token ? plant.token : [ ]
                tk = tk.length > 0 ? tk[ 0 ] : null
                tk = { wordpress_id: plant.user_id, token: tk, is_admin: plant.is_admin }
                await this.$store.commit('change', [ 'plant', tk ])
                await this.$store.commit('change', [ 'token', tk.token ]) 
                console.log('Token =', tk.token)
                return tk
            },

        }
    }
</script>

<style lang="sass" scoped>
    
</style>