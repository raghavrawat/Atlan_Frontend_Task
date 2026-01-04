import Vue, { VNode } from 'vue'
import { Component } from 'vue-property-decorator'

import { LeftNavigation } from '@/components/LeftNavigation/LeftNavigation'
import { TabStrip } from '@/components/TabStrip/TabStrip'
import { QueryContainer } from '@/components/QueryContainer/QueryContainer'
import { Header } from '@/components/Header/Header'

import { NAV_ITEMS } from '@/constants'
import { INavItem, ITab, IQuery } from '@/interfaces'

import './QueryBuilderView.scss'

@Component({ name: 'QueryBuidlerView' })
class QueryBuidlerView extends Vue {
    private tabs: Array<ITab> = []

    private activeTab = 0

    private newQueryCount = 0

    render (): VNode {
        return (
            <div class="query-builder-container">
                <Header onNewQuery={this.handleNewQuery} />
                <div class="content">
                    <LeftNavigation 
                        items={NAV_ITEMS}
                        activeTabs={this.tabs}
                        activeTabIndex={this.activeTab}
                        onOpenTab={this.handleOpenTab} 
                    />
                    <div class="query-builder-content">
                        {
                            this.tabs.length === 0 ? (
                                <div class="empty-state">
                                    <h2>No queries yet</h2>
                                    <p>Select a table from the left or click <strong>New Query</strong> to get started.</p>
                                </div>
                            )
                            :
                            (
                                <TabStrip active={this.activeTab} tabs={this.tabs} onTabChange={this.handleTabChange} onTabClose={this.handleTabClose}>
                                    {this.tabs.map((tab, index) => {
                                        return (
                                            <QueryContainer
                                                key={tab.id}
                                                tab={tab}
                                                onInputChange={(val: string) => this.handleInputChange(val, index)} 
                                                onUpdateQuery={(payload: { queryIndex: number, query: IQuery }) => this.updateQuery(index, payload)}
                                                onUpdateTab={(payload: { baseTableData: Array<Record<string, string>> }) => this.updateTabBaseData(index, payload)}
                                            />
                                        )
                                    })}
                                </TabStrip>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        )
    }

    private handleOpenTab (item: INavItem): void {
        const existingIndex = this.tabs.findIndex(tab => tab.text === item.text)
        if (existingIndex >= 0) {
            this.activeTab = existingIndex
        } else {
            const defaultQuery = `SELECT * FROM ${item.id.toUpperCase()}`
            this.tabs.push(
                { 
                    ...item, 
                    queries: [
                        { 
                            id: `query-${Date.now()}`, 
                            queryString: defaultQuery, 
                            tableData: [],
                        },  
                    ],
                    activeQueryIndex: 0
                })
            this.activeTab = this.tabs.length - 1
        }
    }

    private handleTabChange (index: number): void {
        this.activeTab = index
    }

    private handleTabClose (index: number): void {
        this.tabs.splice(index, 1)

        if (this.activeTab >= index) {
            this.activeTab = Math.max(0, this.activeTab - 1)
        }
    }

    private handleInputChange (val: string, index: number): void {
        const tab = this.tabs[index]
        if (!tab) return
        this.$set(this.tabs, index, {
            ...tab,
            queryString: val
        })
    }

    private handleNewQuery (): void {
        this.newQueryCount++
        const newTab: ITab = {
            id: `new-${Date.now()}`,
            text: `NewQuery ${this.newQueryCount}`,
            queries: [
                {
                    id: `query-${Date.now()}`,
                    queryString: '',
                    tableData: []
                }
            ],
            activeQueryIndex: 0,
            isFreeQuery: true
        }
        this.tabs.push(newTab)
        this.activeTab = this.tabs.length - 1
    }

    private updateQuery (tabIndex: number, payload: { queryIndex: number, query: IQuery }): void {
        const tab = this.tabs[tabIndex]

        if (!tab) return

        this.$set(tab.queries, payload.queryIndex, payload.query)
    }

    private updateTabBaseData (
        tabIndex: number,
        payload: { baseTableData: Array<Record<string, string>> }
    ): void {
        const tab = this.tabs[tabIndex]
        if (!tab) return

        this.$set(this.tabs, tabIndex, {
            ...tab,
            baseTableData: payload.baseTableData
        })
    }
}

export { QueryBuidlerView }