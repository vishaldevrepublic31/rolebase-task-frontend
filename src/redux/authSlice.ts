import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    cart: 0
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload
            state.cart = action.payload.cart.length
        },
        logout(state) {
            state.user = null
            state.cart = 0
        }
    },
});

export const { login, logout } = authSlice.actions
export default authSlice.reducer