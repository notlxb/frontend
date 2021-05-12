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
              icon="el-icon-upload2"
              @click="upModel(scope.row.course_id)">上传文件</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="上传文件" :visible.sync="uploadDialog">
        <el-form ref="addForm" id="addForm">
          <el-form-item label="文件内容">
            <el-select v-model="choose_type" clearable  placeholder="请选择">
              <el-option key="试卷类型A" label="试卷类型A" value="试卷类型A"></el-option>
              <el-option key="试卷类型B" label="试卷类型B" value="试卷类型B"></el-option>
              <el-option key="平时成绩" label="平时成绩" value="平时成绩"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="upload-demo"
              drag
              :before-upload="beforeUpload"
              :on-exceed="handleExceed"
              :limit="1"
              :http-request="uploadFile"
              multiple
              ref="upload"
              action
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">请上传学生成绩表，只支持xls,xlsx</div>
              </template>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footrt">
          <el-button @click="closeFile()">取消</el-button>
          <el-button type="primary" @click="postFile()" :disabled="uploading">确定</el-button>
        </div>
      </el-dialog>
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
      up_course_id:'',
      choose_type:''
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
    //检查文件类型是否为word文档
    beforeUpload(file){
      let filetype = file.name.replace(/.+\./,"").toLowerCase();
      if(filetype === "xls"|| filetype === "xlsx" || filetype === "XLS"|| filetype === "XLSX"){
        return true;
      }else{
        this.$message.error("上传的文件必须是excel文档格式：");
        return false;
      }
    },
    upModel(course_id){
      this.uploading = false;
      this.file = [];
      this.uploadDialog = true;
      this.up_course_id = course_id
    },
    //限制文件上传数量
    handleExceed(files,fileList){
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`);
    },
    uploadFile(item) {
      this.file = item.file;
    },
    closeFile() {
      this.uploadDialog = false;
    },
    postFile() {
      if(this.choose_type !== ""){
        const fileObj = this.file;
        let fileData = new FormData();
        let course_id = this.up_course_id;
        let file_type = this.choose_type;
        fileData.append("file", fileObj);
        fileData.append("course_id",course_id)
        fileData.append("file_type",file_type)
        let headers = {
          "Content-Type": "multipart/form-data"
        };
        this.uploading = true;
        this.$http({
          method: "post",
          url:"http://127.0.0.1:8000/api/upload/exam_grade",    //填写上传的接口
          headers: headers,
          data: fileData
        }).then(res => {
          console.log("res:",res);
          let reponse_data = res.data
          if( reponse_data['code'] === 200){
            this.$message.success("上传成功");
            this.uploadDialog = false;
            this.file = []
          }else {
            this.$message.error("错误！请检查上传文件内容");
            this.file = []
          }
        });
        setTimeout(function() {
          this.uploading = false;
        }, 1500);
      }else{
        this.$message.error("请选择上传文件内容的种类")
      }
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
