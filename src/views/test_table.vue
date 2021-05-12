<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class=""></i>课程表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type = "primary"
          icon = "el-icon-delete"
          class="handle-del mr10"
          @click="delAllSelection"
        >批量处理</el-button>
        <el-input v-model="select_course" placeholder="模糊搜索：课程名称"  class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref = "multipleTable"
        header-cell-class-name="table-header">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="course_name" label="课程名称" align="center"></el-table-column>
        <el-table-column prop="course_teacher" label="任教老师"  align="center"></el-table-column>
        <el-table-column prop="course_evaluate" label="课程综合评价" align="center"></el-table-column>
        <el-table-column prop="course_evatime" label="课程评价时间" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      select_course:'',
      tableData:[

      ],
    }
  },
  created(){
    this.getData();
  },
  methods: {
    getData(){
      this.$http({
        method:'GET',
        url:'http://127.0.0.1:8000/api/getdata',
      }).then(response =>{
        let reponse_data = response.data['list']
        // this.tableData = reponse_data
        this.tableData.push(reponse_data)
        console.log(this.tableData)
      })
    },
    delAllSelection(){

    },
    handleSearch(){

    },
    handleEdit(index, row) {

    },
    handleDelete(index) {

    },
  }
}
</script>


<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
