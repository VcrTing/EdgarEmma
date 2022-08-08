<template>
    <div>
        <ac-it-first @submit="submit"></ac-it-first>
    </div>
</template>

<script>
import moment from 'moment'
import AcItFirst from './panel/AcItFirst.vue'
    export default {
  components: { AcItFirst },
        data() {
            return {
                page: 0
            }
        },
        methods: {

            async submit(comp, remind) {
                console.log('comp.send_way =', comp.send_way)
                //
                remind.send_way_world = comp.send_way ? comp.send_way : this.view.remind.SEND_WAY_DEF

                // 创建自己的 COMPANY
                comp.status = true
                comp.work_year = '0'
                comp.data_from = 'WEB_CREATE'
                comp.user = this.$store.state.user.id
                comp.last_tax_filing_time = new Date().getFullYear() + '-' + remind.send_date_real_str
                comp = this.view.def.delete_strapi_def(comp)

                let res = await this.serv.company.company_plus(this, comp)

                // 创建 REMIND
                if (res) {
                    remind.company = res.id
                    remind.send_typed = 0 
                    remind.send_typed_finish = false
                    remind.send_date_since_real_str = moment(comp.company_since).format('MM-DD')
                    res = await this.serv.remind.create(this, remind)
                    console.log('RES =', res)
                    if (res) {
                        // setTimeout(e => { this.completed() }, 2)
                    }
                }
            },

            completed() {
                this.view.set_ss('company_active_company', '')
                this.view.set_ss('company_active_fiiiing', '')
                this.view.set_ss('company_active_checkbox', '')

                this.$router.push('/home/add_company/finished')
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>