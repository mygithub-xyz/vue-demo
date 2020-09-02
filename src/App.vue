<template>
    <div>
            <router-view></router-view>
             <app-footer></app-footer>
    </div>
</template>
<script>
    import AppFooter from './components/Footer.vue'
    export default {
        components:{
            AppFooter
        }
    }
</script>
<style>
</style>