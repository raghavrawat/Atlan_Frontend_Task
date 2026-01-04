export interface INavItem {
    id: string
    text: string
    children?: Array<INavItem>
}

export interface ITab {
    id: string
    text: string
    queries: Array<IQuery>
    activeQueryIndex: number
    baseTableData?: Array<Record<string, string>>
    isFreeQuery?: boolean
}

export interface IQuery {
    id: string
    queryString: string
    tableData: Array<Record<string, string>>
    executedTable?: string
}