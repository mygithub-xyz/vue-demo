<template>
    <div align="center">
        <el-button type="button" @click='view'>点击查看</el-button>
    </div>
</template>

<script>
    export default {
        name: "view",
        data() {
            return {}
        },
        mounted: function () {
        },
        methods: {
            view() {
                    window.location.href = "http://localhost:8081/people/view";
                }
        }
    }
</script>

<style scoped>

</style>