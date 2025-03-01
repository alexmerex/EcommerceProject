export interface ProductListParams {
    idProduct: string; // Thêm idProduct
    _id?: string; // Để phòng trường hợp API trả về _id
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


export interface CartItem {
    item: ProductListParams; // Đổi `cart` thành `item` để rõ ràng hơn
}

export interface CartState {
    cart: ProductListParams[]; // Loại bỏ lồng nhau không cần thiết
    length: number;
}
