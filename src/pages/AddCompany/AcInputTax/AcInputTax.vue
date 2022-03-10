<template>
    <div>
        <ac-it-first v-if="page == 0" @finsh="completed()"></ac-it-first>
        <ac-it-second v-else></ac-it-second>
    </div>
</template>

<script>
import AcItFirst from './panel/AcItFirst.vue'
import AcItSecond from './panel/AcItSecond.vue'
    export default {
  components: { AcItFirst, AcItSecond },
        data() {
            return {
                page: 0
            }
        },
        methods: {
            completed() {
                this.page = 1
                this.view.set_ss('company_active_company', '')
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>