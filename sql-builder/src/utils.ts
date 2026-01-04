export function parseCsv (csvText: string): Array<Record<string, string>> {
    const lines = csvText
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)

    if (!lines.length) return []

    const headers = lines[0].split(',').map(h => h.trim())

    return lines.slice(1).map(line => {
        const values = line.split(',')
        const row: Record<string, string> = {}

        headers.forEach((header, index) => {
        row[header] = values[index]?.trim() ?? ''
        })

        return row
    })
}

export function getTableNameFromQuery (query?: string): string | null {
    if (!query) return null

    const match = query.match(/from\s+([a-zA-Z_][a-zA-Z0-9_]*)/i)
    return match ? match[1].toLowerCase() : null
}

export function applyQueryLogic (data: Array<Record<string, string>>, query: string): Array<Record<string, string>> {
    const match = query.match(/WHERE\s+([^\s=]+)\s*=\s*'([^']+)'/i);

    if (!match) return data

    let [, column, value] = match

    column = column.trim();
    value = value.trim();

    const csvColumn = Object.keys(data[0] || {}).find(
        col => col.toLowerCase() === column.toLowerCase()
    );

    if (!csvColumn) return [];
    
    return data.filter(row => {
        const cell = row[csvColumn];
        return cell != null && String(cell).toLowerCase() === value.toLowerCase();
    });
}