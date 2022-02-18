<template>
    <company-opera-controll :typed="'edit'" :def="item" v-if="item"></company-opera-controll>
</template>

<script>
import CompanyOperaControll from '../CompanyCreate/CompanyOperaControll.vue'
    export default {
  components: { CompanyOperaControll },
        name: '',
        data() {
            return {
                item: null
            }
        },
        computed: {
            cdt() {
                let rt = this.$route.query
                if (rt) {
                    return rt.id
                }
            }
        },
        mounted() { this.fetching() },
        methods: {
            async fetching(id) {
                if (this.cdt) {
                    let res = await this.serv.company.company_one(this, this.cdt)
                    if (res) {
                        const ser_names = this.view.company.convert_names(res.names)
                        res = Object.assign( res, ser_names )
                        this.item = res
                    }
                }
            },
        }
    }
</script>

<style lang="sass" scoped>
    
</style>