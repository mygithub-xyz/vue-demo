
<template>
    <div class="book" >
            <table style="width: 90%">
                <tr>
                    <th align="left">
                        <el-button type="focus" @click="addUser">新增</el-button>
                        <el-button type="info" @click="deleteUsers">批量删除</el-button>
                        <el-button type="hover" @click="loadData">刷新</el-button>
                        <el-button type="info" @click="exports">导出</el-button>
                    </th>
                    <th align="right">
                        <el-form :inline="true" :model="searchPeople" @keyup.enter.native="reloadList()">
                        <el-form-item>
                            <el-input v-model="searchPeople.pname" placeholder="用户名" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="searchPeople.countryid" placeholder="密码" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info" @click="currentPage=1,reloadList()">查询</el-button>
                        </el-form-item>
                        </el-form>
                    </th>
                </tr>
            </table>
    <!--    <table style="width: 100%">
            <tr align="left">
                <td width="180">选择</td>
                <td width="180">序号</td>
                <td width="180">名字</td>
                <td width="180">密码</td>
                <td width="180">创建时间</td>
                <td width="180">操作</td>
            </tr>
        <tr v-for="(item,index) in peopleList":key="index" align="left">
            <td >
                <input type="checkbox"  v-model="item.checked"
                                      @click="updateSelection(item.pid)">
            </input>
            </td>
            <td>{{index+1}} </td>
            <td >{{item.pname}} </td>
            <td>{{item.countryid}} </td>
            <td >{{item.createtime}} </td>
            <td >
                <el-button type="text" @click="checkDetail(item)">查看详情</el-button>

                <el-button type="info" @click="modifyUser(item)">修改</el-button>

                <el-button type="info" @click="deleteUser(item)">删除</el-button>
            </td>
        </tr>
        </table>-->
      <el-table :data="peopleList" style="width: 100%"  :row-class-name="tableRowClassName">
                <el-table-column label="选择" width="50px" >
                    <input type="checkbox"  slot-scope="scope" v-model="scope.row.checked"
                           @click="updateSelection(scope.row.pid)">
                    </input>
                 </el-table-column>
            <el-table-column label="序号" type="index" align="center" width="100px">
            </el-table-column>
           <!-- <el-table-column prop="pid" label="id" width="120" >
            </el-table-column>-->
            <el-table-column prop="pname" label="名字" align="center" width="150px">
            </el-table-column>
            <el-table-column prop="countryid" label="密码" align="center" width="150px">
            </el-table-column>
            <el-table-column prop="createtime"  align="center" label="创建时间" width="180px">
            </el-table-column>
            &lt;!&ndash;第二步  开始进行修改和查询操作&ndash;&gt;
            <el-table-column label="操作" align="center" min-width="150px">

                <template slot-scope="scope">
                    <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button>

                    <el-button type="info" @click="modifyUser(scope.row)">修改</el-button>

                    <el-button type="info" @click="deleteUser(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--编辑与增加的页面-->
        <div align="center">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
            </el-pagination>
        </div>
        <!--新增界面-->
        <el-dialog title="编辑" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
            <el-form :model="people" ref="people" label-width="0px" class="demo-ruleForm login-container">
                <el-form-item prop="pname">
                    <el-input type="text" v-model="people.pname" auto-complete="off" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="countryid">
                    <el-input type="text" v-model="people.countryid" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item prop="createtime">
                    <el-date-picker v-model="people.createtime" auto-complete="off" placeholder="选择日期" format="yyyy年MM月dd日 HH时mm分ss秒" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible = false,people={pid:'',pname:'',countryid:''}">取 消</el-button>
                <a v-if="people.pid==null||people.pid==''">
                     <el-button v-if="isView" type="primary" @click.native="addSubmit">确 定</el-button>
                </a>
                <a v-else>
                     <el-button v-if="isView" type="primary" @click.native="editSubmit">确 定</el-button>
                </a>

            </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        name: "Book.vue",
        data() {
            return {
                peopleList: [],
                addFormReadOnly: true,
                dialogVisible: false,
                isView: true,
                searchPeople: {
                    pid: '',
                    pname: '',
                    countryid: '',
                    createtime:''},
                people: {
                    pid: '',
                    pname: '',
                    countryid: '',
                    createtime:''
                },

                //默认每页数据量
                pagesize: 5,
                //默认高亮行数据id
                highlightId: -1,
                //当前页码
                currentPage: 1,
                //查询的页码
                start: 1,
                //默认数据总数
                totalCount: 1000,
                selectIds:[]
            }
        },
        mounted: function () {
            this.loadData();
        },

        methods: {
            loadData() {
                this.searchPeople={};
                this.reloadList();
            },
            //初始化加载
            reloadList(){
                this.selectIds=[];
                axios.post('http://localhost:8081/people/search?page='+this.currentPage+"&rows="+this.pagesize,this.searchPeople).then((result) => {
                    var _data = result.data.rows;
                    this.peopleList = _data;
                    this.totalCount = result.data.total;
                });
            },
            addUser() {
                this.people = {
                    pid: '',
                    pname: '',
                    countryid: '',
                    createtime:''
                };
                this.isView = true;
                this.dialogVisible = true;
            },
            checkDetail(rowData) {
                this.people = Object.assign({}, rowData);
                this.isView = false;
                this.dialogVisible = true;

            },
            modifyUser(rowData) {
                this.people = Object.assign({}, rowData);
                this.isView = true;
                this.dialogVisible = true;
            },
            //删除记录
            deleteUser(rowData) {
                if (confirm("确定要删除？")) {
                        axios.delete("http://localhost:8081/people/delete?selectIds="+rowData.pid).then((result) => {
                            if (result.data) {
                                this.$message({
                                    type: 'info',
                                    message: `已删除`
                                });
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: `删除失败`
                                });

                            }
                            this.loadData();
                        });
                    }
            },
            //增加一条记录
            addSubmit() {
                        axios.post("http://localhost:8081/people/add", this.people).then((result) => {
                            if (result.data.success) {
                                this.$message({
                                    type: 'info',
                                    message: '添加成功',
                                });
                                this.loadData();
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '添加失败',
                                });
                            }
                            this.dialogVisible = false;
                        });
                    },
            //修改一条记录
            editSubmit() {
                        axios.put("http://localhost:8081/people/edit", this.people).then((result) => {
                            if (result.data) {
                                this.$message({
                                    type: 'info',
                                    message: '修改成功',
                                });
                                this.loadData();
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '添加失败',
                                });
                            }
                            this.dialogVisible = false;
                        });
                    },
            //改变当前点击的行的class，高亮当前行
            tableRowClassName({row, rowIndex}) {
                if (row.pname =="李白") {
                    return 'warning-row';
                }
                return '';
            },

            //每页显示数据量变更
            handleSizeChange: function(val) {
                this.pagesize = val;
                this.reloadList();
            },

            //页码变更
            handleCurrentChange: function(val) {
                this.currentPage = val;
                this.reloadList();
            },
            //多选选择绑定
            updateSelection(rowData){
                if (event.target.checked){
                    this.selectIds.push(rowData);
                }else {
                    //根据id找到对应的index
                    var index = this.selectIds.indexOf(rowData);
                    //根据index从数组中删除
                    this.selectIds.splice(index, 1);
                }
                console.log(this.selectIds)
            },

            //全选绑定
            //扩展
            selectAll(){
                if (event.target.checked) { //判断是全选
                    this.selectIds = [];//先清空，防止在操作了一个轮回之后，重复添加了...
                    this.peopleList.forEach(this.peopleList, function (i) {  //list.devices这是循环从后台获取的数组，并添加到刚刚定义的数组里
                        i.checked = true; //全选即将所有的复选框变为选中
                        this.selectIds.push(i.pid);
                    })
                } else {
                    this.peopleList.forEach(this.peopleList, function (i) {
                        i.checked = false; //所有复选框为不选中
                        this.selectIds = [];
                    })
                }
            },
            //批量删除
            exports() {
                if (this.selectIds.length <1) {
                    alert("请先选择");
                } else {
                    if (confirm("确定要导出？")) {
                        axios.get("http://localhost:8081/people/export?selectIds=" + this.selectIds).then((result) => {

                            if (result.data) {
                                this.$message({
                                    type: 'info',
                                    message: `已导出`
                                });
                                window.location.href="http://localhost:8081/people/export?selectIds=" + this.selectIds;
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: `导出失败`
                                });

                            }
                            this.loadData();
                        });
                    }else {
                        this.loadData();
                    }
                        }
            },
            //批量导出
            deleteUsers() {
                if (this.selectIds.length <1) {
                    alert("请先选择");
                } else {
                    if (confirm("确定要删除？")) {
                        axios.delete("http://localhost:8081/people/delete?selectIds=" + this.selectIds).then((result) => {
                            if (result.data) {
                                this.$message({
                                    type: 'info',
                                    message: `已删除`
                                });
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: `删除失败`
                                });

                            }
                            this.loadData();
                        });
                    }else {
                        this.loadData();
                    }
                }
            },

        }
    }
</script>

<style>
    body {
        background: #c5eefb;
    }
    .el-table .warning-row {
        background: #c6dd88;
    }

    .el-table__body tr:hover>td{
        background-color: #fbeeae !important;
    }

    .el-table__body tr.current-row>td{
        background-color: #fbb4ca !important;
    }
</style>
