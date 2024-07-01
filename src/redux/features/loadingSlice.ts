import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const intialState: boolean = false;

export const loadingSlice = createSlice({
    name: "loadingSlice",
    initialState: intialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            return action.payload;
        }
    }
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;