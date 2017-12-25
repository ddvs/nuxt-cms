import adminSidebar from './src/main'

/* istanbul ignore next */
adminSidebar.install = function VueUseInstall (Vue) {
  Vue.component(adminSidebar.name, adminSidebar)
}

export default adminSidebar
