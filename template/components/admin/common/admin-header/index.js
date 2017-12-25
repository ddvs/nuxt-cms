import adminHeader from './src/ddv-ui-main'

/* istanbul ignore next */
adminHeader.install = function VueUseInstall (Vue) {
  Vue.component(adminHeader.name, adminHeader)
}

export default adminHeader
