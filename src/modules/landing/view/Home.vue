<template>
  <el-container class="main-content-wrapper w-100">
    <!-- <div class="sidebar-container">
      <div class="sticky">
        <div class="">SIDEBAR</div>
      </div>
    </div> -->
    <div class="page-loading" v-if="isLoading">
      <BaseLoading :size="168" />
    </div>
    <div class="main mt-2" v-if="!isLoading">
      <div class="">MAIN</div>
    </div>
    <!-- <div class="rightbar-container">
      <div class="sticky">
        <div class="" v-if="!isLoading">RIGHTBAR</div>
      </div>
    </div> -->
  </el-container>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import EventBus from '@/utils/eventBus'
  import BaseLoading from '../../../components/base/loading/BaseLoading.vue'
  @Component({
    components: {}
  })
  export default class Home extends Vue {
    isLoading = false
    value = new Date()
    created(): void {
      //
    }
    destroy(): void {
      //   EventBus.$off('loadingPosts')
    }
  }
</script>

<style lang="scss" scoped>
  .main-content-wrapper {
    @media screen and (max-width: 1024px) {
      // justify-content: flex-start;
      padding-left: 48px;
    }
    display: flex;
    position: relative;
    justify-content: center;
    background: var(--fkb-theme-primary);
    // min-height: 768px;

    .sidebar-container {
      @media screen and (max-width: 1024px) {
        display: none;
      }
      display: flex;
      left: 0;
      top: 0;
      width: 24%;
      max-width: 360px;
      // height: 960px;
      // background: rgb(255, 255, 255);
    }

    .rightbar-container {
      @media screen and (max-width: 1024px) {
        width: 30%;
      }
      position: relative;
      display: flex;
      right: 0;
      width: 24%;
      max-width: 360px;
      // height: 380px;
      background: transparent;
    }

    .main {
      @media screen and (max-width: 1024px) {
        width: 65%;
        min-width: unset;
        max-width: unset;
      }
      position: relative;
      display: flex;
      // min-width: 590px;
      // max-width: 680px;
      width: 80%;
      height: 100%;
      background: transparent;
      padding: 0 0 32px 0;
    }
  }
</style>
