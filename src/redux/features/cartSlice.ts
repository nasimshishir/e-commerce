import { CartProduct } from "@/lib/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: Array<CartProduct> = [];

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartProduct>) => {
            if (state.findIndex((prod) => prod.id === action.payload.id) === -1) {
                state.push(action.payload)
            } else {
                return state.map((prod) => {
                    if (prod.id === action.payload.id) {
                        prod.quantity += action.payload.quantity
                    }
                    return prod
                })
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            return state.filter((prod) => prod.id !== action.payload)
        }

    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;