import { Routes, Route, Navigate, createBrowserRouter } from "react-router-dom"
import { MainNavBar } from "../components/layout/MainNavBar"
import { Login } from "../screens/Login"
import { SignUp } from "../screens/SignUp"
import { Home } from "../screens/Home"
import { useEffect } from "react"
import { useAuthStore } from "../hooks"
import { Chat } from "../screens/Chat"
import { NotFound } from "../screens/NotFound"
import { GuestLayout } from "../components/layout/GuestLayout"
import { AuthLayout } from "../components/layout/AuthLayout"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <GuestLayout />,
		children: [
			{
				path: "/",
				element: <Navigate to="/login" />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
		],
	},

	{
		path: "/",
		element: <AuthLayout />,
		children: [
			{
				path: "/chat",
				element: <Chat />,
			},
		],
	},

	{
		path: "/*",
		element: <NotFound />,
	},
])
