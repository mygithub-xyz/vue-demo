<template>
    <div class="index">
    <el-row class="tac">
        <h1 align="center" style="color: red">X X X X 管 理 系 统</h1>
        <el-col :span="12">
            <h2 align="center" style="color: green">后 台 管 理 1.0</h2>
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
            >
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>我的工作台</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1" @click="goTo('/book')">
                            <i class="el-icon-menu"></i>
                            <span slot="title">管理</span>
                        </el-menu-item>
                        <el-menu-item index="2-2" @click="goTo('/home')">
                            <i class="el-icon-setting"></i>
                            <span slot="title">地址</span>
                        </el-menu-item>
                        <el-menu-item index="2-3" @click="goTo('/vchart')">
                            <i class="el-icon-setting"></i>
                            <span slot="title">关于</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航二</span>
                    </template>
                    <el-menu-item index="3-1" @click="goTo('/about')">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航三</span>
                    </template>
                    <el-menu-item index="4-1" @click="goTo('/echart')">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="5" @click="goTo('/view')">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
                <el-menu-item index="6" @click="goTo('/home')">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航五</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="20" class="content-wrapper">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </el-col>
    </el-row>
    </div>
</template>

<script>
    export default {
        name:"index",
        data() {
            return {};
        },

        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            goTo(path) {
                this.$router.replace(path);
            }
        }
    };
</script>

<style scoped>
    .el-col-12{
        width: 16%;
    }
    .el-col-20{
        width: 84%;
    }
</style>