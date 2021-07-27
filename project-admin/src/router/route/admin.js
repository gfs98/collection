
// import { t } from '/@/hooks/web/useI18n';


export const ACCOUNT = () => import('@/views/module/system/account/index.vue');
export const DEPT = () => import('@/views/module/system/dept/index.vue');
export const MENU = () => import('@/views/module/system/menu/index.vue');
export const ROLE = () => import('@/views/module/system/role/index.vue');
const LAYOUT = () => import('@/layouts/layout/basicLayout.vue');

export const SYSTEM = {
  path: '/system',
  name: 'system',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    title: 'system',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: 'account',
      name: 'account',
      component: ACCOUNT,
      meta: {
        title: 'account',
        hideBreadcrumb: true,
      },
    },
    {
        path: 'dept',
        name: 'dept',
        component: DEPT,
        meta: {
          title: 'dept',
          hideBreadcrumb: true,
        },
      },
      {
        path: 'menu',
        name: 'menu',
        component: MENU,
        meta: {
          title: 'menu',
          hideBreadcrumb: true,
        },
      },
      {
        path: 'role',
        name: 'role',
        component: ROLE,
        meta: {
          title: 'role',
          hideBreadcrumb: true,
        },
      },
  ],
};

