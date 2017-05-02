export default function ({store, redirect, route}) {
  if (store.state.admin.isLogin === false && route.path !== '/admin/login') {
    return redirect('/admin/login')
  }
}
