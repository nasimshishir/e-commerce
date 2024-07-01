import { Product } from "@/lib/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"


const initialState: Product = {
    _id: "",
    imgSrc: "",
    fileKey: "",
    name: "",
    price: "",
    category: ""
};


export const productSlice = createSlice({
    name: "productSlice",
    initialState: initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<Product>) => {
            return action.payload;
        }
    }
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;