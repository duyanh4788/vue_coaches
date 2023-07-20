import { RouteRecordRaw, Router, createRouter, createWebHashHistory } from "vue-router";
import CoachesLists from "pages/coaches/container/CoachesLists.vue";
import CoacheDetail from "pages/coaches/container/CoacheDetail.vue";
import ContactCoach from "pages/request/container/ContactCoach.vue";
import CoacheRegistration from "pages/coaches/container/CoacheRegistration.vue";
import RequestRecived from "pages/request/container/RequestRecived.vue";
import NotFound from "pages/notfound/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/coaches" },
  { path: "/coaches", component: CoachesLists },
  {
    name: "coache-detail",
    path: "/coaches/:id",
    props: true,
    component: CoacheDetail,
    children: [{ path: "contact", component: ContactCoach }],
  },
  { path: "/register", component: CoacheRegistration },
  { path: "/requests/:coacheId", props: true, component: RequestRecived },
  { path: "/:notFound(.*)", component: NotFound },
];

const routers: Router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes,
});

export default routers;
