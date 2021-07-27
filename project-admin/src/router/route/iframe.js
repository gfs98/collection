// import { t } from '/@/hooks/web/useI18n';



const LAYOUT = () => import('@/layouts/layout/basicLayout.vue');

export const IFRAME = {
  path: '/iframe',
  name: 'iframe',
  component: LAYOUT,
  redirect: '/iframe/antd',
  meta: {
    title: 'iframe',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: 'antd',
      name: 'antd',
      component: () => import('@/views/module/iframe/index.vue'),
      meta: {
        iframeSrc: 'https://2x.antdv.com/docs/vue/introduce-cn/',
        title: 'antd',
        hideBreadcrumb: true,
      },
    },

  ],
};

