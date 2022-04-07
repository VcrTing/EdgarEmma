<template>
    <div v-if="_items && _items.length > 0">
        <div class="fx-l td-in"
            v-for="(v, i) in _items" :key="i"
        >
            <div class="w-3">&nbsp;</div>
            <div class="w-7">
                <span class="sus">{{ i + 1 }}</span>
            </div>
            <div class="w-21">
                <view-company-name :one="true" :names="v.company.names"></view-company-name>
            </div>
            <div class="w-11">
                <span class="pri_son" v-if="v.is_first">新增數據</span>
                <span v-else class="sus_son">提醒報稅</span>
            </div>
            <div class="w-23">
                <view-remind-date v-if="!v.is_first" :rmd="v.remind"></view-remind-date>
                <span v-else>
                    {{ view.ser_timed(v.published_at) }}
                </span>
            </div>
            <div class="w-16">
                <view-remind-send-way :way="v.remind.send_way_world"></view-remind-send-way>
            </div>
            <div class="w-9">
                <div v-if="v.is_serial">
                    <span v-if="v.is_first" class="btn-succ_txt">成功</span>
                    <span v-else class="btn-succ_txt">運行中</span>
                </div>
                <div class="sus_ipt" v-else>
                    隊列中
                </div>
            </div>
            <div class="w-11 t-c">
                <a class="pri_son hand">查看
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import ViewCompanyName from '../../../components/view/company/ViewCompanyName.vue'
import ViewRemindDate from '../../../components/view/remind/ViewRemindDate.vue'
import ViewRemindSendWay from '../../../components/view/remind/ViewRemindSendWay.vue'
import ViewSendTimes from '../../../components/view/send/ViewSendTimes.vue'
    export default {
        components: {ViewCompanyName, ViewSendTimes, ViewRemindDate, ViewRemindSendWay  },
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