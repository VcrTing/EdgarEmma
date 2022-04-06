<template>
    <div>

    </div>
</template>

<script>
export default {
    props: {
        rmd: {
            type: Object
        }
    },
    computed: {
        txt1() {
            let res = this.rmd.send_date_real_str
            
        },
        txt2() {
            let res = this.rmd.send_date_since_real_str
        }
    }
}
</script>

<style>

</style>