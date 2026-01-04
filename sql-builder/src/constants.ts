import { INavItem } from './interfaces'

export const CSV_FILE_MAP = {
    CATEGORIES: 'categories',
    CUSTOMERS: 'customers',
    EMPLOYEE_TERRITORIES: 'employee_territories',
    EMPLOYEES: 'employees',
    ORDER_DETAILS: 'order_details',
    ORDERS: 'orders',
    PRODUCTS: 'products',
    REGIONS: 'regions',
    SHIPPERS: 'shippers',
    SUPPLIERS: 'suppliers',
    TERRITORIES: 'territories',
}

export const NAV_ITEMS: Array<INavItem> = [
    { id: CSV_FILE_MAP.CATEGORIES, text: 'Categories' },
    { id: CSV_FILE_MAP.CUSTOMERS, text: 'Customers' },
    { id: CSV_FILE_MAP.EMPLOYEE_TERRITORIES, text: 'Empoyee Territories' },
    { id: CSV_FILE_MAP.EMPLOYEES, text: 'Employees' },
    { id: CSV_FILE_MAP.ORDER_DETAILS, text: 'Order Details' },
    { id: CSV_FILE_MAP.ORDERS, text: 'Orders' },
    { id: CSV_FILE_MAP.PRODUCTS, text: 'Products' },
    { id: CSV_FILE_MAP.REGIONS, text: 'Regions' },
    { id: CSV_FILE_MAP.SHIPPERS, text: 'Shippers' },
    { id: CSV_FILE_MAP.SUPPLIERS, text: 'Suppliers' },
    { id: CSV_FILE_MAP.TERRITORIES, text: 'Territories' },
]