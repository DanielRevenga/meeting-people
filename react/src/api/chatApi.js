import axios from "axios"
import { getEnvVariables } from "../helpers"

const { VITE_API_URL } = getEnvVariables()
const chatApi = axios.create({
	baseURL: VITE_API_URL,
	// withCredentials: true,
	credentials: "include",
})

chatApi.interceptors.request.use((config) => {
	const token = localStorage.getItem("access-token")

	config.headers.Authorization = `Bearer ${token}`

	return config
})

// chatApi.interceptors.response.use(
// 	(response) => {
// 		return response
// 	},
// 	({ response }) => {
// 		if (response.status === 401) {
// 			localStorage.removeItem("access-token")
// 			window.location.href = "/login"
// 		} else {
// 			console.log(response)
// 		}

// 		throw response
// 	}
// )

export default chatApi
