<template></template>
<script>
    export default {
        methods: {
            returnMessage(event){
                console.log('接收 Wordpress 的数据：')
                let data = event.data
                console.log('data =', data)
                this.$emit('recive', data)
            },
        },
        created() {
            console.log('已加载 message 方法。')
            window.addEventListener("message", this.returnMessage);
        },
        destroyed() {
            window.removeEventListener('message', this.returnMessage);
        }
    }
</script>