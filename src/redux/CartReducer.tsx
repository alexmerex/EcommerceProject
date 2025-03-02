import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductListParams, CartItem, CartState } from '../TypesCheck/productCartTypes';

const initialState: CartState = {
    cart: [],
    length: 0,
    totalPrice: 0,
};

export const CartSlide = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductListParams>) => {
            const existingItem = state.cart.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cart.push({ ...action.payload, quantity: 1 });
            } else {
                existingItem.quantity += 1; // Tăng số lượng nếu sản phẩm đã tồn tại
            }
            state.length = state.cart.length;
            state.totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cart.find(item => item._id === action.payload);
            if (item) {
                item.quantity += 1;
                state.totalPrice += item.price;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cart.find(item => item._id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    state.totalPrice -= item.price;
                } else {
                    state.cart = state.cart.filter(i => i._id !== action.payload);
                }
            }
            state.length = state.cart.length;
            state.totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter(item => item._id !== action.payload);
            state.length = state.cart.length;
            state.totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        clearCart: (state) => {
            state.cart = [];
            state.length = 0;
            state.totalPrice = 0;
        }
    }
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = CartSlide.actions;
export default CartSlide.reducer;
