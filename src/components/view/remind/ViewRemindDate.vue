<template>
    <div>
        <span v-if="txt1">{{ txt1 }}</span>
        <span v-else class="sus">待生成</span>
        <!--span class="pl_t">，{{ txt2 }}</!--span-->
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props: { rmd: { type: Object }, times: { type: Array },  },
    computed: {
        txt1() {
            let res = [ ]
            if (this.times) {
                const src = this.times.map(e => e.send_day_real ? e.send_day_real : e.day_sending)
                res = src.map(e => { if (e) { return moment(e).format('M月D日') } })
            }
            return res ? res.join('，') : ''
            // return moment( this.timed_iess ).format('yyyy-MM-DD')
            /*
            let res = this.rmd ? this.rmd.send_date_real_str : ''
            res = res ? res.split('-') : [ ]
            return res && res.length > 0 ? (this.ind(res[0]) + '月' + this.ind(res[1]) + '日') : '' // moment(res).format('MM月DD日')
            */
        },
        txt2() {
            /*
            let res = this.rmd ? this.rmd.send_date_real_str : ''
            res = res ? res.split('-') : [ ]
            res = res && res.length > 0 ? (this.ind(res[0]) + '月' + this.ind(res[1]) + '日') : '' // moment(res).format('MM月DD日')
            */
        }
    },
    methods: {
        ind(v) { return v ? Number.parseInt(v) : '' }
    }
}
</script>

<style>

</style>