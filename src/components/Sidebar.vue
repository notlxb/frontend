<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
              >{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>

  </div>
</template>

<script>
// import bus from "../common/bus";
export default {
  data() {
    return {
      isCollapse: false,
      items: [
        {
          icon: "el-icon-files",
          index: "course_table",
          title: "课程列表"
        },
        {
          icon:"el-icon-files",
          title:"数据上传",
          subs:[
            {
              index:"",
              title:"课程合理性表"
            },
            {
              index:"/exam_appro",
              title:"试卷审批表及附表"
            },
            {
              index:"",
              title:"专家评价表"
            },
            {
              index:"/exam_grade",
              title:"试卷题型分数"
            },
          ]
        },
        {
          icon: "el-icon-s-home",
          index: "grade_list",
          title: "成绩分析"
        },
        {
          icon: "el-icon-s-home",
          index: "/raeva",
          title: "合理性评价表"
        },

        // {
        //   icon: "el-icon-s-home",
        //   index: "3",
        //   title: "表单相关",
        //   subs: [
        //     {
        //       index: "form",
        //       title: "基本表单"
        //     },
        //     {
        //       index: "upload",
        //       title: "文件上传"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-s-home",
        //   index: "icon",
        //   title: "自定义图标"
        // },
        // {
        //   icon: "el-icon-s-home",
        //   index: "charts",
        //   title: "schart图表"
        // },
        //
        // {
        //   icon: "el-icon-s-home",
        //   index: "i18n",
        //   title: "国际化功能"
        // },
        // {
        //   icon: "el-icon-s-home",
        //   index: "7",
        //   title: "错误处理",
        //   subs: [
        //     {
        //       index: "permission",
        //       title: "权限测试"
        //     },
        //     {
        //       index: "404",
        //       title: "404页面"
        //     }
        //   ]
        // },
        // {
        //   icon: "el-icon-s-home",
        //   index: "/donate",
        //   title: "支持作者"
        // }
      ]
    };
  },
  methods:{

  },
  computed: {
    onRoutes() {
      console.log(11)
      // return this.$route.path.replace("/", "");
    },
    collapse(){
      return this.$store.state.collapse
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
