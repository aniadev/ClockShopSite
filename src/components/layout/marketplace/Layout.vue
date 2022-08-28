<template>
  <el-container class="main-layout" :class="isLoading ? 'be-flex-center' : null">
    <transition name="el-fade-in-linear">
      <base-loading v-if="isLoading" />
    </transition>
    <div class="w-100 layout-lynkey" v-if="!isLoading && getRouteLanding">
      <router-view />
    </div>
  </el-container>
</template>
<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'

  @Component({
    components: {}
  })
  export default class LayoutMarketplace extends Vue {
    // apiUser?: UserRepository
    isLoading = true
    selectLanguage = ''
    timing: any = null
    isScroll = false
    showButton = false
    async mounted(): Promise<void> {
      try {
        this.isLoading = true
        this.selectLanguage = window.localStorage.getItem('bc-lang')!
        // await this.handleSignInFireBase()

        setTimeout(() => {
          this.isLoading = false
          const elm = document.querySelector('.main-center')
          elm?.addEventListener('scroll', () => {
            if (elm.scrollTop) {
              this.isScroll = true
            } else {
              this.isScroll = false
            }
          })
        }, 500)
      } catch (error: any) {
        this.isLoading = false
        let message: any = ''
        const { data } = error.response
      }
    }
    destroyed(): void {
      clearInterval(this.timing)
    }

    get getIcon(): string {
      return this.selectLanguage === 'vi' ? 'flag-vn' : 'flag-usa'
    }
    get getRouteLanding(): boolean {
      return this.$route.name === 'home'
    }

    get getClassMarket(): string {
      if (this.$route.name === 'MarketPlacePrimary' && !this.isScroll) {
        return 'header-market'
      }
      return ''
    }

    handleChangeLanguage(lang: string): void {
      window.localStorage.setItem('bc-lang', lang)
      location.reload()
    }
    async created() {
      window.addEventListener('scroll', this.handleScrollTop)
    }

    handleScrollTop() {
      this.isScroll = window.scrollY > 10
      this.showButton = window.scrollY > 1000
    }
    handleScrollToTop() {
      window.scroll(0, 0)
    }
  }
</script>
<style lang="scss" scoped></style>
