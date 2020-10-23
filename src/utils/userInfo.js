export function userInfo(obj) {
  window.console.log(obj)
  this.$set(obj, 'userName', '邓科')
  this.$set(obj, 'userId', 10001)
  return obj
}
