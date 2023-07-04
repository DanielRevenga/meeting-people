import { createSlice } from "@reduxjs/toolkit"

const accessToken = localStorage.getItem("access-token") || ""
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""

const authInitialState = {
	isAuth: accessToken ? "isAuth" : "isNotAuth",
	user: user,
	token: accessToken,
	errorMessage: undefined,
	successMessage: undefined,
}

export const authSlice = createSlice({
	name: "auth",
	initialState: authInitialState,
	reducers: {
		onLoading: (state) => {
			state.isAuth = "loading"
			// state.user = {}
			state.errorMessage = undefined
			state.successMessage = undefined
		},
		onLogin: (state, { payload }) => {
			state.isAuth = "isAuth"
			state.user = payload.user
			state.token = payload.token
			state.errorMessage = undefined
			state.successMessage = undefined
		},
		onSignup: (state, { payload }) => {
			state.isAuth = "isNotAuth"
			state.user = payload
			state.errorMessage = payload
			state.successMessage = "User successfully created"
		},
		onLogout: (state, { payload }) => {
			state.isAuth = "isNotAuth"
			state.user = {}
			state.token = ""
			state.errorMessage = payload
			state.successMessage = undefined
		},
	},
})

export const { onLoading, onLogin, onSignup, onLogout } = authSlice.actions
