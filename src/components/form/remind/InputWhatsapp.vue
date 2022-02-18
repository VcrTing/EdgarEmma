<template>
    <nav class="input-inset input-whatsapp">

        <country-flag-select ref="flagREF" class="input input-inset-in input-air"></country-flag-select>

        <input type="text" v-model="phoned" class="input input-inset-wrapper input-air" placeholder="Please input">
    </nav>
</template>

<script>
import CountryFlagSelect from "../select/CountryFlagSelect.vue"

    export default {
        components: { CountryFlagSelect },
        name: '',
        data() {
            return {
                prefix: '',
                phoned: ''
            }
        },
        methods: {
            reset() {
                this.prefix = this.$refs.flagREF.reset()
                this.phoned = ''
            },
            collect() {
                this.ser()
                return this.phoned ? (this.prefix + ' ' + this.phoned) : ''
            },
            ser() {
                const v = Number.parseInt(this.phoned)
                this.phoned = v ? v : ''
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>