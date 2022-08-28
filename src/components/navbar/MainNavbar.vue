<template>
  <div class="main-navbar">
    <div class="navbar-left fb-flex-center">
      <router-link class="logo ml-2" :to="{ name: 'home' }">
        <img src="@/assets/LOGO - CĐTT.png" alt="Logo" srcset="" />
      </router-link>
      <div class="text-0xl ml-1">CÔNG VINH</div>
    </div>
    <div class="main-navigation d-iflex text-1xl">
      <div class="nav-search ml-1">
        <el-input placeholder="Tìm kiếm..."></el-input>
        <div class="btn-default btn-lg ml-2">Tim kiem</div>
      </div>
    </div>
    <div class="navbar-right d-iflex text-base no-select">
      <div class="navbar-right__item nav-notification ml-1" @click="openRegisterPopup"><font-awesome-icon icon="fa-regular fa-bell" /> Thong bao</div>
      <div class="nav-user fb-flex-center h-100 ml-1 mr-2 cursor">
        <el-popover placement="bottom-end" title="" width="280" trigger="click" popper-class="p-0">
          <div class="nav__options text-primary text-sm text-medium">
            <a class="nav__item" href="#">
              <span class="icon mr-1"><font-awesome-icon icon="fa-solid fa-gear" /></span>
              <span class="nav__item-text">Cài đặt</span>
            </a>
            <a class="nav__item" href="#">
              <span class="icon mr-1"><font-awesome-icon icon="fa-solid fa-circle-question" /></span>
              <span class="nav__item-text">Trợ giúp & hỗ trợ</span>
            </a>
            <div class="nav__item" @click="handleSignOut()">
              <span class="icon mr-1"><font-awesome-icon icon="fa-solid fa-right-from-bracket" /></span>
              <span class="nav__item-text">Đăng xuất</span>
            </div>
          </div>
          <el-avatar :size="36" src="https://i.ibb.co/Q9mf8yV/anifastbook-IMAGE-Sun-Aug282022-195521.png" slot="reference"></el-avatar>
        </el-popover>
      </div>
    </div>
    <PopupRegister />
  </div>
</template>
<script lang="ts">
  import { Component, Vue, Mixins, Watch } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import PopupMixin from '@/mixins/popup'
  import PopupRegister from '@/modules/auth/components/PopupRegister.vue'
  const xBase = namespace('xBase')
  import EventBus from '@/utils/eventBus'

  @Component({ components: { PopupRegister } })
  export default class MainNavbar extends Mixins(PopupMixin) {
    newfeedClickCounter = 0

    handleSignOut(): void {
      this.$router.push({ name: 'login' })
    }
    scrollToTop(): void {
      //
      this.newfeedClickCounter++
      if (this.$route.name === 'Newfeed' && this.newfeedClickCounter > 0) {
        EventBus.$emit('scrollToTop')
      }
    }
    openRegisterPopup(): void {
      this.setOpenPopup({
        popupName: 'popup-register',
        isOpen: true
      })
    }
    @Watch('$route.name') watchRouter(): void {
      if (this.$route.name != 'Newfeed') {
        this.newfeedClickCounter = 0
      }
    }
  }
</script>
<style lang="scss" scoped>
  .main-navbar {
    display: flex;
    height: 100%;
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  }
  .navbar-left {
    @media screen and (max-width: 1024px) {
      display: none;
    }
    display: inline-flex;
    position: relative;
    left: 0;
    height: 100%;
    width: 270px;
    .logo {
      @media screen and (max-width: 1024px) {
        margin: 12px !important;
      }
      width: 40px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .navbar-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    width: 270px;
    right: 0;
    height: 100%;
    .navbar-right__item {
      height: 36px;
      width: 136px;
      line-height: 36px;
      text-align: center;
      border-radius: 12px;
      background: var(--fkb-theme-primary);
      transition: all 0.3s ease-in-out;
      &:hover {
        cursor: pointer;
        background: var(--fkb-color-grey30);
      }
    }

    .nav-menu {
    }
    .nav-messenger {
    }
    .nav-notification {
    }
  }
  .main-navigation {
    .nav-search {
      display: flex;
      align-items: center;

      //   ::v-deep.el-input {
      //     &__inner {
      //       border-radius: 20px;
      //       outline: none;
      //       border: none;
      //       background: var(--fkb-input-bg);
      //     }
      //   }
    }
  }

  ::v-deep.nav__options {
    display: flex;
    flex-direction: column;
    padding: 8px 8px 13px 8px;
    a {
      color: inherit;
      text-decoration: none;
    }
    .nav__item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 8px;
      height: 48px;
      border-radius: 8px;
      &:hover {
        cursor: pointer;
        background: var(--fkb-bg-navbar-item);
      }
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        width: 36px;
        font-size: 20px;
        background: var(--fkb-bg-navbar-icon);
        border-radius: 50%;
      }
    }
  }
</style>
