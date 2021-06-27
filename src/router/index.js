import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import auth from "../app/auth";
import LogoutSuccess from "@/components/LogoutSuccess";
import UserInfoStore from "../app/user-info-store";
import UserInfoApi from "../app/user-info-api";
import ErrorComponent from "@/components/Error";

function requireAuth(to, from, next) {
  if (!auth.auth.isUserSignedIn()) {
    UserInfoStore.setLoggedIn(false);
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else {
    UserInfoApi.getUserInfo().then((response) => {
      UserInfoStore.setLoggedIn(true);
      UserInfoStore.setCognitoInfo(response);
      next();
    });
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    beforeEnter(to, from, next) {
      auth.auth.getSession();
    }
  },
  {
    path: "/Account/Account",
    name: "Account",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Account/Account.vue"),
  },
  {
    path: "/login/oauth2/code/cognito",
    beforeEnter(to, from, next) {
      var currUrl = window.location.href;

      //console.log(currUrl);
      auth.auth.parseCognitoWebResponse(currUrl);
      //next();
    },
  },
  {
    path: "/logout",
    component: LogoutSuccess,
    beforeEnter(to, from, next) {
      auth.logout();
      next();
    },
  },
  {
    path: "/error",
    component: ErrorComponent,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
