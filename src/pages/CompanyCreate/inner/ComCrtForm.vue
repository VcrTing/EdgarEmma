<template>
    <div>
        <div class="row pb_x">
            <input-wrapper class="w-40" :label="'公司编号 CR No.'" :valid="form_err.tax_id">
                <input type="text" class="input" placeholder="Please input" v-model="form.tax_id">
            </input-wrapper>
        </div>

        <input-wrapper :label="'公司名字 Company Name (English)'" class="pb_x" :valid="form_err.name_en">
            <input type="text" class="input" placeholder="Please input" v-model="form.name_en">
        </input-wrapper>

        <input-wrapper :label="'公司名字 Company Name (Chinese)'" class="pb_x" :valid="form_err.name_ch">
            <input type="text" class="input" placeholder="Please input" v-model="form.name_ch">
        </input-wrapper>

        <div class="row pb_x fx-l">
            <!--input-wrapper class="w-60" :label="'Company Type'">
                <company-type-select ref="comtypeREF"></company-type-select>
            </input-wrapper-->
            <input-wrapper class="w-40" :label="'成立日期 Company Since'">
                <input-data :_date="form.company_since" v-if="form.company_since" @result="(v) => form.company_since = v"></input-data>
            </input-wrapper>
        </div>

        <div class="row pb_x">
            <input-wrapper class="w-40" :label="'财政年度年结日 Last Tax filing time'">
                <input-data :_date="form.last_tax_filing_time" v-if="form.last_tax_filing_time" @result="(v) => form.last_tax_filing_time = v"></input-data>
            </input-wrapper>
        </div>
        
            <input-wrapper class="pb_x" :label="'The phone number receive Whatsapp'" :valid="form_err.phones">
                <ccf-phone-add ref="phonesREF" :typed="'phone'" :data="form.phones"></ccf-phone-add>
            </input-wrapper>

            <input-wrapper class="pb_x" :label="'The Email receive notification'" :valid="form_err.emails">
                <ccf-phone-add ref="emailsREF" :typed="'email'" :data="form.emails"></ccf-phone-add>
            </input-wrapper>
    </div>
</template>

<script>
import CompanyTypeSelect from '../../../components/form/select/CompanyTypeSelect.vue'
import ButtonPrimary from '../../../funcks/ui/button/ButtonPrimary.vue'
import InputData from '../../../funcks/ui/input/InputData.vue'
import InputWrapper from '../../../funcks/ui_components/input/InputWrapper.vue'
import CcfPhoneAdd from './extra/CcfPhoneAdd.vue'
    export default {
  components: { InputWrapper, InputData, ButtonPrimary, CcfPhoneAdd, CompanyTypeSelect },
        name: '',
        props: [
            'origin'
        ],
        data() {
            return {
                form: {
                    tax_id: '', name_en: '', name_ch: '', company_type: '', company_since: '', last_tax_filing_time: '', phones: [ ], emails: [ ]
                },
                form_err: {
                    tax_id: '', name_en: '', name_ch: '', phones: '', emails: ''
                }
            }
        },
        mounted() { this.reset() },
        methods: {
            errorForm() {
                this.form_err.tax_id = (!this.form.tax_id || this.form.tax_id.length < 2 || this.form.tax_id.length > 60)
                this.form_err.name_en = (!this.form.name_en || this.form.name_en.length < 2 || this.form.name_en.length > 220)
                this.form_err.name_ch = (!this.form.name_ch || this.form.name_ch.length < 2 || this.form.name_ch.length > 160)

                this.form_err.phones = this.$refs.phonesREF.valid().length <= 0
                this.form_err.emails = this.$refs.emailsREF.valid().length <= 0

                for (let k in this.form_err) {
                    if (this.form_err[k]) { return true }
                }
            },
            submit() {
                this.form.company_type = 1 // this.$refs.comtypeREF.now
                this.build_name()
                this.form.last_tax_filing_time = this.form.last_tax_filing_time + ' 00:00:00'
                return this.errorForm() ? null : this.form
            },

            build_name() {
                this.form[ 'names' ] = [
                    { txt: this.form.name_ch, lang: 'hk' },
                    { txt: this.form.name_en, lang: 'en' }
                ]
            },
            reset() {
                if (this.origin) {
                    this.form = this.origin
                } else {
                    this.form = {
                        tax_id: '', name_en: '', name_ch: '', company_type: 1, // this.$refs.comtypeREF.now, 
                        company_since: '2000-01-01', last_tax_filing_time: '2020-01-01',
                        phones: [ { v: '' } ], emails: [ { v: '' } ]
                    }
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>