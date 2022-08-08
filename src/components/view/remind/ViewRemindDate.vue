<template>
    <div>
        <span class="pr_t">{{ txt1 }}</span>，
        <span>{{ txt2 }}</span>
    </div>
</template>

<script>
export default {
    props: { rmd: { type: Object } },
    computed: {
        txt1() {
            let res = this.rmd ? this.rmd.send_date_real_str : ''
            res = res ? res.split('-') : [ ]
            return res && res.length > 0 ? (this.ind(res[0]) + '月' + this.ind(res[1]) + '日') : '' // moment(res).format('MM月DD日')
        },
        txt2() {
            let res = this.rmd ? this.rmd.send_date_real_str : ''
            res = res ? res.split('-') : [ ]
            return res && res.length > 0 ? (this.ind(res[0]) + '月' + this.ind(res[1]) + '日') : '' // moment(res).format('MM月DD日')
        }
    },
    methods: {
        ind(v) { return v ? Number.parseInt(v) : '' }
    }
}
</script>

<style>

</style>