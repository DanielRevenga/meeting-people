import { useDispatch, useSelector } from "react-redux"
import { onLoading, onLogin, onLogout, onSignup } from "../store"
import { chatAPI } from "../api"
import { useState } from "react"

export const useAuthStore = () => {
	const dispatch = useDispatch()
	const [errorAuth, setErrorAuth] = useState("")

	const { isAuth, user, successMessage } = useSelector((state) => state.auth)

	const loginUser = async ({ email, password }) => {
		// dispatch(onLoading())

		try {
			const { data } = await chatAPI.post("/login", {
				email,
				password,
			})
			const token = data.token
			const user = data.user
			localStorage.setItem("access-token", token)
			localStorage.setItem("user", JSON.stringify(user))

			dispatch(onLogin({ user, token }))
		} catch (error) {
			setErrorAuth("Wrong credentials")
			dispatch(onLogout("Wrong credentials"))
		}
	}

	const signupUser = async ({ name, email, password, role }) => {
		// dispatch(onLoading())

		try {
			const { data } = await chatAPI.post("/signup", {
				name,
				email,
				password,
				role,
			})

			dispatch(onSignup(data.user))
		} catch (error) {
			let message = error.response.data.message
			if (typeof message === "object" && Object.values(message).length) {
				message = Object.values(message).join("\n")
			}

			setErrorAuth(message)
			dispatch(onLogout(message))
		}
	}

	const logoutUser = async () => {
		await chatAPI.post("/logout")
		localStorage.setItem("access-token", "")
		dispatch(onLogout(""))
	}

	const getUser = async () => {
		try {
			await chatAPI.get("/user")
			dispatch(onLogin())
		} catch (error) {
			dispatch(onLogout(""))
		}
	}

	const checkAuthToken = async () => {
		const token = localStorage.getItem("access-token")
		const user = localStorage.getItem("user")
		if (token && user) {
			// await loginUser({ email: user.email, password: user.password })
		} else {
			localStorage.setItem("access-token", "")
			dispatch(onLogout(""))
		}
	}

	return {
		// Properties
		isAuth,
		errorAuth,
		successMessage,
		user,
		// Methods
		loginUser,
		signupUser,
		logoutUser,
		getUser,
		checkAuthToken,
	}
}
