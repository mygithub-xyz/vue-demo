<template>
  <div class="about" style="height: 450px">
    <h2 style="color: green">About</h2>
    <el-table :data="peopleList"   :row-class-name="tableRowClassName">
      <el-table-column label="选择" width="50px" >
        <input type="checkbox"  slot-scope="scope" v-model="scope.row.checked"
               @click="">
        </input>
      </el-table-column>
      <el-table-column label="序号" type="index" width="80px" >
      </el-table-column>
      <el-table-column prop="pname" label="名字" width="150px">
      </el-table-column>
      <el-table-column prop="countryid" label="密码" width="150px">
      </el-table-column>
      <el-table-column prop="createtime"  align="center" label="创建时间" width="180px">
      </el-table-column>
      &lt;!&ndash;第二步  开始进行修改和查询操作&ndash;&gt;
      <el-table-column label="操作" align="center" min-width="150px">

        <template slot-scope="scope">
          <el-button type="text" @click="">查看详情</el-button>

          <el-button type="info" @click="">修改</el-button>

          <el-button type="info" @click="">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    name: "About",
    data() {
      return {
        peopleList: [{
          "pid": 9,
          "pname": "姜子牙",
          "countryid": "111",
          "createtime": "2020-08-14 14:42:35"
        }, {
          "pid": 29,
          "pname": "李白",
          "countryid": "222",
          "createtime": "2020-08-17 00:00:00"
        }, {
          "pid": 30,
          "pname": "王昭君",
          "countryid": "333",
          "createtime": "2020-08-17 00:00:00"
        }, {
          "pid": 31,
          "pname": "宫本武藏",
          "countryid": "4444",
          "createtime": "2020-08-12 00:00:00"
        }, {
          "pid": 32,
          "pname": "安吉拉",
          "countryid": "555",
          "createtime": "2020-08-11 00:00:00"
        }]
      }
    },
  }
</script>

<style>
  .el-table__body tr:hover>td{
    background-color: #fbeeae !important;
  }

  .el-table__body tr.current-row>td{
    background-color: #fbb4ca !important;
  }
</style>