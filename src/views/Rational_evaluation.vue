<template>
  <div class="container">
    <el-button type="primary" @click="upModel" icon = "el-icon-upload">上传数据</el-button>
    <el-dialog title="上传文件"  :visible.sync="uploadDialog">
      <el-form ref="addForm" id="addForm">
        <el-form-item>
          <el-upload
            class="upload-demo"
            drag
            :before-upload="beforeUpload"
            :on-exceed = "handleExceed"
             :limit="1"
            :http-request="uploadFile"
            multiple
            ref = "upload"
            action
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">只能上传 doc/docx 文件，且不超过 20MB</div>
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
</template>

<script>
export default {
  data() {
    return {
      uploading:true,
      uploadDialog:false
    };
  },
  methods: {
    //检查文件类型是否为word文档
    beforeUpload(file){
      let filetype = file.name.replace(/.+\./,"").toLowerCase();
      if(filetype === "DOC"|| filetype === "DOCX" || filetype === "doc"|| filetype === "docx"){
        return true;
      }else{
        this.$message.error("上传的文件必须是Word文档格式：");
        return false;
      }
    },
    upModel(){
      this.uploading = false;
      this.file = [];
      this.uploadDialog = true;
    },
    //限制文件上传数量
    handleExceed(files,fileList){
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`);
    },
    uploadFile(item) {
      this.file = item.file;
    },
    postFile() {
      const fileObj = this.file;
      var fileData = new FormData();
      fileData.append("file", fileObj);
      let headers = {
        "Content-Type": "multipart/form-data"
      };
      this.uploading = true;
      this.$http({
        method: "post",
        url:"http://127.0.0.1:8000/api/upload/",    //填写上传的接口
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
    },
    closeFile() {
      this.uploadDialog = false;
    },
  }
}
</script>

<style scoped>

</style>
