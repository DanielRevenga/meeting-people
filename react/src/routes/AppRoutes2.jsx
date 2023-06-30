import { Routes, Route, Navigate } from "react-router-dom"
import { MainNavBar } from "../components/layout/MainNavBar"
import { Login } from "../screens/Login"
import { SignUp } from "../screens/SignUp"
import { Home } from "../screens/Home"
import { useEffect } from "react"
import { useAuthStore } from "../hooks"

export const AppRoutes = () => {
	const { isAuth, getUser } = useAuthStore()
	useEffect(() => {
		;(async () => {
			getUser()
		})()
	}, [])

	return (
		<>
			<MainNavBar />

			<div className="pt-[100px] dark:bg-gray-900 h-[100%] min-h-[100vh]">
				{isAuth === "loading" ? (
					<div></div>
				) : (
					<Routes>
						{isAuth === "isNotAuth" ? (
							<>
								<Route path="/login" element={<Login />} />
								<Route path="/signup" element={<SignUp />} />

								<Route path="/*" element={<Navigate to="/login" />} />
							</>
						) : (
							<>
								<Route exact path="/" element={<Home />} />
								<Route path="/*" element={<Navigate to="/home" />} />
							</>
						)}
					</Routes>
				)}
			</div>

			{/* <Footer /> */}
		</>
	)
}
