<template>
    <div class="pri_son">

        <span class="hand" @click="$emit('view')">view</span>&nbsp;&nbsp;
        <span class="hand" @click="$emit('edit')">edit</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props: [ 'id' ],
        methods: {
            
        }
    }
</script>

<style lang="sass" scoped>
    
</style>