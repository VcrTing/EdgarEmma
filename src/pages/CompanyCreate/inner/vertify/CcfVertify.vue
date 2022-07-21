<template>
  <div>
    <vertify-code-iniine ref="vciREF" @send="send_in" @result="result_in"
        :_first="first" 
        :_vertified="item.is_vertify && (!item.need_vertify)"
    ></vertify-code-iniine>
  </div>
</template>

<script>
import VertifyCodeIniine from '../../../../components/form/code/VertifyCodeIniine.vue'
export default {
  components: { VertifyCodeIniine },
    props: [ 'item', 'way', '_updated' ],
    data() {
        return {
            first: true
        }
    },
    created() {
        this.item.v_origin = this.item.v
        this.first = this.item.is_first // ( (!this.item.is_vertify) && this.item.need_vertify )
        
    },
    mounted() {
        if (this.item.code) {
            this.$refs.vciREF.ioc(this.item.code)
        }
    },
    computed: {
        reciver() {
            let res = this.item.v
            if (this.way == this.view.remind.SEND_WAY_TXT.note.v) {
                if (!res.startsWith('+')) { res = '+852 ' + res } }
            return res
        }
    },
    methods: {
        async send_in(code) {
            const condition = {
                email: this.reciver, code, send_way: this.way,
                to_email: this.reciver, to_note: this.reciver,
            }
            
            if (this.reciver) { 
                let res = undefined
                try {
                    res = await this.serv.code.code_send(this, condition)
                } catch(err) {
                    res = await this.serv.code.code_send(this, condition)
                }
            }
        },
        result_in() {
            const res = this.$refs.vciREF.coiiect()
            if (res[0] == res[1]) {
                this.item.code = res[0]
                this.$refs.vciREF.succ()

                this.item.is_first = false
                this.item.is_vertify = true
                this.item.need_vertify = false

                this.$emit('vaiid')
            } else {
                this.$refs.vciREF.faii()

                this.item.is_first = true
                this.item.is_vertify = false
                this.item.need_vertify = true
            }
        }
    }
}
</script>

<style>

</style>