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
        <el-button type="primary" icon="el-icon-plus" @click="add_course">添加课程</el-button>
      </div>
      <el-dialog title="添加课程" :visible.sync="course_dialogTable">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="学年-学期">
              <el-input v-model="form.course_year" placeholder="格式为XXXX-XXXX-X"></el-input>
            </el-form-item>
            <el-form-item label="课程编号">
              <el-input v-model="form.course_id"></el-input>
            </el-form-item>
            <el-form-item label = "课程名称">
              <el-input v-model="form.course_name"></el-input>
            </el-form-item>
            <el-form-item label="授课教师">
              <el-input v-model="form.course_teacher"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">表单提交</el-button>
            </el-form-item>
        </el-form>
      </el-dialog>
      <el-table
        :data="tableData"
        border
        class="table"
        ref = "multipleTable"
        header-cell-class-name="table-header">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="course_year" label="学年" align="center"></el-table-column>
        <el-table-column prop="course_term" label="学期"  align="center"></el-table-column>
        <el-table-column prop="course_name" label="课程名称"  align="center"></el-table-column>
        <el-table-column prop="course_id" label="课程编号" align="center"></el-table-column>
        <el-table-column prop="course_teacher" label="授课教师" align="center"></el-table-column>
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
      form:{
        course_year:'',
        course_id:'',
        course_name:'',
        course_teacher:'',
      },

      course_dialogTable:false
    }
  },
  created(){
    this.getData();
  },
  methods: {
    getData(){
      this.$http({
        method:'GET',
        url:'http://127.0.0.1:8000/api/getcourselist',
      }).then(response =>{
        let reponse_data = response.data['list']
        this.tableData = reponse_data
      })
    },
    onSubmit(){
      this.$http({
        method:'POST',
        url:'http://127.0.0.1:8000/api/add_course',
        data:this.form
      }).then(response =>{
            let reponse_data = response.data;
            if( reponse_data['error_num'] === 0){
                  console.log("sads")
                  this.$message.success("添加成功");
                  this.course_dialogTable = false;
                  this.form = {};
                  this.getData()
            }
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
    add_course(){
          this.course_dialogTable = true;
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
