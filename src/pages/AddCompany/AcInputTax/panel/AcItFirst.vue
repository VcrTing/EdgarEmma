<template>
    <div class="max-w_remind pt_x3">
        <h4 class="py_x3">如果你想我們幫忙免費提醒你報稅，請輸入財政年度年結日</h4>

        <div class="pt">
            <input-wrapper :class="{ 'input-disable': form.unsure }" :label="'財政年度年結日'" :valid="form_vid.filling">
                <input-data :_dis="form.unsure" :_date="form.filling" @result="(v) => form.filling = v" v-if="form.filling"></input-data>
            </input-wrapper>

            <div class="pt_x2">
                <input-check-box ref="usREF" @change="(us) => form.unsure = us">
                    <span class="ttd">不確定年結日</span>
                </input-check-box>
            </div>

            <div class="py_x2">
                <ac-it-day-choise :_date="form.remind_date" ref="rdREF"></ac-it-day-choise>
            </div>
        </div>

        <div class="py"></div>

        <div class="fx-c py_x2">
            <button-primary class="px_x3 w-163 upper" @tap="submit">
                完成
            </button-primary>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

import ButtonPrimary from '../../../../funcks/ui/button/ButtonPrimary.vue'
import ButtonPrimaryOut from '../../../../funcks/ui/button/ButtonPrimaryOut.vue'
import InputCheckBox from '../../../../funcks/ui/input/InputCheckBox.vue'
import InputData from '../../../../funcks/ui/input/InputData.vue'
import InputWrapper from '../../../../funcks/ui_components/input/InputWrapper.vue'
import AcItDayChoise from '../in/AcItDayChoise.vue'
    export default {
  components: { InputWrapper, ButtonPrimary, ButtonPrimaryOut, AcItDayChoise, InputCheckBox, InputData },
        name: '',
        data() {
            return {
                form: { filling: '', unsure: false, remind_date: '' },
                form_vid: { filling: '' }
            }
        },
        mounted() { this.reset() },
        methods: {
            
            build_remind(f) {
                f.send_date_real_str = f.unsure ? f.remind_date : moment(f.filling).format('MM-DD')
                f.rule = this.view.remind.build_rule()
                f.send_typed = 1
                f.is_stop = false
                return f
            },

            reset() {
                const y = new Date().getFullYear() 
                this.form = {
                    filling: y + '-01-01', unsure: false, remind_date: this.$refs.rdREF.now
                }
                this.$refs.usREF.def(false)
            },

            submit() {
                this.form.unsure = this.$refs.usREF.now
                this.form.remind_date = this.$refs.rdREF.now

                let res = this.view.get_ss('company_active_company')
                res.step = 4
                res.last_tax_filing_time = this.form.filling

                this._submit(res, this.build_remind(this.form))                
                this.view.set_ss('company_active_company', res)
            },
            async _submit(comp, remind) {
                //
                remind.send_way_world = comp.send_way_world

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
                    if (res) {
                        setTimeout(e => { this.$emit('finsh') }, 2)
                    }
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>