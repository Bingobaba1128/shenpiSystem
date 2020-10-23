<template>
  <el-form label-position="left">
    <div style="width: 100%;position:relative;">
      <el-form-item style="width:100%;margin:0px;text-align: right;">
        <div v-if="actpoint==='edit'" style="text-align: right">
          <el-upload
            :action="$upLoadbaseURL"
            :before-upload="beforeUpload"
            :data="data"
            :file-list="fileList"
            :on-error="error"
            :on-success="handleSuccess"
            :show-file-list="false"
          >
            <el-button style="background:#5C8CFA;border-radius:4px;color:white;width:70px;height:32px;line-height:0">新增</el-button>
          </el-upload>
        </div>
      </el-form-item>
      <el-table
        :data="tableData"
        :header-cell-style="{'text-align' : 'center','background-color' : 'rgb(246, 248, 252)'}"
        border
      >
        <el-table-column label="文件名称（文件格式支持.pdf .jpg .jpeg .png）" prop="enclosureName" />
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="text" @click="download(scope.row.enclosureAddress)">
              下载
            </el-button>
            <el-button type="text" @click="pdfShow(scope.row.enclosureAddress)">
              查看
            </el-button>
            <el-button v-if="actpoint==='edit'" type="text" style="color:#FAAB15" @click="del(scope.row,scope.$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        :close-on-click-modal="false"
        :destroy-on-close="true"
        :lock-scroll="true"
        :visible.sync="pdfVisible"
        class="pdf_dialog"
        width="500px"
      >
        <template slot="title">
          <div style="float:left;margin-left:5px;">{{ pdfTitle }}</div>
        </template>
        <img :src="pdfsrc" style="width:100%;height:600px;">
      </el-dialog>
    </div>
  </el-form>
</template>
<script>
import { baseUrl } from '@/api/apiUrl'

export default {
  // actpoint edit:编辑 look:(((详情)))
  props: [
    'limit',
    'actpoint',
    'instid',
    'title',
    'data',
    'tableData'
  ],
  data() {
    return {
      pdfTitle: '',
      pdfsrc: '',
      dialogImageUrl: '',
      showpdf: false,
      fileList: [],
      accept: [
        // todo 后台取
        '.jpg',
        '.jpeg',
        '.png',
        '.ai',
        '.psd',
        '.pdf'
      ],
      pdfVisible: false

    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {
    error() { this.$message.error('文件上传失败') },

    beforeUpload(file) {
      let isaccept = false
      this.accept.forEach(element => {
        if (file.name.lastIndexOf(element) > 0) {
          isaccept = true
        }
      })
      if (!isaccept) {
        this.$message.error('文件格式不允许上传:' + file.name)
      }
      // todo 后台取
      // isaccept = file.size / 1024 / 1024 < 5
      // if (!isaccept) {
      //   this.$message.error('上传文件大小不能超过 5MB!')
      // }

      return isaccept
    },

    download(url) {
      var fileLink = baseUrl + url + '.'
      window.open(fileLink)
    },
    pdfShow(url) {
      var fileLink = baseUrl + url
      window.open(fileLink, '_blank')
      // this.showpdf = ispdf
      // this.pdfVisible = true
      // this.pdfsrc = file.enclosureAddress
      // this.pdfTitle = file.enclosureName
    },
    del(file, index) {
      var _self = this
      this.$utils.isdel(function() {
        _self.tableData.splice(index, 1)
      })
    },
    handleSuccess(response) {
      var uploadJson = {
        enclosureName: response.data[0].fileName,
        enclosureAddress: response.data[0].url
      }
      // this.listEC.push(uploadJson)
      // window.console.log(response.data[0])
      this.tableData.push(uploadJson)
      // var data = {}
      // data[this.data.businessType] = this.tableData
      this.$emit('successFile', this.tableData)
      this.$message.success('文件上传成功')
    }

  }
}
</script>

<style>
.icon-cursor {
  margin-left: 0;
}
.pdf_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
}
.pdf_dialog .el-dialog {
  margin: 0 auto !important;
  margin-top: 0;
  height: 90%;
  overflow: hidden;
}
.pdf_dialog .el-dialog .el-dialog__body {
  position: absolute;
  left: 0;
  top: 54px;
  bottom: 0;
  right: 0;
  padding: 0;
  z-index: 1;
  overflow: hidden;
}
</style>
