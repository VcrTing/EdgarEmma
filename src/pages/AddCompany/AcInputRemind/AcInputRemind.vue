<template>
    <div class="max-w_remind pt_x3">
        <h4 class="py_x3 ttd t-c">請輸入接送提醒的方式</h4>

        <div class="pt">

            <input-wrapper :label="'WhatsApp'" :valid="form_vid.phoned">
                <input-whatsapp :picd="'請輸入您的 Whatsapp 號碼'" ref="phoneREF"></input-whatsapp>
            </input-wrapper>

            <div class="py_s"></div>

            <input-wrapper :label="'Email'" :valid="form_vid.email">
                <input type="text" @keyup.enter="next()" v-model="form.email" class="input input-air" placeholder="請輸入您的電郵地址">
            </input-wrapper>

            <checkbox-send-way ref="wayREF"></checkbox-send-way>
            <!--nav class="py_x pb fx-l">
                <div class="fx-l">
                    <input type="checkbox" v-model="send_way" name="way" value="email" id="way_email"/>
                    <label class="pl_s ttd hand" for="way_email">电邮提示</label>
                </div>
                <div class="fx-l pl">
                    <input type="checkbox" v-model="send_way" name="way" value="note" id="way_note"/>
                    <label class="pl_s ttd hand" for="way_note">短信提示</label>
                </div>
            </nav-->
        </div>

        <div class="fx-c py_x2">
            <button-primary class="px_x3 w-163 upper" @tap="next()">
                下一步
            </button-primary>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '../../../funcks/ui/button/ButtonPrimary.vue'
import InputWhatsapp from '../../../components/form/remind/InputWhatsapp.vue'

import InputWrapper from '../../../funcks/ui_components/input/InputWrapper.vue'
import CountryFlagSelect from '../../../components/form/select/CountryFlagSelect.vue'
import CheckboxSendWay from '../../../components/form/checkbox/CheckboxSendWay.vue'
    export default {
  components: { InputWrapper, InputWhatsapp, ButtonPrimary, CountryFlagSelect, CheckboxSendWay },
        name: '',
        data() {
            return {
                send_way: [ 'email' ],
                form: { phoned: '+852', email: '' },
                form_vid: { phoned: '', email: '' },
            }
        },
        
        methods: {
            next() {
                let res = undefined

                this.form.phoned = this.$refs.phoneREF.collect()

                if (!this.errorForm()) {
                    res = this.view.get_ss('company_active_company')

                    res.step = 3
                    res.emails = [ { v: this.form.email } ]
                    res.phones = [ { v: this.form.phoned } ]
                    res.send_way_world = this.view.remind.send_way_world( this.$refs.wayREF.collect() )
                    
                    this.view.set_ss('company_active_company', res)

                    setTimeout(e => this.$router.push('/home/add_company/input_tax'), 2)
                }
            },

            errorForm() {
                let e = this.form.email
                let p = this.form.phoned

                // true 为错
                this.form_vid.email = !this.vid.val_email(e)
                this.form_vid.phoned = !this.vid.val_phone(p)

                for (let k in this.form_vid) {
                    if (this.form_vid[k]) { return true }
                }
            },
        },
        computed: {
            comp() {
                return null
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>