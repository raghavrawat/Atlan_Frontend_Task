import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { ITab } from '@/interfaces'

import './TabStrip.scss'

@Component({ name: 'TabStrip' })
class TabStrip extends Vue {
    private readonly EVENT_TAB_CHANGE: string = 'tabChange'
    private readonly EVENT_TAB_CLOSE = 'tabClose'

    @Prop({ type: Number, required: false })
    readonly active: number

    @Prop({ type: Array, default: () => ({}) })
    private readonly tabs: Array<ITab>

    readonly $slots: {
        default: Array<VNode>
    }

    render (): VNode {
        return (
            <div class="tab-strip">
                <ul class="tab-strip-list">
                    {this.tabs.map(this.renderHeader)}
                </ul>
                {Boolean(this.$slots.default) && this.$slots.default.filter((_, index) => index === this.active)}
            </div>
        )
    }

    private renderHeader (header: ITab, index: number): VNode {
        return (
            <div
                class={["tab-strip-header", index === this.active && 'active']}
                onClick={() => this.onClick(index)}
            >
                <div class="tab-strip-title">
                    <span>{header.text}</span>
                </div>
                <span
                    class="tab-strip-close"
                    onClick={(e: MouseEvent) => this.onClose(e, index)}
                >
                    ✕
                </span>
            </div>
        )
    }

    private onClick (index: number): void {
        if (index !== this.active) {
            this.$emit(this.EVENT_TAB_CHANGE, index)
        }
    }

    private onClose (e: MouseEvent, index: number): void {
        e.stopPropagation()
        this.$emit(this.EVENT_TAB_CLOSE, index)
    }
}

export { TabStrip }