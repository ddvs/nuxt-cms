import {mapState} from 'vuex'
import _ from 'lodash'

export default{
  layout: 'admin',
  fetch ({ store, params }) {
    store.commit('admin/setBreadcrumb', ['任务管理', '首页'])
  },
  head () {
    return {
      titleTemplate: '%s - 首页'
    }
  },
  methods: {
    open () {
      this.$message('这是一条消息提示')
    }
  },
  computed: mapState({
    storeData: state => state.admin
  }),
  mounted () {
    console.log(d.util.compactArray([1, '', 2]))
    console.log(_.chunk(['a', 'b', 'c', 'd'], 3))
  }
}
