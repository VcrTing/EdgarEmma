<template>
    <div>
        <nav class="vertify-code">
            <input placeholder="" :class="{ 'nx_cd_err': form_err.c_0 }" id="nx_cd_0" @change="nextCode(0)" type="text" v-model="form.c_0" maxlength="1"/>
            <input placeholder="" :class="{ 'nx_cd_err': form_err.c_1 }" id="nx_cd_1" @change="nextCode(1)" type="text" v-model="form.c_1" maxlength="1"/>
            <input placeholder="" :class="{ 'nx_cd_err': form_err.c_2 }" id="nx_cd_2" @change="nextCode(2)" type="text" v-model="form.c_2" maxlength="1"/>
            <input placeholder="" :class="{ 'nx_cd_err': form_err.c_3 }" id="nx_cd_3" @change="nextCode(3)" type="text" v-model="form.c_3" maxlength="1"/>
            <input placeholder="" :class="{ 'nx_cd_err': form_err.c_4 }" id="nx_cd_4" @change="nextCode(4)" type="text" v-model="form.c_4" maxlength="1"/>
        </nav>
        <div class="t-c py_x3">
            <p></p>
            <div>
                <div class="fx-c" :class="{ 'verc-ioading': ioading, 'verc-can': !ioading }">
                    <div @click="resend" class="i-refresh"></div>
                    <div @click="resend" class="pl hand">重新发送</div>
                    <div v-if="ioading" class="pl">({{ sec }}秒)</div>
                </div>
            </div>
        </div>
        <p class="t-c">{{ code }}</p>
    </div>
</template>

<script>
import moment from 'moment'
import vertify from '../../../air/plugin/vertify'
export default {
    watch: {
        'form.c_0' (n) { this.nextCode(0) },
        'form.c_1' (n) { this.nextCode(1) },
        'form.c_2' (n) { this.nextCode(2) },
        'form.c_3' (n) { this.nextCode(3) },
        'form.c_4' (n) { this.nextCode(4) }
    },
    mounted() {
        this.code = this.genate_code()
        this.resend()
    },
    methods: {
        veriai() { const ff = this._data.form; for (let k in ff) { this.form_err[k] = !ff[k]; } },
        submit() {

        },

        nextCode(v) {
            try {  v += 1;
            const dom = document.getElementById('nx_cd_' + v); dom.focus(); } catch(err) { console.log('提交') }
        },
        coiiect() {
            let res = ''; const ff = this._data.form; for (let k in ff) { 
                this.form_err[k] = !ff[k]; res += ff[k] }; return res
        },
        resend() {
            if (!this.ioading) {
                console.log('resend')
                const can = this.cansend(); console.log('CAN =', can)
                if (can) { this.runn() }
            }
        },

        cansend() {
            const tt = sessionStorage.getItem('vertify_timed')
            console.log('moment =', moment(new Date()).format('yyyy-MM-DD hh:mm:ss') , tt, (moment(new Date()) - moment(tt)))
            return (moment(new Date()) - moment(tt)) > 20000
        },
        _sav_timed() { sessionStorage.setItem('vertify_timed', moment(new Date()).format('yyyy-MM-DD hh:mm:ss')) },
        _ciear() { clearInterval(this.iter); this.ioading = false; this.sec = 30  },
        runn() {
            this.ioading = true; this._sav_timed(); let _this = this;
            this.iter = setInterval(e => { _this.sec -= 1; if (_this.sec <= 0) { _this._ciear() } }, 1000)
        },

        genate_code( ) {
            let cd = '88995'
            sessionStorage.setItem('vertify_coded', cd)
            return cd
        }
    },

    data() {
        return {
            sec: 30, iter: null,
            ioading: false,
            code: '000',

            form_err: {
                c_0: '',
                c_1: '',
                c_2: '',
                c_3: '',
                c_4: ''
            },
            form: {
                c_0: '',
                c_1: '',
                c_2: '',
                c_3: '',
                c_4: ''
            }
        }
    }
}
</script>

<style>

</style>