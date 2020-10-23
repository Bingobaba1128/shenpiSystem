import { MessageBox } from 'element-ui'

export default {
  isdel(callback) {
    MessageBox.alert(
      '<div><p style="color: #F7965B; font-size: 28px;">是否删除文件？</p><p style="color: #A9B3CB;margin-top:14px; font-size: 14px; ">删除后不可恢复</p></div>',
      '',
      {
        dangerouslyUseHTMLString: true,
        showCancelButton: true,
        showClose: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        confirmButtonClass: 'el-button--warning is-round diaBtn diaBtnleft ',
        cancelButtonClass: 'el-button--info is-round diaBtn diaBtnright ',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            callback(done())
          } else {
            done()
          }
        }
      }
    ).then(action => {

    })
  },

  isout(callback) {
    MessageBox.alert(
      '<div><p style="color: #F7965B; font-size: 28px;">您确定要退出嘛？</p><p style="color: #A9B3CB;margin-top:14px; font-size: 14px; ">退出后编辑的文件不会保存</p></div>',
      '',
      {
        dangerouslyUseHTMLString: true,
        showCancelButton: true,
        showClose: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        confirmButtonClass: 'el-button--warning is-round diaBtn diaBtnleft ',
        cancelButtonClass: 'el-button--info is-round diaBtn diaBtnright ',
        beforeClose: (action, instance, done) => {
          console.log(action)
          if (action === 'confirm') {
            callback(done())
          } else {
            done()
          }
        }
      }
    ).then(action => {

    })
  }

}
