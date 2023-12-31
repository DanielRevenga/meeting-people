//

import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useAuthStore } from "../../hooks"

const notActiveNavSrtyle =
	"block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
const activeNavSrtyle =
	"block py-2 pl-3 pr-4 rounded md:p-0 text-white bg-blue-700  md:bg-transparent md:text-blue-700  md:dark:text-blue-500"

export const MainNavBar = () => {
	const [hideMenu, setHideMenu] = useState(true)
	const { isAuth, logoutUser } = useAuthStore()

	const toggleMenuHandler = () => {
		setHideMenu(!hideMenu)
	}

	return (
		<nav className="min-h-[70px] bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 h-[7vh]">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<Link
					to={isAuth == "isAuth" ? "/user-dashboard" : "/login"}
					className="flex items-center"
				>
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="h-8 mr-3"
						alt="Flowbite Logo"
					/>
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						MeetingPeople
					</span>
				</Link>
				<div className="flex">
					<button
						data-collapse-toggle="navbar-sticky"
						type="button"
						onClick={() => toggleMenuHandler()}
						className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-sticky"
						aria-expanded="false"
					>
						<span className="sr-only">Open main menu</span>
						<svg
							className="w-6 h-6"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>
				</div>
				<div
					className={`items-center justify-between ${
						hideMenu ? "hidden" : ""
					} w-full md:flex md:w-auto md:order-1`}
					id="navbar-sticky"
				>
					<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						{isAuth === "isAuth" ? (
							<li>
								<button
									onClick={logoutUser}
									className={`${notActiveNavSrtyle} text-left w-full`}
								>
									Log out
								</button>
							</li>
						) : (
							<>
								<li>
									<NavLink
										to="/login"
										className={({ isActive }) =>
											isActive ? activeNavSrtyle : notActiveNavSrtyle
										}
									>
										Log in
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/signup"
										className={({ isActive }) =>
											isActive ? activeNavSrtyle : notActiveNavSrtyle
										}
									>
										Sign up
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	)
}
