<template>
    <div class="max-w_remind pt_x3 t-c">
        <h4 class="py_x3 ttd">感謝你</h4>

        <div class="pt_x pb">
            <p class="h3 ttd">妳將可以免費的接收到合規的提醒</p>
        </div> 

        <div class="py_x3"></div>

        <div class="py_x3">
            <button-primary class="w-163 upper" @tap="() => $router.push('/home/add_company/search_select')">
                返回搜尋
            </button-primary>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '../../../funcks/ui/button/ButtonPrimary.vue'
    export default {
  components: { ButtonPrimary },
        name: '',
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>