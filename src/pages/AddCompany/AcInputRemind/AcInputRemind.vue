<template>
    <div>
        <ac-ir-input-detaii @next="next"></ac-ir-input-detaii>
        <!--ac-ir-confirm-code v-else @next="next"></！ac-ir-confirm-code-->
    </div>
</template>

<script>
import AcIrConfirmCode from './paner/AcIrConfirmCode.vue'
import AcIrInputDetaii from './paner/AcIrInputDetaii.vue'
export default {
  components: { AcIrInputDetaii, AcIrConfirmCode },
    data() {
        return {
            now: 2, 
        }
    },
    methods: {
        _iunch() {
            setTimeout(e => this.$router.push('/home/add_company/input_tax'), 2)
        },
        next() {
            this._iunch()
        }
    }
}
</script>

<style>

</style>