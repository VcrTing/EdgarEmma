<template>
    <div class="panel">
        <div class="px_x2 py_x">
            <!--nav>
                <p class="h3 pri t-c">導入結果統計</p>
                <p class="pt">總數：{{ funn.total }}<span class="sus">，（總數在變動時，切勿關閉瀏覽器）</span></p>
            </nav>
            <nav class="pt_x2">
                <p>成功數量：{{ funn.success_num }} </p>
            </nav>
            <nav-- class="pt_x2">
                <p>失敗數量：{{ funn.error_num }} </p>
                <p class="pt_s">失敗數據：{{ funn.error_json }}</p>
            </nav-->
            <slot></slot>
            <nav class="pt">
                <p>導入的文件：{{ funn }} </p>
                <p class="sus">操作成員：當前登錄用戶</p>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props: [ 'funn' ],
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="sass" scoped>
.panel
    border-radius: 1em
</style>