<template>
    <div>

        <div v-for="(v, i) in data" :key="i">
            <transition name="upper">
                <div class="row fx-l upper" 
                    :class="{ 'pt': i > 0 }"
                >
                    <nav class="w-40 input-attach mb-w-618">
                        <input type="text" placeholder="Please input" v-model="v.v" class="input">
                        <span class="icon pri_son">
                            <i class="fas fa-trash-alt" @click="trash(i)"></i>
                        </span>
                    </nav>
                    <div class="w-60 mb-w-382">
                        <button-primary class="btn-icon mh_n mh_n-w" @tap="insert()"
                            v-if="i == (data.length - 1)"
                        >
                            <i class="fas fa-plus"></i>
                        </button-primary>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '@/funcks/ui/button/ButtonPrimary.vue'
    export default {
  components: { ButtonPrimary },
        name: '',
        props: [
            'typed',
            'data'
        ],
        mounted() {
            
        },
        methods: {
            can(v) {
                let res = (v != null && v != '' && v.length > 5)
                if (this.typed == 'phone') {
                    res = (v.length < 17 && this.vid.val_phone(v))
                } else if (this.typed == 'email') {
                    res = (v.length < 90 && this.vid.val_email(v))
                }
                return  res
            },

            valid() {
                console.log('DATA =', this.data, ' 即将进入 filter')
                return this.data ? this.data.filter(e => this.can(e.v)) : false
            },

            submit() {
                return this.valid()
            },

            insert() {
                let res = true
                this.data.map(e => { if (!e.v) { res = false }})
                if (res) { this.data.push( { v: '' } ) }
            },
            trash(i) {
                if (this.data.length > 1) { this.data.splice(i, 1) }
            }
        }
    }
</script>

<style lang="sass" scoped>
.ani_up, 
.ani_down
    transition: all 1s

.ani_up
    transform: translateY(20vh)    
.ani_down
    transform: translateY(-20vh)


</style>