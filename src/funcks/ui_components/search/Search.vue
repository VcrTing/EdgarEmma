<template>
    <nav class="py inline-search fx-c">
        <div class="input-icon">
            <input type="text" v-model="v" class="input input-pri" placeholder="Please Input">
            <i class="fa fa-search"></i>
        </div>
        <button-primary class="px btn-sd righter" @tap="submit">
            Search
        </button-primary>
    </nav>
</template>

<script>
import ButtonPrimary from '../../ui/button/ButtonPrimary.vue'
    export default {
  components: { ButtonPrimary },
        name: '',
        data() {
            return {
                v: null
            }
        },
        mounted() {
            
        },
        methods: {
            valid() {
                return this.vid.empty( this.v )
            },
            submit() {
                this.$emit('res', this.valid())
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>