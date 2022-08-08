<template>
    <div class="pt_x2">

        <page-header :header="'搜尋你的公司'"></page-header>

        <search @hook:mounted="search" @res="search"></search>
        
        <div class="py_x2"></div>

        <layout-table :title="'搜尋結果'">
            <ac-ss-tr class="tr"></ac-ss-tr>
            <ac-ss-td class="td" :_items="items"></ac-ss-td>
        </layout-table>

        <div class="py_x2"></div>

        <div class="fx-c py_x2">
            <button-primary-out class="px_x2 upper" @tap="$router.push('/home/company_create')">
                找不到你的公司？你也可以增加你的公司資料
            </button-primary-out>
        </div>
    </div>
</template>

<script>
import ButtonPrimaryOut from '../../../funcks/ui/button/ButtonPrimaryOut.vue'
import PageHeader from '../../../funcks/ui/header/PageHeader.vue'
import Search from '../../../funcks/ui_components/search/Search.vue'
import LayoutTable from '../../../funcks/ui_layout/table/LayoutTable.vue'
import AcSsTd from './body/AcSsTd.vue'
import AcSsTr from './top/AcSsTr.vue'
    export default {
  components: { PageHeader, Search, ButtonPrimaryOut, LayoutTable, AcSsTr, AcSsTd },
        name: '',
        data() {
            return {
                items: [ ]
            }
        },
        methods: {
            async search(q) {
                let res = await this.serv.company.company_origin_search( this, q )
                this.items = res ? res : [ ]
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>