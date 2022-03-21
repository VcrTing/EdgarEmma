<template>
    <div class="py_x2 px">
        <h3 class="">Import your company</h3>
        <p class="py sus">From csv</p>

        <div class="py_x3 max-w">
            <input type="file" accept=".csv" class="input" id="csv" @change="readCSVFile()" />

            <div class="py"></div>

            <button-primary class="w-100" @tap="turn()">
                導入數據
            </button-primary>

            <page-csv-company ref="csvCompREF"></page-csv-company>
        </div>
    </div>
</template>

<script>
import plugin_csv from '../../../air/plugin/csv/index'

import ButtonPrimary from '../../../funcks/ui/button/ButtonPrimary.vue'
import ToolImportCompany from '../Import/company/ToolImportCompany.vue'
import PageCsvCompany from './import_typed/PageCsvCompany.vue'
    export default {
  components: { ButtonPrimary, ToolImportCompany, PageCsvCompany },
        name: '',
        data() {
            return {
                res: [ ],
                file_name: ''
            }
        },
        methods: {
            // 傳輸到 後臺
            turn() {
                const src = this.res

                if (src) {
                    this.$refs.csvCompREF.init(src, this.file_name)
                } else {
                    alert('未發現要導入的數據。')
                }
            },

            // 序列化
            _renderCsv(src) { this.res = plugin_csv.parse_array( src ) },

            readCSVFile() {
                const _this = this
                let reader = new FileReader()
                let src = document.getElementById('csv')
                
                this.file_name = src.files[0].name
                
                reader.readAsText(src.files[0])
                reader.onload = function() { _this._renderCsv(this.result) }
            },

        }
    }
</script>

<style lang="sass" scoped>
    
</style>