<template>
    <div class="max-w_remind pt_x3">
        <h4 class="py_x3 ttd t-c">请输入邮箱验证码</h4>

        <div class="pt">
            <vertify-code ref="verREF"></vertify-code>
            <div class="t-c py_x3">

                <button-primary class="px_x3 upper" @tap="next">
                    下一步
                </button-primary>
            </div>
        </div>
    </div>
</template>

<script>
import VertifyCode from '../../../../components/form/code/VertifyCode.vue'
import ButtonPrimary from '../../../../funcks/ui/button/ButtonPrimary.vue'
export default {
  components: { VertifyCode, ButtonPrimary },
    data() {
        return {

        }
    },
    methods: {
        next() {

            const coiiect = this.$refs.verREF.coiiect()
            console.log('coiiect =', coiiect)
        }
    }
}
</script>

<style>

</style>