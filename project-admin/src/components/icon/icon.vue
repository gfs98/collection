<template>
  <MyIcon v-if="type" :type="type" :style="{ color: color, fontSize: size + 'px' }" :class="`icon-${them}`"/>
</template>
<script>
import { createFromIconfontCN } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
const MyIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2679813_u0g3k073hz.js", // generated by iconfont.cn,添加到项目中生成在线url
});

export default defineComponent({
  components: {
    MyIcon,
  },
  props: {
    type: {
      //icon-fangge,icon-lu
      type: String,
    },
    size: {
      type: Number,
      default: 24,
    },
    color: {
      type: String,
      default: '#fff',
    },
    them: {
      type: String,
      default:'dark',
    },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped>
.icon-dark {
    color: #fff;
}
</style>
