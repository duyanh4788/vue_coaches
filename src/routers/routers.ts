import { RouteRecordRaw, Router, createRouter, createWebHashHistory } from "vue-router";
import CoachesLists from "pages/coaches/container/CoachesLists.vue";
import CoacheDetail from "pages/coaches/container/CoacheDetail.vue";
import ContactCoach from "pages/request/container/ContactCoach.vue";
import CoacheRegistration from "pages/coaches/container/CoacheRegistration.vue";
import RequestRecived from "pages/request/container/RequestRecived.vue";
import NotFound from "pages/notfound/NotFound.vue";
import UserAuth from "pages/auth/container/UserAuth.vue";
import ProjectLists from "pages/projects/container/ProjectLists.vue";
import UserLists from "pages/users/container/UserLists.vue";
import { useStore } from "stores/store";
import { AuthAction } from "stores/modules/auth/actions";

export enum NameRouter {
  HOME = "/",
  COACHES = "/coaches",
  AUTH = "/auth",
  COACHE_ID = "/coaches/:id",
  CONTACT = "contact",
  REGISTER = "/register",
  REQUEST_COACHE_ID = "/request/:coacheId",
  PROJECTS = "/projects",
  USERS = "/users",
  NOTFOUND = "/:notFound(.*)",
}

const routes: Array<RouteRecordRaw> = [
  { path: NameRouter.HOME, redirect: NameRouter.COACHES },
  { path: NameRouter.AUTH, component: UserAuth, meta: { isUnAuth: true } },
  { path: NameRouter.COACHES, component: CoachesLists, meta: { isAuth: true } },
  {
    path: NameRouter.COACHE_ID,
    props: true,
    component: CoacheDetail,
    meta: { isAuth: true },
    children: [{ path: NameRouter.CONTACT, component: ContactCoach, meta: { isAuth: true } }],
  },
  { path: NameRouter.REGISTER, component: CoacheRegistration, meta: { isAuth: true } },
  { path: NameRouter.REQUEST_COACHE_ID, props: true, component: RequestRecived, meta: { isAuth: true } },
  { path: NameRouter.PROJECTS, component: ProjectLists, meta: { isAuth: true } },
  { path: NameRouter.USERS, component: UserLists, meta: { isAuth: true } },
  { path: NameRouter.NOTFOUND, component: NotFound },
];

const routers: Router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes,
});

routers.beforeEach((to, form, next) => {
  const store = useStore();
  const getAuth = store.getters.getAuth;
  if (form.path === NameRouter.AUTH && to.path === NameRouter.COACHES) {
    store.dispatch(AuthAction.AUTO_LOGIN);
  }
  if (to.meta.isAuth && !getAuth) {
    next(NameRouter.AUTH);
  } else if (to.meta.isUnAuth && getAuth) {
    next(NameRouter.COACHES);
  } else {
    next();
  }
});

export default routers;
