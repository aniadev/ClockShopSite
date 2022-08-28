<template>
  <el-container class="main-layout scroll-custom" v-infinite-scroll="load">
    <div class="main-layout__header">
      <component :is="header"></component>
    </div>
    <div class="main-layout__content">
      <router-view />
    </div>
  </el-container>
</template>

<script lang="ts">
  import PopupMixin from '@/mixins/popup'
  import EventBus from '@/utils/eventBus'
  import { Component, Prop, Mixins } from 'vue-property-decorator'
  import MainNavbar from '../navbar/MainNavbar.vue'
  @Component({ components: { MainNavbar } })
  export default class HomeLayout extends Mixins(PopupMixin) {
    @Prop({ required: false, type: String, default: 'MainNavbar' }) header!: string
    load(): void {
      console.log('scrollToBottom')
      EventBus.$emit('scrollToBottom')
    }
  }
</script>

<style lang="scss">
  .main-layout {
    position: relative;
    overflow: auto;
    height: 100vh;
    .main-layout__header {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 66px;
      background-color: var(--fkb-theme-navbar);
      z-index: 100;
      justify-content: center;
      align-items: center;
      box-shadow: var(--fkb-color-grey30) 0px 3px 8px;
    }

    .main-layout__content {
      width: 100%;
      padding-top: 76px;
      margin: 0 auto;
    }
  }
</style>
