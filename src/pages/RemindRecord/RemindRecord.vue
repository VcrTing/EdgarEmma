<template>
    <div>
        <layout-table :title="'提醒任務記錄'">
            <rmd-record-tr class="tr"></rmd-record-tr>
            <rmd-record-td class="td" :_items="items"></rmd-record-td>
        </layout-table>
        <div class="py_x2"></div>
    </div>
</template>

<script>
import LayoutTable from '../../funcks/ui_layout/table/LayoutTable.vue'
import RmdRecordTd from './body/RmdRecordTd.vue'
import RmdRecordTr from './top/RmdRecordTr.vue'
export default {
  components: { LayoutTable, RmdRecordTr, RmdRecordTd },
    data() {
        return {
            items: [ ],

            loading: true,
        }
    },
    computed: {
        plant() { return this.$store.state.plant },
        user() { return this.$store.state.user }
    },
    mounted() {
        this.fetching( this.condition() )
    },
    methods: {
        condition() {
            let res = { _limit: 200, '_sort': 'published_at:asc' }
            if (this.plant && this.plant.is_admin != true) { res.user = this.user.id }
            return res
        },
        async fetching(condition) {
            this.loading = true
            let res = await this.serv.send.many(this, condition )
            if (res) { this.items = res }
            setTimeout(e => this.loading = false, 600)
        }
    }
}
</script>

<style>

</style>