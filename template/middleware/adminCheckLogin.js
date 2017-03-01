export default function ({ store, redirect, route}) {
  if (store.isLogin === false && route.path !== '/admin/login') {
    return redirect('/admin/login')
  }
}
