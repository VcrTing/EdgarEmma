<template>
    <div v-if="!mode">
        <p>
            {{ named_en }}
        </p>
        <p>
            {{ named_ch }}
        </p>
    </div>
    <div v-else>
        <p v-if="mode == 'en'">
            {{ named_en }}
        </p>
        <p v-else-if="mode == 'hk'">
            {{ named_ch }}
        </p>
    </div>
</template>

<script>
    export default {
        name: '',
        props: [
            'mode',
            'names'
        ],
        computed: {
            named_en() {
                return this.getNameByLang('en')
            },
            named_ch() {
                return this.getNameByLang('hk')
            }
        },
        methods: {
            getNameByLang(lang = 'en') {
                let res = this.names.filter(e => e.lang == lang)
                return res && res.length > 0 ? res[0].txt : ''
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>