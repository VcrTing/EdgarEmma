<template>
    <div class="py_x2 px">
        <h2 class="t-c pri">Import your company</h2>
        <p class="t-c py">From csv</p>
        <div class="py"></div>

        <div class="py_x3 max-w">
            <input type="file" accept=".csv" class="input" id="csv" @change="readCSVFile()" />

            <div class="py"></div>

            <button-primary class="w-100" @tap="turn()">
                导入至后台
            </button-primary>
        </div>

        <tool-import-company ref="impREF"></tool-import-company>
    </div>
</template>

<script>
import plugin_csv from '../../../air/plugin/csv/index'
import ButtonPrimary from '../../../funcks/ui/button/ButtonPrimary.vue'
import ToolImportCompany from '../Import/company/ToolImportCompany.vue'
    export default {
  components: { ButtonPrimary, ToolImportCompany },
        name: '',
        data() {
            return {
                res: [ ],
                file_name: ''
            }
        },
        methods: {
            // 传输到 后台
            turn() {
                let res = null
                const src = this.res

                if (src) {
                    const header = plugin_csv.header.header_company(src[0])
                    res = src[1] ? src[1] : []
                    res = res.map(ee => { return plugin_csv.csv_map(header, ee) })

                    // 开始导入
                    this.$refs.impREF.import_backend( res, this.file_name )
                }
            },

            // 序列化
            _renderCsv(src) {
                return plugin_csv.parse_array( src )
            },

            readCSVFile() {
                const _this = this
                let src = document.getElementById('csv')
                
                let reader = new FileReader()
                this.file_name = src.files[0].name
                reader.readAsText(src.files[0])

                reader.onload = function() { _this.res = _this._renderCsv(this.result) }
            },

        }
    }
</script>

<style lang="sass" scoped>
    
</style>