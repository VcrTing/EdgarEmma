<template>
    <div>
        {{ txt }}
    </div>
</template>

<script>
export default {
    props: [
        'way'
    ],
    data() {
        return {
            ws: {
                'note': { txt: '短信' },
                'email': { txt: '電郵' },
                'whatsapp': { txt: 'whatsapp' }
            }
        }
    },
    computed: {
        txt() {
            let src = this.way
            src = src ? src.split('_') : [ ]
            src = src.map(e => this.ws[e].txt)
            return src.join('、')
        }
    }
}
</script>

<style>

</style>