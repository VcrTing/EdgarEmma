<template>
    <div v-if="_items && _items.length > 0">
        <div class="fx-l td-in"
            v-for="(v, i) in _items" :key="i"
        >
            <div class="w-3">&nbsp;</div>
            <div class="w-8">
                <span class="sus">{{ i + 1 }}</span>
            </div>
            <div class="w-20">
                <view-company-name :one="true" :names="v.company.names"></view-company-name>
            </div>
            <div class="w-23">
                <view-remind-date :rmd="v.remind"></view-remind-date>
            </div>
            <div class="w-24">
                anyonereciver@gmail.com
            </div>
            <div class="w-11">
                成功
            </div>
            <div class="w-11 t-c">
                <a class="pri_son">查看
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import ViewCompanyName from '../../../components/view/company/ViewCompanyName.vue'
import ViewRemindDate from '../../../components/view/remind/ViewRemindDate.vue'
import ViewSendTimes from '../../../components/view/send/ViewSendTimes.vue'
    export default {
        components: {ViewCompanyName, ViewSendTimes, ViewRemindDate  },
        name: '',
        props: [ '_items' ],
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>