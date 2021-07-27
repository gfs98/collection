<template>
  <h2 class="formtitle">
    {{ FormTitle }}
  </h2>
</template>
<script>
import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'LoginFormTitle',
    props: {
      FormTitle: String,
    },
    setup() {
      return {};
    },
  });
</script>
<style scoped>
.formtitle{
    text-align: center;
    font-weight: bold;
    font-size: 24px;
}
</style>

