import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import GraphEdition from "../views/GraphEdition.vue";
import GraphStatistics from "../views/GraphStatistics.vue";
import GraphCreation from "../views/GraphCreation.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create",
    name: "createGraph",
    component: GraphCreation
  },
  {
    path: "/graphs/:id/edit",
    name: "graphEdition",
    component: GraphEdition,
  },
  {
    path: "/graphs/:id/statistics",
    name: "graphStatistics",
    component: GraphStatistics,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
