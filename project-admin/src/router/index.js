// import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';


import { basicRoutes, LoginRoute } from './route';
import { REDIRECT_NAME } from './route/basic.js';

const WHITE_NAME_LIST = [LoginRoute.name, REDIRECT_NAME];
// console.log(basicRoutes)
// app router
export const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
export function setupRouter(app) {
  app.use(router);
}
