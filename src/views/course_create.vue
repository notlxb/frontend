<template>
  <div class="container">
    <div class="form-box">
     <el-form ref="form" :model="form" label-width="80px">
       <el-divider>基本信息填写</el-divider>
       <el-form-item label="学年-学期">
         <el-input v-model="form.year" placeholder="格式为XXXX-XXXX-X"></el-input>
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
<!--      </el-form-item>-->
<!--       <el-divider>请按要求上传文件</el-divider>-->
<!--       <el-form-item>-->
<!--          <el-upload-->
<!--            action="#"-->
<!--            :show-file-list="true"-->
<!--            :on-remove="removeFile"-->
<!--            :multiple="true"-->
<!--            :file-list="form.fileList"-->
<!--            :on-change="handleChange"-->
<!--            :auto-upload="false"-->
<!--            :limit="6"-->
<!--            :on-exceed="handleExceed"-->
<!--            accept=".doc,.docx,xls,xlsx"-->
<!--          >-->
<!--            <el-button solt="trigger" size="small" type="primary">选取文件</el-button>-->
<!--            <el-button  size="small" type="success" @click="uploadFile"></el-button>-->
<!--            <div slot="tip" class="el-upload__tip">上传学生成绩、合理性评价表、试卷审批表及附表、目标达成度评价报告、理论课程目标达成情况专家评价表</div>-->
<!--          </el-upload>-->
<!--       </el-form-item>-->
    </el-form>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      form:{
        course_year:'',
        course_id:'',
        course_name:'',
        course_time:'',
        course_teacher:'',
      }
    }
  },
  methods:{
    upModel(){

    },
  }
}
</script>

<style scoped>

</style>
