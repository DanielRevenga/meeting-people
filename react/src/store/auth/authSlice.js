import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuth: "loading",
        user: {},
        // tokn: "",
        errorMessage: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isAuth = "loading";
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.isAuth = "isAuth";
            state.user = payload;
            state.errorMessage = undefined;
        },
        onSignup: (state, { payload }) => {
            state.isAuth = "isNotAuth";
            state.user = payload;
            state.errorMessage = payload;
        },
        onLogout: (state, { payload }) => {
            state.isAuth = "isNotAuth";
            state.user = {};
            state.errorMessage = payload;
        },
    },
});

export const { onLoading, onLogin, onSignup, onLogout } = authSlice.actions;
