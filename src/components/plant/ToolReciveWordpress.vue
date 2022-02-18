<template></template>
<script>
    export default {
        methods: {
            returnMessage(event){
                console.log('接收 Wordpress 的数据：')
                let data = event.data
                if (data.cmd == 'getFormJson') { this.$emit('recive', data) }
            },
        },
        created() {
            window.addEventListener("message", this.returnMessage);
        },
        destroyed() {
            window.removeEventListener('message', this.returnMessage);
        }
    }
</script>