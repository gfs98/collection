
// import { t } from '/@/hooks/web/useI18n';
const LAYOUT = () => import('@/layouts/layout/basicLayout.vue');

export const EXCEPTION_COMPONENT = () => import('@/views/sys/error/error-page/404.vue');

export const REDIRECT_NAME = 'redirect';
// 404 on a page
export const PAGE_NOT_FOUND_ROUTE = {
  path: '/ErrorPage',
  name: 'ErrorPage',
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '404',
      name: 'ErrorPage',
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
      },
    },
  ],
};

export const REDIRECT_ROUTE = {
  path: '/redirect',
  name: REDIRECT_NAME,
  component: LAYOUT,
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: 'ErrorPage',
      name: REDIRECT_NAME,
      component: () => import('@/views/sys/error/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};

export const ERROR_LOG_ROUTE = {
  path: '/error-log',
  name: 'errorLog',
  component: LAYOUT,
  meta: {
    title: 'ErrorLog',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: 'list',
      name: 'errorLogList',
      component: () => import('@/views/sys/error/error-log/index.vue'),
      meta: {
        title: '404',
        hideBreadcrumb: true,
      },
    },
  ],
};

