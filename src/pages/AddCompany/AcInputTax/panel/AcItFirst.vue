<template>
    <div class="max-w_remind pt_x3">
        <h4 class="py_x3">如果你想我們幫忙免費提醒你報稅，請輸入財政年度年結日</h4>

        <div class="pt">
            <input-wrapper :label="'財政年度年結日'" :valid="form_vid.filling">
                <input-data :_date="form.filling" @result="(v) => form.filling = v" v-if="form.filling"></input-data>
            </input-wrapper>

            <div class="pt_x2">
                <input-check-box ref="usREF">
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
            reset() {
                this.form = {
                    filling: '2020-01-01', unsure: false, remind_date: this.$refs.rdREF.now
                }
                this.$refs.usREF.def(false)
            },

            submit() {
                this.form.unsure = this.$refs.usREF.now
                this.form.remind_date = this.$refs.rdREF.now

                let res = this.view.get_ss('company_active_company')

                res.step = 4
                res.last_tax_filing_time = this.form.filling

                res.remind = this.form


                this._submit(res, this.form)                
                this.view.set_ss('company_active_company', res)

            },
            async _submit(comp, remind) {

                // 创建自己的 COMPANY
                comp.status = true
                comp.data_from = 'WEB_CREATE'
                comp.user = this.$store.state.user.id
                comp = this.view.def.delete_strapi_def(comp)
                
                console.log('储存的 我的 Company =', comp)
                console.log('储存的 我的 Remind =', remind)
                // return 0
                let res = await this.serv.company.company_plus(this, comp)

                // 创建 REMIND
                if (res) {
                    remind.company = res.id
                    res = await this.serv.remind.create(this, remind)
                    if (res) {
                        setTimeout(e => { this.$emit('finsh') }, 800)
                    }
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>