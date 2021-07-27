

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic';
import { SYSTEM } from './admin';
import { IFRAME } from './iframe';
const LAYOUT = () => import('@/layouts/layout/basicLayout.vue');
// import { t } from '/@/hooks/web/useI18n';

// const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList = [];

// Object.keys(modules).forEach((key) => {
//   const mod = modules[key].default || {};
//   const modList = Array.isArray(mod) ? [...mod] : [mod];
//   routeModuleList.push(...modList);
// });
export const WELCOME = {
  path: '/welcome',
  name: 'welcome',
  component: LAYOUT,
  redirect: '/welcome/index',
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('@/components/welcome/index.vue'),
      meta: {
        title: '欢迎',
      },
    },
  ],
};

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute = {
  path: '/',
  name: 'Root',
  redirect: () => {
    return { path: '/login' }
  },
  meta: {
    title: 'Root',
  },
};

export const LoginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/sys/Login/Login.vue'),
  meta: {
    title: '登录',
  },
};

// Basic routing without permission
export const basicRoutes = [RootRoute, LoginRoute, WELCOME, REDIRECT_ROUTE, ...asyncRoutes, SYSTEM, IFRAME ];

