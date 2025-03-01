import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductListParams, CartItem, CartState } from '../TypesCheck/productCartTypes';

const initialState: CartState = {
    cart: [],
    length: 0
};

export const CartSlide = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductListParams>) => {
            const existingItem = state.cart.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cart.push({ ...action.payload, quantity: 1 }); // Đảm bảo có quantity
                state.length = state.cart.length;
            }
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const existingItem = state.cart.find(item => item._id === action.payload);
            if (existingItem) {
                existingItem.quantity += 1;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const existingItem = state.cart.find(item => item._id === action.payload);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                state.cart = state.cart.filter(item => item._id !== action.payload);
            }
            state.length = state.cart.length;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter(item => item._id !== action.payload);
            state.length = state.cart.length;
        },
        clearCart: (state) => {
            state.cart = [];
            state.length = 0;
        }
    }
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = CartSlide.actions;
export default CartSlide.reducer;
