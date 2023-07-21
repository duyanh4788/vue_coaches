import { RouteRecordRaw, Router, createRouter, createWebHashHistory } from "vue-router";
import CoachesLists from "pages/coaches/container/CoachesLists.vue";
import CoacheDetail from "pages/coaches/container/CoacheDetail.vue";
import ContactCoach from "pages/request/container/ContactCoach.vue";
import CoacheRegistration from "pages/coaches/container/CoacheRegistration.vue";
import RequestRecived from "pages/request/container/RequestRecived.vue";
import NotFound from "pages/notfound/NotFound.vue";
import UserAuth from "pages/auth/container/UserAuth.vue";
import { useStore } from "stores/store";
import { AuthAction } from "stores/modules/auth/actions";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/coaches" },
  { path: "/auth", component: UserAuth, meta: { isUnAuth: true } },
  { path: "/coaches", component: CoachesLists, meta: { isAuth: true } },
  {
    name: "coache-detail",
    path: "/coaches/:id",
    props: true,
    component: CoacheDetail,
    meta: { isAuth: true },
    children: [{ path: "contact", component: ContactCoach, meta: { isAuth: true } }],
  },
  { path: "/register", component: CoacheRegistration, meta: { isAuth: true } },
  { path: "/requests/:coacheId", props: true, component: RequestRecived, meta: { isAuth: true } },
  { path: "/:notFound(.*)", component: NotFound },
];

const routers: Router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes,
});

routers.beforeEach((to, form, next) => {
  const store = useStore();
  const getAuth = store.getters.getAuth;
  if (form.path === "/auth" && to.path === "/coaches") {
    store.dispatch(AuthAction.AUTO_LOGIN);
  }
  if (to.meta.isAuth && !getAuth) {
    next("/auth");
  } else if (to.meta.isUnAuth && getAuth) {
    next("/coaches");
  } else {
    next();
  }
});

export default routers;
