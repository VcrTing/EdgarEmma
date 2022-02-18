<template>
    <div class="fx-l">
        <input :id="pk" type="checkbox" class="checkbox" v-model="now">
        <label :for="pk" class="pl">
            <slot></slot>
        </label>
    </div>
</template>

<script>
    export default {
        props: {
            pk: {
                type: String,
                default: 'box_1'
            }
        },
        data() {
            return {
                now: false
            }
        },
        mounted() { this.now = this._def ? this._def : false },
        methods: {
            def(v) { this.now = v }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>