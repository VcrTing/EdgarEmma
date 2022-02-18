<template>
    <div class="max-w_remind pt_x3">
        <h4 class="py_x3 ttd">請輸入接送提醒的方式(only input whatsapp and email)</h4>

        <div class="pt">

            <input-wrapper :label="'WhatsApp'" :valid="form_vid.phoned">
                <input-whatsapp ref="phoneREF"></input-whatsapp>
            </input-wrapper>

            <div class="py_s"></div>

            <input-wrapper :label="'Email'" :valid="form_vid.email">
                <input type="text" v-model="form.email" class="input input-air" placeholder="Please input">
            </input-wrapper>
        </div>

        <div class="fx-c py_x3">
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
    export default {
  components: { InputWrapper, InputWhatsapp, ButtonPrimary, CountryFlagSelect },
        name: '',
        data() {
            return {
                form: { phoned: '', email: '' },
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

                    this.view.set_ss('company_active_company', res)

                    setTimeout(e => this.$router.push('/home/add_company/input_tax'), 800)
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