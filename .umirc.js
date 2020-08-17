
// ref: https://umijs.org/config/
export default {
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/home/index' },
        { path: '/User', component: '../pages/user/index' },
      ]
    }
  ],
  antd: {},
  dva: {},
  dynamicImport: false,
  title: 'react-umi-example',
}
