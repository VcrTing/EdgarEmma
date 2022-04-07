<template>
    <div class="">
        <page-header :header="_header"></page-header>

        <com-crt-form class="pb_x2 pt" ref="formREF" v-if="typed == 'plus'"></com-crt-form>

        <div v-else class="pb_x2">
            <com-crt-form class="pb_x2" ref="formREF" v-if="def" :origin="def"></com-crt-form>
        </div>

        <div class="fx-c py_x2">
            <button-primary class="px_x lefter" @tap="submit">
                <i v-if="loading" class="fas fa-circle-notch circle-around"></i>
                <span v-else>Save</span>
            </button-primary>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <button-primary-out @tap="$router.go(-1)">
                Cancel
            </button-primary-out>
        </div>

        <div class="mb-for-keyboard"></div>
    </div>
</template>

<script>
import moment from 'moment'

import ButtonPrimary from '../../funcks/ui/button/ButtonPrimary.vue'
import ButtonPrimaryOut from '../../funcks/ui/button/ButtonPrimaryOut.vue'
import PageHeader from '../../funcks/ui/header/PageHeader.vue'
import ComCrtForm from "./inner/ComCrtForm.vue"

    export default {
        components: { ComCrtForm, ButtonPrimary, ButtonPrimaryOut, PageHeader },
        props: [ 'typed', 'def' ],
        data() {
            return {
                loading: true,
            }
        },
        mounted() {
            this.ani()
        },
        computed: {
            _header() {
                if (this.typed == 'edit') {
                    return 'Edit Company Profile'
                }
                return 'Create Company Profile'
            }
        },
        methods: {
            async submit() {
                this.loading = true
                let data = this.$refs.formREF.submit()

                if (data) {
                    let res = null

                    if (this.typed == 'edit') {
                        res = await this.serv.company.company_update(this, this.deleteUpdateData(data))
                    } else if (this.typed == 'plus') {
                        res = await this.serv.company.company_plus(this, this.buildPlus(data))
                        if (res && res.id) {
                            await this.plusRemind(res)
                        }
                    }
                    if (res) {
                        setTimeout(e => { this.loading = false; this.$router.push('/home/company_my') }, 600)
                    }
                }
                this.ani()
            },

            async plusRemind(comp) {
                let rmd = { company: comp.id, unsure: false, rule: this.view.remind.build_rule(), is_stop: false, work_year: '_', send_way_world: this.view.remind.SEND_WAY_DEF }
                rmd.send_date_real_str = moment(comp.last_tax_filing_time).format('MM-DD')
                rmd.send_date_since_real_str = moment(comp.company_since).format('MM-DD')
                rmd.send_typed = 0
                rmd.send_typed_finish = false
                return await this.serv.remind.create(this, rmd)
            },

            buildPlus(res) {
                res.user = this.$store.state.user.id
                res.last_tax_filing_time = res.last_tax_filing_time ? res.last_tax_filing_time.substring(0, 10) : ''
                return res
            },

            deleteUpdateData(res) {
                delete res.user
                delete res.name_ch
                delete res.name_en
                delete res.created_at
                delete res.updated_at
                delete res.published_at
                res.last_tax_filing_time = res.last_tax_filing_time ? res.last_tax_filing_time.substring(0, 10) : ''
                console.log('UPDATE RES =', res)
                return res
            },
            ani() {
                setTimeout(e => { this.loading = false }, 1200)
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>