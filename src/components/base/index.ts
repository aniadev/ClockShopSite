import Vue from 'vue'
import { VueConstructor } from 'vue'
import BasePopup from './popup/BasePopup.vue'
// import BaseDrawer from './drawer/BaseDrawer.vue'
// import BaseTable from './table/BaseTable.vue'
// import BaseTreeTable from './table/BaseTreeTable.vue'
// import BasePagination from './pagination/BasePagination.vue'
import BaseMedia from './media/BaseMedia.vue'
import BaseLoading from './loading/BaseLoading.vue'
const components: Record<string, VueConstructor<Vue>> = {
  // BaseTable,
  // BaseTreeTable,
  // BasePagination,
  BasePopup,
  BaseMedia,
  // BaseDrawer,
  BaseLoading
}

export default components
