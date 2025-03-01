import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductListParams, CartState } from "../TypesCheck/productCartTypes";

const initialState: CartState = {
    cart: [],
    length: 0,
    totalPrice: 0,
};

const calculateTotalPrice = (cart: ProductListParams[]) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductListParams>) => {
            const existingItem = state.cart.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            state.length = state.cart.length;
            state.totalPrice = calculateTotalPrice(state.cart);
        },

        updateQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
            const { _id, quantity } = action.payload;
            const existingItem = state.cart.find(item => item._id === _id);

            if (existingItem) {
                if (quantity > 0) {
                    existingItem.quantity = quantity;
                } else {
                    state.cart = state.cart.filter(item => item._id !== _id);
                }
            }

            state.length = state.cart.length;
            state.totalPrice = calculateTotalPrice(state.cart);
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter(item => item._id !== action.payload);
            state.length = state.cart.length;
            state.totalPrice = calculateTotalPrice(state.cart);
        },

        clearCart: (state) => {
            state.cart = [];
            state.length = 0;
            state.totalPrice = 0;
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
