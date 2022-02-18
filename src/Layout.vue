<template>
    <div>
        <router-view></router-view>

        <wordpress-app></wordpress-app>
    </div>
</template>

<script>
import WordpressApp from './components/plant/wrapper/WordpressApp.vue'
    export default {
        name: '',
        components: {
            WordpressApp          
        },
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>