import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductListParams, CartItem, CartState } from "../TypesCheck/productCartTypes";

const initialState: CartState = {
    cart: [],
    length: 0,
    totalPrice: 0,
};

export const CartSlide = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // ✅ Thêm sản phẩm vào giỏ hàng
        addToCart: (state, action: PayloadAction<ProductListParams>) => {
            try {
                const existingItem = state.cart.find(item => item._id === action.payload._id);
                if (!existingItem) {
                    state.cart.push({ ...action.payload, quantity: 1 });
                } else {
                    existingItem.quantity += 1;
                }
                state.length = state.cart.length;
                state.totalPrice += action.payload.price;
                console.log("🛒 Added to cart:", action.payload.name, "Total:", state.totalPrice);
            } catch (error) {
                console.error("❌ Error in addToCart:", error);
            }
        },

        // ✅ Tăng số lượng sản phẩm
        increaseQuantity: (state, action: PayloadAction<string>) => {
            try {
                const item = state.cart.find(item => item._id === action.payload);
                if (item) {
                    item.quantity += 1;
                    state.totalPrice += item.price;
                    console.log(`➕ Increased quantity of ${item.name} to ${item.quantity}`);
                }
            } catch (error) {
                console.error("❌ Error in increaseQuantity:", error);
            }
        },

        // ✅ Giảm số lượng sản phẩm
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            try {
                const item = state.cart.find(item => item._id === action.payload);
                if (item) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                        state.totalPrice -= item.price;
                        console.log(`➖ Decreased quantity of ${item.name} to ${item.quantity}`);
                    } else {
                        state.cart = state.cart.filter(i => i._id !== action.payload);
                        console.log(`❌ Removed ${item.name} from cart`);
                    }
                }
                state.length = state.cart.length;
            } catch (error) {
                console.error("❌ Error in decreaseQuantity:", error);
            }
        },

        // ✅ Xóa sản phẩm khỏi giỏ hàng
        removeFromCart: (state, action: PayloadAction<string>) => {
            try {
                const item = state.cart.find(item => item._id === action.payload);
                if (item) {
                    state.cart = state.cart.filter(i => i._id !== action.payload);
                    state.totalPrice -= item.price * item.quantity;
                    console.log(`🗑️ Removed ${item.name} from cart`);
                }
                state.length = state.cart.length;
            } catch (error) {
                console.error("❌ Error in removeFromCart:", error);
            }
        },

        // ✅ Xóa toàn bộ giỏ hàng
        clearCart: (state) => {
            try {
                state.cart = [];
                state.length = 0;
                state.totalPrice = 0;
                console.log("🛒 Cart cleared!");
            } catch (error) {
                console.error("❌ Error in clearCart:", error);
            }
        }
    }
});

// Export các action để sử dụng trong component React
export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = CartSlide.actions;

// Export reducer để tích hợp vào Redux store
export default CartSlide.reducer;
