<template>
  <div id="tags-view-container" class="tags-view-container">
    <el-row :gutter="10" style="height:100%">
      <el-col :span="22" style="height:100%">
        <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
          <el-tag
            v-for="tag in visitedViews"
            ref="tag"
            :key="tag.fullPath"
            :class="isActive(tag)?'active':''"
            :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
            tag="span"
            class="tags-view-item"
            @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
            @click="redirect(tag)"
            @contextmenu.prevent.native="openMenu(tag,$event)"
          >
            {{ tag.title }}
            <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
          </el-tag>
        </scroll-pane>
      </el-col>
      <el-col :span="2" style="height:100%; display:flex; align-items:center">
        <el-button icon="el-icon-caret-left" size="mini" style="font-size:22px;padding:2px;margin-left: auto;" @click.native="moveToRight()" />
        <el-button icon="el-icon-caret-right" size="mini" style="font-size:22px;padding:2px;margin-left:0px" @click.native="moveToLeft()" />
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-button
              icon="el-icon-arrow-down el-icon-arrow-up"
              size="mini"
              style="background:rgba(255,255,255,1);margin-left:10px;font-size:22px;padding:2px;"
            />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="closeAllTags(selectedTag)">关闭全部页面</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click="refreshSelectedTag()">刷新当前页面</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import ScrollPane from './ScrollPane'
import path from 'path'

export default {
  components: { ScrollPane },
  inject: ['reloadPage', 'foo'],

  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.toolbar.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive(route) {
      // window.console.log(route)
      return route.fullPath === this.$route.fullPath
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('toolbar/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      window.console.log(this.$route)
      if (name) {
        this.$store.dispatch('toolbar/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      // window.console.log('moveToCurrentTag')
      // window.console.log(tags)
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('toolbar/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag() {
      // this.$emit('refresh', true)
      this.reloadPage()
      sessionStorage.removeItem('tabParam')
      sessionStorage.removeItem('currentTag')

      // window.location.reload()
      // this.$router.push(this.selectedTag)
      // const path1 = this.$route
      // this.$store.dispatch('toolbar/delCachedView', path1).then(() => {
      //   // const { fullPath } = view
      //   // window.console.log(fullPath)
      //   this.$nextTick(() => {
      //     this.$router.replace({
      //       path: path1
      //     })
      //   })
      // })
    },
    closeSelectedTag(view) {
      sessionStorage.removeItem('tabParam')
      sessionStorage.removeItem('currentTag')

      this.$store.dispatch('toolbar/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
      window.console.log(this.$store.state.toolbar.visitedViews, 'testing')
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('toolbar/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      sessionStorage.removeItem('tabParam')
      sessionStorage.removeItem('currentTag')

      this.$store.dispatch('toolbar/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        if (view.name === 'Dashboard') {
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    },
    redirect(tag) {
      this.selectedTag = tag
      this.$router.push({ path: tag.fullPath })
    },
    moveToLeft() {
      this.$refs.scrollPane.moveToLeftP()
      // this.$el.querySelector('.scrollPane').scrollLeft += 50
    },
    moveToRight() {
      this.$refs.scrollPane.moveToRightP()
      // console.log(this.$el.querySelector('.scrollPane').scrollLeft)
      // this.$el.querySelector('.scrollPane').scrollLeft -= 50
    }
  }
}
</script>

<style lang="scss" scoped>

.tags-view-container {
  height: 100%;
  background: #fff;
  // border-bottom: 1px solid #d8dce5;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      // display: inline-block;
      // position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      height: 26px;
      line-height: 25px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 12px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #fdf2e5;
        color: #fda704;
        border-color: #f9dc9e;
        .el-icon-close {
          &:hover {
            background-color: #FFDD9B;
            color: #fff;
          }
        }
        // &::before {
        //   content: '';
        //   background: #fff;
        //   display: inline-block;
        //   width: 8px;
        //   height: 8px;
        //   border-radius: 50%;
        //   position: relative;
        //   margin-right: 2px;
        // }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      right: -3px;
      font-size: 15px;
      line-height: 13px;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
