import { useEffect } from "react"
import { useAuthStore } from "./hooks"
import { store } from "./store"
import { router } from "./routes/AppRoutes"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"

export const App = () => {
	const { checkAuthToken } = useAuthStore()

	useEffect(() => {
		checkAuthToken()
	}, [])

	return (
		// <Provider store={store}>
		<RouterProvider router={router} />
		// </Provider>
	)
}
