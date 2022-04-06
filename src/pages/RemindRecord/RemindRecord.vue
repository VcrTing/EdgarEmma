<template>
    <div>
        <layout-table :title="'Task of Remind'">
            <rmd-record-tr class="tr"></rmd-record-tr>
            <rmd-record-td class="td" :_items="items"></rmd-record-td>
        </layout-table>
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
    mounted() {
        this.fetching({})
    },
    methods: {
        async fetching(condition) {
            this.loading = true
            let res = await this.serv.send.many(this, condition )
            console.log('sends =', res)
            if (res) { this.items = res }
            setTimeout(e => this.loading = false, 600)
        }
    }
}
</script>

<style>

</style>