//

import { Navigate, Outlet } from "react-router-dom"
import { MainNavBar } from "./MainNavBar"
import { useAuthStore } from "../../hooks"

export const AuthLayout = () => {
	const { isAuth } = useAuthStore()

	if (isAuth !== "isAuth") return <Navigate to="/login" />

	return (
		<div className="pt-[100px] dark:bg-gray-900 h-[100%] min-h-[100vh]">
			<MainNavBar />

			<Outlet />
		</div>
	)
}
