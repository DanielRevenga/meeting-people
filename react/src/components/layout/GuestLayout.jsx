//

import { Navigate, Outlet } from "react-router-dom"
import { MainNavBar } from "./MainNavBar"
import { useAuthStore } from "../../hooks"

// import { useAuthStore } from "../../hooks"

export const GuestLayout = () => {
	const { isAuth } = useAuthStore()

	if (isAuth === "isAuth") return <Navigate to="/user-dashboard" />

	return (
		<div className="pt-[100px] dark:bg-gray-900 h-[100%] min-h-[100vh]">
			<MainNavBar />

			<Outlet />
		</div>
	)
}
