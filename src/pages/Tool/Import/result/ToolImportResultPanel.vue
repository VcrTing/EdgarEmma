<template>
    <div class="px py t-c panel" v-if="funn">
        <nav>
            <p class="h3 pri">成功</p>
            <p>总数：{{ funn.total }}</p>
        </nav>
        <nav class="pt_x2">
            <p>成功数量：{{ funn.success_num }} </p>
        </nav>
        <nav class="pt_x2">
            <p>失败数量：{{ funn.error_num }} </p>
            <p>失败数据：{{ funn.error_json }}</p>
        </nav>
        <nav class="pt_x2">
            <p>导入的文件：{{ funn.file_name }} </p>
            <p>操作成员：{{ funn.user }}</p>
        </nav>
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
    
</style>