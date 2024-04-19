import { XtxBanner } from '@/components/XtxBanner.vue'
/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import 'vue'
import XtxBanner from '@/components/XtxBanner.vue'
import XtxGuess from '@/components/XtxGuess.vue'
declare module 'vue' {
  export interface GlobalComponents {
    //全局组件类型声明
    XtxBanner: typeof XtxBanner
    XtxGuess: typeof XtxGuess
  }
}

// 组件实例类型 为ref
export type XtxGuessInstance = InstanceType<typeof XtxGuess>
