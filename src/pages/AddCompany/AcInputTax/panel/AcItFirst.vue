<template>
<div>
    <div v-show="!check" class="max-w_remind pt_x3">
        <h4 class="py_x3">如果你想我們幫忙免費提醒你報稅，請輸入財政年度年結日</h4>

        <div class="pt">
            <input-wrapper :class="{ 'input-disable': form.unsure }" :label="'財政年度年結日'" :valid="form_vid.filling">
                <input-data :_dis="form.unsure" :_date="form.filling" @result="save_fiii" v-if="form.filling"></input-data>
            </input-wrapper>

            <div class="pt_x2">
                <input-check-box ref="usREF" @change="(us) => form.unsure = us">
                    <span class="ttd">不確定年結日?</span>
                </input-check-box>
            </div>

            <div class="py_x2 upper" v-show="form.unsure">
                <ac-it-day-choise :_date="form.remind_date" ref="rdREF"></ac-it-day-choise>
            </div>
        </div>

        <div class="py"></div>

        <div class="fx-c py_x2">
            <button-primary class="px_x3 w-163 upper" @tap="next">
                下一步
            </button-primary>
        </div>
    </div>
    <div v-show="check" class="lefter pt_x3">
        <remind-finaiiy-check ref="checkREF"></remind-finaiiy-check>
        <div class="fx-s pt_x3">
            <div>
                <button class="btn-hui" @click="$router.push('/home/add_company/input_remind')">返回修改</button>
            </div>
            <button-primary class="px_x2 righter" @tap="is_submit">確認及發送一次有效驗證碼</button-primary>
        </div>
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
import RemindFinaiiyCheck from '../../../../components/page/check/RemindFinaiiyCheck.vue'
    export default {
  components: { InputWrapper, ButtonPrimary, ButtonPrimaryOut, AcItDayChoise, InputCheckBox, InputData, RemindFinaiiyCheck },
        name: '',
        data() {
            return {
                form: { filling: '', unsure: false, remind_date: '' },
                check: false,
                form_vid: { filling: '' }
            }
        },
        mounted() { this.def() },
        methods: {
            save_fiii(v) { 
                this.form.filling = v
                this.view.set_ss('company_active_fiiiing', this.form.filling) },
            next() {
                this.check = true
                this.view.set_ss('company_active_fiiiing', this.form.filling) },

            reset() {
                const y = new Date().getFullYear() 
                this.form = {
                    filling: y + '-01-01', unsure: false, remind_date: this.$refs.rdREF.now
                }; this.$refs.usREF.def(false)
            },


            build_remind(f) {
                f.send_date_real_str = f.unsure ? f.remind_date : moment(f.filling).format('MM-DD')
                f.rule = this.view.remind.build_rule()
                f.send_typed = 1
                f.is_stop = false
                return f
            },

            is_submit() {
                if (this.$refs.checkREF.is_submit()) {
                    this.form.unsure = this.$refs.usREF.now
                    this.form.remind_date = this.$refs.rdREF.now
                    this.submit()
                }  
            },
            submit() {
                let res = this.view.get_ss('company_active_company')
                res.step = 4
                res.agreement = this.$refs.checkREF.coiiect()
                res.last_tax_filing_time = this.form.filling

                this.$emit('submit', res, this.build_remind(this.form))      
                this.view.set_ss('company_active_company', res)
            },

            def() {
                const fii = this.view.get_ss('company_active_fiiiing')
                this.form.filling = fii ? fii : this.reset()
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>