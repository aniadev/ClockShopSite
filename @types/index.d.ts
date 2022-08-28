import Vue from 'vue'
declare module 'vue/types/vue' {}

declare global {
  interface Window {
    [x: string]: any
  }
}
