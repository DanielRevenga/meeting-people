import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes/AppRoutes2"
import { Provider } from "react-redux"
import { store } from "./store"
import Echo from "laravel-echo"
import Pusher from "pusher-js"

export const App = () => {
	// window.Pusher = Pusher
	// Pusher.logToConsole = true

	// window.Echo = new Echo({
	// 	broadcaster: "pusher",
	// 	key: "LNMkOtgYL5sE0IM",
	// 	cluster: "mt1",
	// 	wsHost: "127.0.0.1",
	// 	authEndpoint: "http://127.0.0.1/broadcasting/auth",
	// 	wsPort: 6001,
	// 	forceTLS: false,
	// 	disableStats: true,
	// })

	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<AppRoutes />
				</BrowserRouter>
			</Provider>
		</>
	)
}
