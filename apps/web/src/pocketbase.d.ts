// Generated using pocketbase-typegen

export enum Collections {
	Profiles = "profiles",
	Products = "products",
	Orders = "orders",
	OrderItems = "order_items",
	ProductCategories = "product_categories",
}

export type ProfilesRecord = {
	userId: string;
	name?: string;
	role: string;
	avatar?: string;
}

export type ProductsRecord = {
	name: string;
	price: number;
	categories: string;
}

export type OrdersRecord = {
	user: string;
	items: string;
}

export type OrderItemsRecord = {
	order: string;
	product: string;
	quantity: number;
}

export type ProductCategoriesRecord = {
	name: string;
	products?: string;
}