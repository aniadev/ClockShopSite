<template>
  <base-popup name="popup-register" class="popup-register" width="432px" :top="'90px'" :open="handleOpen" :close="handleClose" :isShowFooter="false">
    <div slot="title" class="fb-flex-column">
      <span>{{ 'register_title' }}</span>
      <span class="text-base text-normal">{{ 'register_title-desc' }}</span>
    </div>
    <div class="content">
      <el-form :model="form" @submit.native.prevent :show-message="false">
        <div class="flex jc-space-between">
          <div class="box-left" v-if="language !== 'vi'">
            <el-form-item :rules="[{ required: true }]" prop="firstname">
              <el-input type="firstname" v-model="form.firstName" :placeholder="'first-name'" clearable></el-input>
            </el-form-item>
          </div>
          <div class="box-right">
            <el-form-item :rules="[{ required: true }]" prop="lastname">
              <el-input type="lastname" v-model="form.lastName" :placeholder="'last-name'" clearable></el-input>
            </el-form-item>
          </div>
          <div class="box-left" v-if="language === 'vi'">
            <el-form-item :rules="[{ required: true }]" prop="firstname">
              <el-input type="firstname" v-model="form.firstName" :placeholder="'first-name'" clearable></el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item :rules="[{ required: true }]" prop="username">
          <el-input type="username" v-model="form.username" :placeholder="'username'" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :rules="[{ required: true }]" prop="password">
          <el-input type="password" v-model="form.password" :placeholder="'new-password'" clearable show-password></el-input>
        </el-form-item>
        <div class="mt-1">
          <div class="label">{{ 'birthday' }}:</div>
          <div class="flex jc-space-between">
            <el-form-item class="select-birthday">
              <el-select v-model="form.birthday.day" placeholder="Day">
                <el-option v-for="item in getBirthdayOptions('date')" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="select-birthday">
              <el-select v-model="form.birthday.month" placeholder="Month">
                <el-option v-for="item in getBirthdayOptions('month')" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="select-birthday">
              <el-select v-model="form.birthday.year" placeholder="Year">
                <el-option v-for="item in getBirthdayOptions('year')" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div>
          <div class="label">{{ 'gender' }}:</div>
          <div class="flex jc-space-between">
            <el-radio v-model="form.gender" label="female" :border="true" class="radio-gender">{{ 'female' }}</el-radio>
            <el-radio v-model="form.gender" label="male" :border="true" class="radio-gender">{{ 'male' }}</el-radio>
          </div>
        </div>
      </el-form>
      <div class="reg-policy mt-1 mb-1">
        <span class="text-xs text-primary break-word">
          By clicking {{ 'register_submit' }}, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.
        </span>
      </div>
      <div class="w-100 flex jc-center mt-2 mb-1">
        <button @click="handleSubmit" class="btn-success btn-register">{{ 'register_submit' }}<i v-if="isLoading" class="el-icon-loading loading"></i></button>
      </div>
    </div>
  </base-popup>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'
  import BasePopup from '@/components/base/popup/BasePopup.vue'
  import PopupMixin from '@/mixins/popup'
  const xBase = namespace('xBase')
  const fkbAuth = namespace('fkbAuth')
  @Component({ components: { BasePopup } })
  export default class PopupRegister extends Mixins(PopupMixin) {
    @xBase.State('language') language!: string
    @fkbAuth.Action('register') register!: (data: Record<string, any>) => Promise<Record<string, any>>
    isLoading = false
    form: Record<string, any> = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      birthday: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate() - 1
      },
      gender: 'female'
    }
    get validateForm(): boolean {
      if (!this.form.firstName || !this.form.lastName || !this.form.username || !this.form.password || !this.form.birthday || !this.form.gender) {
        return false
      }
      return true
    }

    handleOpen(): void {
      console.log('open')
    }
    handleClose(): void {
      this.setOpenPopup({
        popupName: 'popup-register',
        isOpen: false
      })
    }
    handleSubmit(): void {
      if (this.validateForm) {
        this.isLoading = true
        this.register(this.form)
          .then(rs => {
            if (rs) {
              let message = 'register_successfull'
              this.$message.success(message)
              this.handleClose()
              this.$router.push({ name: 'home' })
              location.reload()
              this.isLoading = false
            }
          })
          .catch(err => {
            this.isLoading = false
          })
      } else {
        let message = 'empty_field'
        this.$message.error(message)
      }
    }

    getBirthdayOptions(field: 'date' | 'month' | 'year'): Array<Record<string, any>> {
      let rs: Record<string, any>[] = []
      if (field === 'date') {
        for (let i in [...Array(31).keys()]) {
          rs.push({
            label: `${parseInt(i) + 1}`,
            value: parseInt(i) + 1
          })
        }
      } else if (field === 'month') {
        for (let i in [...Array(12).keys()]) {
          rs.push({
            label: this.convertMonth(parseInt(i)),
            value: parseInt(i) + 1
          })
        }
      } else if (field === 'year') {
        let curentYear = new Date().getFullYear()
        for (let i in [...Array(80).keys()]) {
          rs.push({
            label: `${curentYear - parseInt(i)}`,
            value: curentYear - parseInt(i)
          })
        }
      }
      return rs
    }

    convertMonth(monthNumber: number): string {
      const date = new Date()
      date.setMonth(monthNumber)

      return date.toLocaleString('en-US', {
        month: 'long'
      })
    }
  }
</script>

<style lang="scss">
  .popup-register {
    .el-dialog__header {
      border-bottom: 1px solid var(--fkb-border-primary) !important;
    }
    .label {
      line-height: 20px;
      font-size: 12px;
      color: var(--fkb-text-secondary);
    }
    .content {
      overflow: hidden;
      .box-left {
        width: 194px;
      }
      .box-right {
        width: 194px;
      }
      .select-birthday {
        width: 125px;
      }
      .radio-gender {
        width: 194px;
        margin: 0 !important;
      }
    }
    .btn-register {
      position: relative;
      width: 194px;
      height: 36px;
      font-size: 18px;
      font-weight: 600;
    }
  }
</style>
