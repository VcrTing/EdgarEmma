<template>
    <div class="max-w_remind pt_x3 t-c">
        <h2 class="pb">提醒</h2>
        <div class="py_x3 pb">
            <p class="h4 thd">你確定要刪除&nbsp;“{{ comp.name_ch ? comp.name_ch : comp.name_en }}”&nbsp;嗎？</p>
        </div> 

        <div class="py"></div>

        <div class="py_x3">
            
            <button-primary-out @tap="$router.back()">
                返回
            </button-primary-out>
            <span class="px_s"></span>
            <button-primary class="px_x2" @tap="trash()">
                確認
            </button-primary>
        
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '../../funcks/ui/button/ButtonPrimary.vue'
import ButtonPrimaryOut from '../../funcks/ui/button/ButtonPrimaryOut.vue'
    export default {
        components: { ButtonPrimary, ButtonPrimaryOut },
        data() { return { comp: { } } },
        created() {
            this.comp = this.view.get_ss('company_wiii_trash')
        },
        methods: {
            async trash() {
                await this.serv.company.company_trash(this, this.comp)
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>