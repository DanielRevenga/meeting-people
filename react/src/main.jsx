import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/AppRoutes.jsx"
import { Provider } from "react-redux"
import { store } from "./store/store.js"
import "./index.css"
import { App } from "./App.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
