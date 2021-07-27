<template>
  <a-menu
    mode="inline"
    theme="dark"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    @openChange="onOpenChange"
    @click="selectMenu"
  >
  <!-- :inline-collapsed="collapsed" -->
    <a-sub-menu :key="item.path" v-for="item in menu">
      <template #icon><icon :type="item.meta.icon"/></template>
      <template #title
        ><span>{{ item.meta.title }}</span></template
      >
      <a-menu-item :key="citem.path" v-for="citem in item.children">
        <template #icon><icon :type="citem.meta.icon"/></template>
        <span>{{ citem.meta.title }}</span>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { menu } from "@/store/modules/menu";
import icon from "@/components/icon/icon.vue";
import { router } from "@/router";

export default defineComponent({
  name: "SMenu",
  emits:['selectMenu','openMenu'],
  components: {
    icon,
  },
  props: {
    menu: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      required: false,
      default: "dark",
    },
    mode: {
      type: String,
      required: false,
      default: "inline",
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, context) {
    let data = reactive({
      openKeys: [],
      selectedKeys: [],
    });
    const selectMenu = (smenu) => {
      menu.dispatch("setCurMenu", smenu);
      context.emit("selectMenu", smenu);
    };
    const onOpenChange = (openKeys) => {
      context.emit("openMenu", openKeys);
    };

    onMounted(() => {
      let tempPath = router.currentRoute._value.path;
      let tempKey = tempPath.split("/");
      data.openKeys = ["/" + tempKey[1]];
      data.selectedKeys = [tempPath];
    });
    return {
      ...toRefs(data),
      selectMenu,
      onOpenChange,
    };
  },
});
// {
//   name: "SMenu",
//   components: {
//       icon
//   },
//   props: {
//     menu: {
//       type: Array,
//       required: true,
//     },
//     theme: {
//       type: String,
//       required: false,
//       default: "dark",
//     },
//     mode: {
//       type: String,
//       required: false,
//       default: "inline",
//     },
//     collapsed: {
//       type: Boolean,
//       required: false,
//       default: false,
//     },
//   },
//   data() {
//     return {
//       openKeys: [],
//       selectedKeys: [],
//     };
//   },
//   methods: {
//     selectMenu(smenu) {
//       menu.dispatch("setCurMenu", smenu);
//       this.$emit("selectMenu", smenu);
//     },
//     onOpenChange(openKeys) {
//       this.$emit("openMenu", openKeys);
//     },
//   },
//   mounted() {
//     let tempPath = router.currentRoute._value.path;
//     let tempKey = tempPath.split("/");
//     this.openKeys = ["/" + tempKey[1]];
//     this.selectedKeys = [tempPath];
//   },
// };
</script>
