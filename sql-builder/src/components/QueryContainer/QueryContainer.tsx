import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { SqlEditor } from './SqlEditor/SqlEditor'
import { Table } from './Table/Table'
import { ITab, IQuery } from '@/interfaces'

import { parseCsv, getTableNameFromQuery, applyQueryLogic } from '@/utils'

import './QueryContainer.scss'

@Component({ name: 'QueryContainer' })
class QueryContainer extends Vue {
    private readonly EVENT_UPDATE_TAB: string = "updateTab"
    private readonly EVENT_UPDATE_QUERY = 'updateQuery'

    @Prop({ type: Object, default: () => ({}) })
    private readonly tab: ITab

    private loading = false

    private get activeQuery (): IQuery | null {
        return this.tab.queries[this.activeQueryIndex] || null
    }

    private get activeQueryIndex (): number {
        return this.tab.activeQueryIndex
    }

    private get queryError(): string | null {
        if (!this.activeQuery) return null
        return this.validateQuery(this.activeQuery.queryString)
    }

    render (): VNode {
        return (
            <div class="query-container">
                <div class="sql-editor-wrapper">
                    <SqlEditor
                        value={this.activeQuery?.queryString || ''}
                        error={this.queryError}
                        onInput={this.handleInput}
                        onRunQuery={this.handleRunQuery}
                    />
                </div>
                <div class="query-results">
                    <div class="results-body">
                        {
                            (this.activeQuery?.tableData || []).length > 0 ? 
                                <Table loading={this.loading} rows={this.activeQuery?.tableData} />    
                                :
                                (
                                   this.loading ? <div class='loading-container'>Loading...</div> :
                                    <div class="empty-results">
                                        <p>No results yet</p>
                                        <span>Run the query to see results</span>
                                    </div>
                                )
                        }
                        
                    </div>
                </div>
            </div>
        )
    }

    private async handleRunQuery (): Promise<void> {
        if (!this.activeQuery || this.queryError) {
            return
        }

        const newTable = getTableNameFromQuery(this.activeQuery?.queryString)
        const oldTable = this.activeQuery.executedTable
        let baseTableData = this.tab.baseTableData || []

        if (
            this.activeQuery.executedTable !== newTable &&
            this.activeQuery.tableData.length
        ) {
            baseTableData = []
        }

        if (!baseTableData.length) {
            try {
                this.loading = true
                const res = await fetch(`https://api.github.com/repos/graphql-compose/graphql-compose-examples/contents/examples/northwind/data/csv/${newTable}.csv?ref=master`)
                const json = await res.json()
                baseTableData = parseCsv(atob(json.content))
                this.$emit(this.EVENT_UPDATE_TAB, { baseTableData })
            } catch (e) {
                alert(e)
            } finally {
                this.loading = false
            }
        }

        const resultData = applyQueryLogic(
            baseTableData,
            this.activeQuery.queryString
        )

        this.$emit(this.EVENT_UPDATE_QUERY, {
            queryIndex: this.activeQueryIndex,
            query: {
                ...this.activeQuery,
                tableData: resultData,
                executedTable: newTable === oldTable ? oldTable : newTable,
            }
        })
    }

    private handleInput (val: string): void {
        if (!this.activeQuery) return

        this.$emit(this.EVENT_UPDATE_QUERY, {
            queryIndex: 0,
            query: {
                ...this.activeQuery,
                queryString: val,
            }
        })
    }

    private validateQuery(queryString: string): string | null {
        if (this.tab.isFreeQuery) {
            return null
        }

        const match = queryString.match(/FROM\s+([a-zA-Z_][a-zA-Z0-9_]*)/i)
        if (!match) return "Invalid query format"

        const queriedTable = match[1]

        if (queriedTable.toLowerCase() !== this.tab.id.toLowerCase()) {
            return `Query references table "${queriedTable}" but this tab is for "${this.tab.text}"`
        }

        return null
    }
}

export { QueryContainer }