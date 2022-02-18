<template>
    <div class="py_x3">
        <div v-if="importing" class="t-c">
            <p class="b h3 ttd">导入中......</p>
            <p class="pri">切勿关闭该页面!!!</p>
        </div>

        <tool-import-records ref="recordREF"></tool-import-records>

        <tool-import-result-panel></tool-import-result-panel>
    </div>
</template>

<script>
import ToolImportRecords from '../record/ToolImportRecords.vue'
import ToolImportResultPanel from '../result/ToolImportResultPanel.vue'
    export default {
  components: { ToolImportRecords, ToolImportResultPanel },
        name: '',
        data() {
            return {
                success_num: 0,
                error_num: 0,
                total: 0,
                errors: [ ],
                file_name: '',
                importing: false,
            }
        },
        
        methods: {
            reset_statis() {
                this.success_num = 0
                this.error_num = 0
                this.total = 0
                this.errors = [ ]
            },

            // 执行 导入
            async import_company(src) {
                this.total += 1
                let res = await this.serv.company.company_origin_plus(this, src)

                if (res.fail) {
                    // 错误
                    this.error_num += 1
                    res = res.code + '_' + src.tax_id
                    this.errors.push( res )
                } else {
                    // 正确
                    this.success_num += 1
                }
            }, 

            // 构建后台数据
            check_ch(str) {
                const re = new RegExp('[\\u4E00-\\u9FFF]', 'g')
                return re.test(str);       
            },

            _ser_data(_d) {
                if (typeof _d == 'object') {
                    // 名字
                    let ns = _d.names
                    ns = ns ? ns.split('\r\n') : [ ]

                    let __e = null
                    _d.names = [ ]
                    ns.map(txt => { __e = { txt }; __e.lang = (this.vid.val_chinese(txt)) ? 'hk' : 'en'; _d.names.push(__e) })

                    // 删除无用
                    delete _d['']
                    delete _d.Dissolved

                    // 增加自段
                    _d['data_from'] = 'csv'
                }
                return _d
            },


            async _import_backend(dts) {
                const dts_LEN = dts.length
                for(let i= 0; i< dts_LEN; i++ ) {
                    let _d = dts[ i ]
                    dts[ i ] = this._ser_data(_d)
                    await this.import_company(_d)
                }
            },

            async deal_result() {
                let res = this.build_form()
                // res.user = JSON.stringify(res.user)
                // res.error_json = JSON.stringify(res.error_json)

                await this.serv.imports.create_import_record(this, res)

                console.log('result =', res)
            },

            import_backend(_data, _named) {
                this.file_name = _named
                _data = _data ? _data : [ ]

                if (_data) {
                    this.reset_statis()
                    this.importing = true 

                    _data.map((dt, i) => {
                        dt = dt ? dt : []
                        setTimeout(e => { this._import_backend(dt) }, (1000 * i))
                    })
                }

                setTimeout(e => { this.deal_result(); this.importing = false }, 3600)
            },

            //
            build_form() {

                let u = this.$store.state.user
                let user = { }
                if (u && u.id) { 
                    user = {
                        id: u.id,
                        email: u.email
                    }
                }
                return {
                    user,
                    total: this.total, 
                    success_num: this.success_num, 
                    error_json: this.errors, 
                    file_name: this.file_name,
                    error_num: this.error_num, 
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>