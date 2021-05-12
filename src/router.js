import Vue from 'vue'
import Router from 'vue-router'
import login from "./views/login";
import Header from "./components/Header"
import Sidebar from "./components/Sidebar";
import Home from "./views/Home";
import course_table from "./views/course_table"
import course_create from "./views/course_create";
import grade_list from "./views/grade_list"
import Rational_evaluation from "./views/Rational_evaluation";
import course_exam_grade from "./views/course_exam_grade";
import grade_ana from "./views/grade_ana";
import echart from "./views/echart";
import exam_appro from "./views/exam_appro";
Vue.use(Router)
const routers = [
  {
    path:'/',
    redirect:'/login'   //重定向
  },
  {
    path: '/login',
    component: login,
  },
  {
    path:'/1',
    component: Header

  },
  {
    path: '/2',
    component: Sidebar
  },
  {
    path:'/home',
    component: Home,
    children:[
      {
        path:'/course_table',
        component:course_table
      },
      {
        path:'/grade_list',
        component:grade_list
      },
      {
        path:'/raeva',
        component:Rational_evaluation
      },
      {
        path:'/course_create',
        component: course_create
      },
      {
        path:'/exam_grade',
        component: course_exam_grade
      },
      {
        path:'/echart',
        component: echart
      },
      {
        path:'/grade_ana',
        component:grade_ana,
        name:"grade_ana"
      },
      {
        path:'/exam_appro',
        component: exam_appro
      }

    ]
  },

]
export default routers
