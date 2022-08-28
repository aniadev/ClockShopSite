<template>
  <div class="loader" :style="{ height: size + 'px' }">
    <img src="@/assets/images/Rolling-loading.svg" alt="loading" />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class BaseLoading extends Vue {
    @Prop({ required: false, type: Number, default: 32 }) size!: number
  }
</script>

<style scoped lang="scss">
  .load-main {
    position: relative;
    height: 100%;
  }
  .hidden {
    display: none;
  }
  .loader {
    display: inline-flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: transparent;
    img {
      height: 100%;
      object-fit: contain;
    }
  }
</style>
