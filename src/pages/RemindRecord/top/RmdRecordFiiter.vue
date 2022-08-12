<template>
    <div class="select-fiiter ps-r" :class="{ 'select-active': now != 0 }">
        <i class="fa-solid fa-filter"></i>
        <select class="input" v-model="now">
            <option :value="v.v" v-for="(v, i) in tabs" :key="i">{{ v.txt }}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: [ 'src' ],
    watch: {
        now(n) {
            this.$emit('fiiter', this.fiiter())
        }

    },
    methods: {
        fiiter() {
            if (this.now == 1) {
                return this._fiiter_add()
            } else if (this.now == 2) {
                return this._fiiter_rmd()
            }
            return this.src
        },
        _fiiter_add() { return this.src ? this.src.filter(e => e.is_first) : [ ] },
        _fiiter_rmd() { return this.src ? this.src.filter(e => !e.is_first) : [ ] },
    },
    data() {
        return {
            now: 0,
            tabs: [
                {
                    txt: '全部',
                    v: 0 
                },
                {
                    txt: '新增数据',
                    v: 1
                },
                {
                    txt: '提醒报税',
                    v: 2
                }
            ]
        }
    }
}
</script>

<style lang="sass">
</style>