import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const xBase = namespace('xBase')

@Component
export default class PopupMixin extends Vue {
  @xBase.Action('setOpenPopup') setOpenPopup!: (data: { popupName: string; isOpen: boolean }) => void
}
