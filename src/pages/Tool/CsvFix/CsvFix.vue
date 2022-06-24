<template>
    <div>
        <h3>修复导入</h3>
        <p>
            https://strapi07.svr.up5d.com
        </p>
        <div class="py">
            <button class="btn-pri py_s px_x2" @tap="() => {}">修复</button>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            dts: [ ],
            nodata: [ ],
            api: 'https://strapi07.svr.up5d.com/'
        }
    },
    mounted() { this.dts = require('./data.js'); this.import_fix() },
    methods: {
        cond(v) {
            return {
                'tax_id': v.tax_id
            }
        },
        async fetch(cond) {
            console.log(this.api + 'company-origins?tax_id=' + cond.tax_id)
            let res = await axios.get(this.api + 'company-origins?tax_id=' + cond.tax_id)
            return res ? res.data : [ ]
        },
        import_fix() {
            let cd = 0
            this.dts.map(async e => {
                // 获得 条件
                cd = this.cond(e)
                // 检查后台重复
                let res = await this.fetch(cd)
                // 是否导入
                if (res && res.length > 0) { } else {
                    this.nodata.push(e)
                }
            })
            console.log('未有数据的 =', this.nodata)
        }
    }
}
</script>

<style>

</style>