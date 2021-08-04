import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/index/table",
    },
    {
      path: "/index",
      name: "index",
      component: () => import(`@/views/Index/index`),
      children: [
        {
          path: "table",
          name: "table",
          component: () => import(`@/views/table/index`),
        },
        {
          path: "bpmn",
          name: "bpmn",
          component: () => import(`@/views/bpmn/index`),
        },
        {
          path: "form",
          name: "form",
          component: () => import(`@/views/form/index`),
        },
        {
          path: "process",
          name: "process",
          component: () => import(`@/views/process/index`),
        },
      ],
    },
  ],
});
