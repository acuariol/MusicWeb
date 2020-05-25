// https://umijs.org/config/
import {defineConfig} from 'umi';

import routes from './routes'

export default defineConfig({
  hash: true,
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  title: false,
  ignoreMomentLocale: true,

  publicPath: '/beatz/',
  base: '/beatz/',
});
