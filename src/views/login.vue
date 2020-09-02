<template>

    <div align="center" class="log">
        <h1 align="center">X X X X 管 理 系 统</h1>
        <div class="log01">
            <h2 align="center" style="color: green">账户登录</h2>
            <el-form :inline="true" class="login-form" @submit.native.prevent>
                <el-form-item>
                    <el-input v-model="pname" placeholder="用户名" clearable class="input1"></el-input>
                </el-form-item><br>
                <el-form-item>
                    <el-input v-model="countryid" placeholder="密码" clearable class="input1"></el-input>
                </el-form-item><br>
                <el-form-item>
                    <el-button type="button" @click="load()" class="submit-btn">取  消</el-button>
                </el-form-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-form-item>
                    <el-button type="primary" native-type="submit" class="submit-btn" @click="login()">登  陆</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>

    export default {
        name: "login",
        data() {
            return {
                pname: '',
                countryid: '',
            }
        },
        methods: {
            load(){
                 this.pname= '',
                 this.countryid=''
            },
            login() {
                if (this.pname == '' || this.countryid == '') {
                    this.$alert({
                        message: '请先输入账号，密码进行登陆..',
                    })
                } else {
                    axios.post("http://localhost:8081/people/login?pname="+this.pname+"&countryid="+this.countryid).then((result) => {
                        if (result.data) {
                            window.location.href = "http://localhost:8080/index";
                            this.$message({
                                type: 'info',
                                message: `登陆成功`,
                            })
                        } else {
                            this.$message({
                                type: 'info',
                                message: `用户或者密码错误..`,
                            })
                        }
                    })
                }
            }
        }
    }
</script>
<style scoped>

    .log{

        width: 100%;

        height: 600px;

        background:url(../components/img/manage-bg.jpg)

    }
    h1{
        width: 1100px;
        height: 110px;
        position: absolute;
        margin:80px 80px;
        color: red;
    }

    .log01{
        width: 1100px;
        height: 110px;
        position: absolute;
        margin: 180px 180px;
    }

    .input1{
        width: 280px;
    }
    .submit-btn{
        width: 100px;
    }

</style>