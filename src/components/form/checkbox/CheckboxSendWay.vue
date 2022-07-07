<template>
    <nav class="py_x pb fx-l">
        <div class="fx-l"
            v-for="(v, i) in data" :key="i"
            :class="v.class"
        >
            <input type="checkbox" :disabled="v.require" v-model="send_way" name="way" :value="v.v" :id="v.id"/>
            <label class="pl_s ttd hand" :for="v.id">{{ v.txt }}</label>
        </div>
    </nav>
</template>

<script>
// #0275ff
export default {
    data() {
        return {
            data: { },
            send_way: [ 'email' ],
        }
    },
    mounted() {
        this.data = this.view.remind.SEND_WAY_TXT
        this.rest()
    },
    methods: {
        
        rest() {
            this.send_way = [ this.view.remind.SEND_WAY[ 1 ] ]
        },
        collect() {
            return this.send_way
        },

        ioc(snd =  [ 'email' ]) {
            this.send_way = snd
        }
    }
}
</script>