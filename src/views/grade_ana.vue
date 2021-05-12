<template>
  <section class="main">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>成绩列表</el-breadcrumb-item>
        <el-breadcrumb-item>成绩分析</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div v-show="choose_dim">
        <div class="plugins-tips">
          <el-button type="primary" @click="get_dimdata">确定</el-button>
        </div>
        <div class="drag-box">
          <div class="drag-box-item">
            <div class="item-title">可选择指标</div>
            <draggable v-model="dim_mea" @remove="removeHandle" :options="dragOptions">
              <transition-group tag="div" class="item-ul">
                <div v-for="item in dim_mea" class="drag-list" :key="item.id">
                  {{item.content}}
                </div>
              </transition-group>
            </draggable>
          </div>
          <div class="drag-box-item">
            <div class="item-title">选择指标</div>
            <draggable v-model="dim" @remove="removeHandle" :options="dragOptions">
              <transition-group tag="div" class="item-ul">
                <div v-for="item in dim" class="drag-list" :key="item.id">
                  {{item.content}}
                </div>
              </transition-group>
            </draggable>
          </div>
<!--          <div class="drag-box-item">-->
<!--            <div class="item-title">度量</div>-->
<!--            <draggable v-model="mea" @remove="removeHandle" :options="dragOptions">-->
<!--              <transition-group tag="div"  class="item-ul">-->
<!--                <div v-for="item in mea" class="drag-list" :key="item.id">-->
<!--                  {{item.content}}-->
<!--                </div>-->
<!--              </transition-group>-->
<!--            </draggable>-->
<!--          </div>-->
        </div>
      </div>
      <div v-show="!choose_dim">
        <div class="plugins-tips">
          <el-button type="primary" >返回上一步</el-button>
<!--          <el-button type="primary" @click="rec_data">恢复原数据</el-button>-->
<!--          <el-button type="primary" @click="table_transe">翻转</el-button>-->
<!--          <el-button type="primary" >钻取</el-button>-->
<!--          <el-button type="primary" @click="up_roll">上卷</el-button>-->
<!--          <el-button type="primary">切片</el-button>-->
<!--          <el-button type="primary">切块</el-button>-->
        </div>
        <div class="schart-box">
<!--          <schart class="schart" canvasId="bar" :options="options1"></schart>-->
<!--          <div id="myChart" style="width:500px; height:500px"></div>-->
          <IEcharts :option="options1"  style="width:700px;height:500px;"  theme="macarons2"  />

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import IEcharts from 'vue-echarts-v3/src/full'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/theme/macarons2'
export default {
  components:{
    draggable,IEcharts
  },
  data() {
    return {
      course_id:"",
      dragOptions:{
        animation: 120,
        scroll: true,
        group: 'sortlist',
        ghostClass: 'ghost-style'
      },
      choose_dim:true,
      dim_mea: [{id:1,content:"试卷题型分数"}],
      dim: [],
      // mea:[],
      options1: {
        title: { text: '' },
        legend: {
          data: ['试卷A','试卷B','平时分']
        },
        toolbox:{
          show: true,
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        tooltip: {},
        xAxis: {
          data:  ['课程目标3.1','课程目标3.2']
        },
        yAxis: [
          { // 纵轴标尺固定
            type : 'value',
            scale : true,
            max : 1,
            min : 0,
            splitNumber : 10,
            boundaryGap : [ 0.2, 0.2 ]
          }
        ],
        series: [{
          name: '试卷A',
          type: 'bar',
          data: [0.54,0.68]
        },
          {
            name: '试卷B',
            type: 'bar',
            data: [0.78,0.63]
          },
          {
            name: '平时分',
            type: 'bar',
            data: [0.8,0.83]
          }]
      },
      // org_labels:[],
      // org_datasets:[],
      // roll_all_state:[0,1,2],
      // roll_state_now:''
    }
  },
  mounted() {
    // this.init()
  },
  created() {
    this.course_id = this.$router.currentRoute.query.course_id;
    // this.grade_get_dim();
  },
  watch:{
      // option1:{
      //   handler(newVal,oldVal){
      //       if(this.myChart){
      //         if(newVal){
      //           this.myChart.setOption(newVal)
      //         }else{
      //           this.myChart.setOption(oldVal)
      //         }
      //       }else{
      //         this.init();
      //       }
      //   }
      // }
  },
  methods: {
    // init(){
    //   let myChart = this.$echarts.init(document.getElementById('myChart'))
    //   myChart.setOption(this.options1,true)
    // },

    // drawLine(){
    //   // 基于准备好的dom，初始化echarts实例
    //   console.log(this.options1)
    //   let myChart = this.$echarts.init(document.getElementById('myChart'))
    //   // 绘制图表
    //   myChart.clear()
    //   myChart.setOption(this.options1);
    // },
    // grade_get_dim(){
    //   this.$http({
    //     method:'GET',
    //     url:'http://127.0.0.1:8000/api/grade/getdim',
    //     params:{
    //       "course_id":this.course_id,
    //     }
    //   }).then(response =>{
    //     let reponse_data = response.data['list']
    //     this.dim_mea = reponse_data.map((name,index) =>{
    //       return {id:index+1,content:name}
    //     })
    //   });
    // },

    removeHandle(event){

    },
    get_dimdata(){
      // let dim = "";
      // let mea = "";
      // for(let i = 0;i < this.dim.length;i++){
      //   dim = dim + ' ' +this.dim[i].content;
      // }
      // for(let i = 0;i < this.mea.length;i++){
      //     mea = mea + ' ' + this.mea[i].content;
      // }
      this.$http({
        method:'GET',
        url:'http://127.0.0.1:8000/api/get/exam_grade',
        params:{
          "course_id":this.course_id,
           // "dim":dim,
           // "mea":mea
        }
      }).then(response =>{
        // this.options1.title.text = response.data["course_name"]
        // this.options1.xAxis.data = response.data["labels"]
        // this.options1.series[0].data=response.data["datasets"]
      });
      this.choose_dim = false;
      // this.drawLine();
    },
    // rec_data(){
    //   this.get_dimdata();
    // },
    // table_transe(){
    //   let label = this.options1.labels;
    //   let label_new = [];
    //   let datasets =  this.options1.datasets;
    //   let datasets_new = [];
    //   for(let i = 0;i < label.length;i++){
    //     let grade = [];
    //     for(let j = 0;j < datasets.length;j++){
    //       if(i === 0 ){
    //         label_new.push(datasets[i].label);
    //       }
    //       grade.push(datasets[j].data[i]);
    //     }
    //     datasets_new.push({"label":label[i],"data":grade});
    //   }
    //   this.options1.labels = label_new;
    //   this.options1.datasets = datasets_new;
    //   this.roll_state_now = 1;
    // },
    // up_roll(){
    //   let roll_state = ++this.roll_state_now;
    //   let org_data = this.org_datasets
    //   if( roll_state > Math.max.apply(null,this.roll_all_state)){
    //     this.$message.error("不能执行上卷操作")
    //     this.roll_state_now =  Math.max.apply(null,this.roll_all_state)
    //   }else if(roll_state === 2){
    //     this.options1.labels = ["总体情况"]
    //     for(let i = 0;i < org_data.length;i++){
    //       let average = [];
    //       average.push(  (eval(org_data[i].data.join('+'))/org_data[i].data.length).toFixed(2))
    //       this.options1.datasets[i].data = average
    //     }
    //   }
    //   console.log(this.org_datasets)
    // },
    // return_back(){
    //   this.choose_dim = true;
    // }

  }
}

</script>

<style scoped>
.drag-box{
  display: flex;
  user-select: none;
}
.drag-box-item {
  flex: 1;
  max-width:500px;
  min-width: 490px;
  background-color: #eff1f5;
  margin-right: 16px;
  border-radius: 6px;
  border: 1px #e1e4e8 solid;
}
.item-title{
  padding: 8px 8px 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;
  font-weight: 600;
}
.item-ul{
  padding: 0 8px 8px;
  height: 500px;
  overflow-y: scroll;
}
.item-ul::-webkit-scrollbar{
  width: 0;
}
.drag-list {
  border: 1px #e1e4e8 solid;
  padding: 10px;
  margin: 5px 0 10px;
  list-style: none;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  -webkit-transition: border .3s ease-in;
  transition: border .3s ease-in;
}
.drag-list:hover {
  border: 1px solid #20a0ff;
}
/*.drag-title {*/
/*  font-weight: 400;*/
/*  line-height: 25px;*/
/*  margin: 10px 0;*/
/*  font-size: 22px;*/
/*  color: #1f2f3d;*/
/*}*/
/*.ghost-style{*/
/*  display: block;*/
/*  color: transparent;*/
/*  border-style: dashed*/
/*}*/
.schart-box {
  display: inline-block;
  margin: 5px;
}
.schart {
  width: 700px;
  height: 500px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>
