<template>
  <a-layout-sider
    class="sider"
    width="208px"
    :collapsed="collapsed"
    :collapsible="collapsible"
    :trigger="null"
  >
    <logo />
    <div id="scroll-bar" class="scroll-bar">
      <s-menu
        :collapsed="collapsed"
        :menu="menus"
        :theme="theme"
        @selectMenu="onSelect"
        @openMenu="openMenu"
        :mode="mode"
        :style="smenuStyle"
      >
      </s-menu>
    </div>
  </a-layout-sider>
</template>
<script>
import { defineComponent, onUpdated, } from "vue";
import sMenu from "./menu.vue";
import logo from "@/components/logo/logo.vue";
export default defineComponent({
  components: {
    sMenu,
    logo,
  },
  props: {
    menus: Array,
    collapsed: Boolean,
    theme: String,
    mode: String,
    smenuStyle: Object,
    collapsible: Boolean,
  },
  setup(props, context) {
    function onSelect(obj) {
      context.emit("menuSelect", obj);
    }
    function openMenu(obj) {
      context.emit("openMenu", obj);
    }

    // watch(
    //   ()=>props.collapsed,
    //   async (v) => {
    //     if (v ) {
    //       console.log('v',v)
    //     }
    //   },
    //   {
    //     immediate: true,
    //   }
    // )

    onUpdated(() => {
      
    });
    return {
      onSelect,
      openMenu,
    };
  },
});
</script>
<style lang="less" scoped>
#scroll-bar {
  flex: 1;
  overflow: auto;
}
/* update_begin author:sunjianlei date:20190509 for: 修改侧边导航栏滚动条的样式 */
.sider {
  @scrollBarSize: 10px;
  height: 100vh;

  ul.ant-menu {
    /* 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    &::-webkit-scrollbar {
      width: @scrollBarSize;
      height: @scrollBarSize;
      background-color: transparent;
      display: none;
    }

    & .-o-scrollbar {
      display: none;
    }

    /* 兼容IE */
    -ms-overflow-style: none;
    -ms-scroll-chaining: chained;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    // -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);

    /* 定义滚动条轨道 */
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    /* 定义滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: @scrollBarSize;
      background-color: #eee;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);

      &:hover {
        background-color: #dddddd;
      }

      &:active {
        background-color: #bbbbbb;
      }
    }
  }

  /** 暗色系滚动条样式 */
  &.dark ul.ant-menu {
    &::-webkit-scrollbar-thumb {
      background-color: #666666;

      &:hover {
        background-color: #808080;
      }

      &:active {
        background-color: #999999;
      }
    }
  }
}

/* update_end author:sunjianlei date:20190509 for: 修改侧边导航栏滚动条的样式 */
</style>

<!-- update_begin author:sunjianlei date:20190530 for: 选中首页的时候不显示背景颜色 -->
<style lang="less">
@import url("../../assets/less/variable.less");
.ant-menu.ant-menu-root {
  & > .ant-menu-item:first-child {
    background-color: transparent;

    & > a,
    & > a:hover {
      color: rgba(0, 0, 0, 0.65);
    }

    &.ant-menu-item-selected {
      & > a,
      & > a:hover {
          color: @primary-color;
      }
    }
  }

  &.ant-menu-dark > .ant-menu-item:first-child {
    & > a,
    & > a:hover {
      color: rgba(255, 255, 255, 0.65);
    }

    &.ant-menu-item-selected {
      & > a,
      & > a:hover {
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
<!-- update_end author:sunjianlei date:20190530 for: 选中首页的时候不显示背景颜色 -->
