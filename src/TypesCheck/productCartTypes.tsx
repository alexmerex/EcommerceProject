export interface ProductListParams {
    idProduct: number; // Change to number if IDs are numerical
    _id?: string; // Keep for MongoDB compatibility
    images: string[];
    name: string;
    price: number;
    oldPrice?: number;
    color?: string;
    size?: string;
    description?: string;
    quantity: number;
    inStock?: boolean;
    isFeatured?: boolean;
    category?: string;
}

export interface CartItem extends ProductListParams {
    quantity: number; // Ensure each cart item has a quantity
}

export interface CartState {
    cart: CartItem[]; // Store cart items directly
    length: number;
}
