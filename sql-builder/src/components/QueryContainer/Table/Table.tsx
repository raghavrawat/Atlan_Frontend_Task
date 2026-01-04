import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import './Table.scss'

@Component({ name: 'Table' })
class Table extends Vue {
    @Prop({ type: Array, required: true })
    private readonly rows: Array<Record<string, string>>

    private currentPage = 1
    private pageSize = 5

    private pageSizeOptions = [5, 10, 15, 20]

    private sortKey: string | null = null
    private sortOrder: 'asc' | 'desc' | null = null

    private get totalPages (): number {
        return Math.ceil(this.rows.length / this.pageSize)
    }

    private get paginatedRows (): Array<Record<string, string>> {
        const start = (this.currentPage - 1) * this.pageSize
        return this.sortedRows.slice(start, start + this.pageSize)
    }

    private get sortedRows (): Array<Record<string, string>> {
        if (!this.sortKey || !this.sortOrder) {
            return this.rows
        }

        const key = this.sortKey
        const order = this.sortOrder

        return [...this.rows].sort((a, b) => {
            const valA = a[key] ?? ''
            const valB = b[key] ?? ''

            const numA = Number(valA)
            const numB = Number(valB)

            if (!isNaN(numA) && !isNaN(numB)) {
                return order === 'asc' ? numA - numB : numB - numA
            }

            return order === 'asc'
                ? String(valA).localeCompare(String(valB))
                : String(valB).localeCompare(String(valA))
        })
    }

    get headers (): string[] {
        return this.rows.length ? Object.keys(this.rows[0]) : []
    }

    render (): VNode {
        return (
            <div class="table-wrapper">
                <div class="table-controls">
                    <label>
                        Rows per page: 
                        <select 
                            value={this.pageSize} 
                            onChange={this.handlePageSizeChange}
                        >
                            {
                                this.pageSizeOptions.map(size => (
                                    <option value={size}>{size}</option>
                                ))
                            }
                        </select>
                    </label>
                    <span>
                        Page {this.currentPage} of {this.totalPages}
                    </span>
                </div>
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                            {this.headers.map(header => (
                                <th
                                    class="sortable"
                                    onClick={() => this.handleSort(header)}
                                >
                                    <span>{header}</span>
                                    {this.renderSortIcon(header)}
                                </th>
                            ))}
                            </tr>
                        </thead>

                        <tbody>
                            {this.paginatedRows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {this.headers.map(header => (
                                <td>{row[header]}</td>
                                ))}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div class="pagination">
                    <button disabled={this.currentPage === 1} onClick={this.goPrev}>
                        Prev
                    </button>
                    <button disabled={this.currentPage === this.totalPages} onClick={this.goNext}>
                        Next
                    </button>
                </div>
            </div>
        )
    }

    private handlePageSizeChange (event: Event): void {
        this.pageSize = Number((event.target as HTMLSelectElement).value)
        this.currentPage = 1
    }

    private goPrev (): void {
        if (this.currentPage > 1) this.currentPage--
    }

    private goNext (): void {
        if (this.currentPage < this.totalPages) this.currentPage++
    }

    private handleSort (header: string): void {
        if (this.sortKey !== header) {
            this.sortKey = header
            this.sortOrder = 'asc'
        } else if (this.sortOrder === 'asc') {
            this.sortOrder = 'desc'
        } else {
            this.sortKey = null
            this.sortOrder = null
        }

        this.currentPage = 1
    }

    private renderSortIcon (header: string): VNode | null {
        if (this.sortKey !== header) return null

        return (
            <span class="sort-icon">
                {this.sortOrder === 'asc' ? '▲' : '▼'}
            </span>
        )
    }
}

export { Table }