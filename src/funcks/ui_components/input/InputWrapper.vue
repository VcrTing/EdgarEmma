<template>
    <div class="ps-r">
        <label class="ttd">{{ label }}</label>
        <nav class="pt">
            <slot></slot>
        </nav>
        <p class="input-tip pri" :class="{ 'ip-tip-active': valid }">{{ msg }}</p>
    </div>
</template>

<script>
    export default {
        name: '',
        props: [
            'label',
            'valid'
        ],
        data() {
            return {
                msg: 'Please check your input'
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>