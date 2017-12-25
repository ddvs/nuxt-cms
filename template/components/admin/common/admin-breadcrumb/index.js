import adminBreadcrumb from './src/main'

/* istanbul ignore next */
adminBreadcrumb.install = function VueUseInstall (Vue) {
  Vue.component(adminBreadcrumb.name, adminBreadcrumb)
}

export default adminBreadcrumb
