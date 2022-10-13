import type { Record } from 'pocketbase'

export enum Variant {
	Danger = 'danger',
	Success = 'success',
	Warning = 'warning',
	Info = 'info',
	Primary = 'primary',
	Secondary = 'secondary',
	Default = 'default',
}

export interface Product extends Record {
    name: string,
    price: number,
    categories?: Category["id"][]
}

export interface Category extends Record {
    name: string,
	id: string
}