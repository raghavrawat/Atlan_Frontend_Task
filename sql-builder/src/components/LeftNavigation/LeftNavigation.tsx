import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { INavItem, ITab } from '@/interfaces'
import { SearchInput } from '../SearchInput/SearchInput'

import './LeftNavigation.scss'

@Component({ name: 'LeftNavigation' })
class LeftNavigation extends Vue {
    private readonly EVENT_OPEN_TAB: string = 'openTab'

    @Prop({ type: Array, default: () => [] })
    private readonly activeTabs: Array<ITab>

    @Prop({ type: Number, default: -1 })
    private readonly activeTabIndex: number

    @Prop({ type: Array, default: () => [] })
    private readonly items: Array<INavItem>

    private searchText = ''

    private get filteredItems (): INavItem[] {
        const query = this.searchText.trim().toLowerCase()

        if (!query) {
            return this.items
        }

        return this.filterItems(this.items, query)
    }

    render (): VNode {
        return (
            <nav class="navigation-container">
                <SearchInput 
                    value={this.searchText}
                    placeholder="Search tables..."
                    onInput={(val: string) => {
                        this.searchText = val
                    }}
                />
                <div class="navigation-content">
                    {this.renderNavItems()}
                </div>
            </nav>
        )
    }

    private renderNavItems (): VNode {
        return (
            <div 
                class="navigation-items"
            >
                {
                    this.filteredItems.map(this.renderItem)
                }
            </div>
        )
    }

    private renderItem (item: INavItem): VNode {
        const isOpen = !!this.activeTabs.find(tab => tab.id === item.id)
        const isActive = isOpen && this.activeTabs[this.activeTabIndex].id === item.id

        return (
            <div 
                key={item.text} 
                class={["item-container", isActive && 'active-item']}
            >
                <div 
                    class="item-header"
                    onClick={() => this.onHandleClick(item)}
                >
                    <span class="item-text">{item.text}</span>
                </div>

            </div>
        )
    }

    private onHandleClick (item: INavItem): void {
        this.$emit(this.EVENT_OPEN_TAB, item)
    }

    private filterItems (items: INavItem[], query: string): Array<INavItem> {
        return items
            .map(item => {
                const textMatch = item.text.toLowerCase().includes(query)
                if (textMatch) {
                    return {
                        ...item,
                    }
                }

                return null
            })
            .filter(Boolean) as INavItem[]
    }
}

export { LeftNavigation }