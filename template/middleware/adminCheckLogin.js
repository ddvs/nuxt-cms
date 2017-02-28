export default function ({ store, redirect, route}) {
  if (store.isLogin === false) {
    return redirect('/admin/login')
  }
}
