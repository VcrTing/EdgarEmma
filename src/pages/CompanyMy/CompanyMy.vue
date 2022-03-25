<template>
    <div class="">
        <page-header :header="'Search your company'"></page-header>

        <search @hook:mounted="search" @res="search"></search>

        <div class="py_x2"></div>

        <layout-table :title="'My Company'">
            <com-my-tr class="tr"></com-my-tr>
            <com-my-td class="td" :_items="items"></com-my-td>
        </layout-table>

        <div class="fx-c py_x4">
            <button-primary-out class="px_x2 upper" @tap="$router.push('/home/company_create')">
                Create Company Profile
            </button-primary-out>
        </div>
    </div>
</template>

<script>
import ButtonPrimaryOut from '../../funcks/ui/button/ButtonPrimaryOut.vue'
import PageHeader from '../../funcks/ui/header/PageHeader.vue'
import Search from '../../funcks/ui_components/search/Search.vue'
import LayoutTable from '../../funcks/ui_layout/table/LayoutTable.vue'
import ComMyTd from './body/ComMyTd.vue'
import ComMyTr from './Top/ComMyTr.vue'

    export default {
        components: {PageHeader, Search, LayoutTable, ComMyTr, ComMyTd, ButtonPrimaryOut },
        name: '',
        data() {
            return {
                alive: true,
                items: [ ]
            }
        },
        mounted() {  },
        methods: {
            async search(q) {
                let res = await this.serv.company.company_search( this, q )
                console.log('reS =', res)
                
                if (res) {
                    this.items = res
                }
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>