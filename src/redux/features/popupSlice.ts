import { PopupState } from "@/lib/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: PopupState = {
    isVisible: false,
    content: null,
    onClose: () => { },
};

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        showPopup(state, action: PayloadAction<{ content: React.ReactNode; onClose?: () => void }>) {
            state.isVisible = true;
            state.content = action.payload.content;
            state.onClose = action.payload.onClose || (() => { });
        },
        closePopup(state) {
            state.isVisible = false;
            state.content = null;
            state.onClose = () => { };
        },
    },
});

export const { showPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;