<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>成绩列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
          type = "primary"
          icon = "el-icon-delete"
          class="handle-del mr10"
        >批量处理</el-button>
        <el-input v-model="select_course" placeholder="模糊搜索：课程名称"  class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
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
              type="primary"
              icon="el-icon-s-marketing"
              @click="analysis(scope.row.course_id)">成绩分析</el-button>
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
      uploading:true,
      uploadDialog:false,
      file:[],
      up_course_id:''
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
    analysis(e){
      this.$router.push({name:"grade_ana",query:{course_id:e}})
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
