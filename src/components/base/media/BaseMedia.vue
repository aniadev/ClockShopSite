<template>
  <div class="wrap-media" @click="handleClickMedia" :style="{ backgroundColor: backgroundColor }">
    <div v-if="url" class="content-media">
      <img ref="image" v-if="mediaType === 'IMAGE'" :src="url" alt="" class="d-block" :style="{ 'border-radius': radius + 'px', maxHeight: maxHeight }" />
      <video ref="video" v-else-if="mediaType === 'VIDEO'" :src="url" playsinline :autoplay="autoplay" loop muted></video>
      <iframe ref="embed" v-else :src="`${embedUrl + '?controls=1'}`" frameborder="0" :autoplay="autoplay"></iframe>
    </div>
    <div v-else class="empty" :style="{ 'border-radius': radius + 'px' }">
      <base-icon icon="icon-no-image" :size="size + ''" class="d-iflex" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class BaseMedia extends Vue {
    @Prop({ required: false, type: String, default: '' }) url!: string
    @Prop({ required: false, type: String, default: 'IMAGE' }) mediaType!: string
    @Prop({ required: false, type: Number, default: 24 }) size!: number
    @Prop({ required: false, type: String, default: 'unset' }) maxHeight!: string
    @Prop({ required: false, type: Number, default: 0 }) radius!: number
    @Prop({ required: false, type: Boolean, default: true }) autoplay!: boolean
    @Prop({ required: false, type: Boolean, default: true }) isShow!: boolean
    @Prop({ required: false, type: Boolean, default: true }) autoBackground!: boolean

    backgroundColor = '#a19f9d'

    handleClickMedia(): void {
      // if (this.isShow) {
      //   this.$emit('click')
      // }
      this.$emit('click')
    }
    get embedUrl(): string {
      const url = this.url
      if (url.includes('youtu.be/watch?v=') || url.includes('youtube.com/watch?v=')) {
        return url ? url.replace('watch?v=', '/embed/') : ''
      } else if (url.includes('youtu.be/')) {
        return url ? url.replace('youtu.be/', 'youtube.com/embed/') : ''
      } else if (url.includes('youtube.com/')) {
        return url ? url.replace('youtube.com/', 'youtube.com/embed/') : ''
      }

      return url ? url.replace('watch?v=', '/embed/') : ''
    }

    handleActionVideo(status: string): void {
      const video = this.$refs['video'] as HTMLMediaElement
      if (video) {
        if (status === 'play') {
          video.play()
        } else {
          video.pause()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrap-media {
    width: 100%;
    height: 100%;
    .content-media {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      iframe {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 360px;
        border: none;
      }
    }

    .empty {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #dbdbdb;
    }
  }
</style>
