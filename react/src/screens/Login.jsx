//

import { Link, Navigate } from "react-router-dom"
import { useAuthStore, useForm } from "../hooks"
import { Input } from "../components/form/Input"

const formFields = {
	email: "",
	password: "",
}

export const Login = () => {
	const { email, password, onInputChange } = useForm(formFields)
	const { isAuth, errorAuth, loginUser } = useAuthStore()

	const submitHandler = async (e) => {
		e.preventDefault()

		loginUser({ email, password })
	}

	return (
		<main className="bg-gray-50 dark:bg-gray-900 h-[100%]">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[100%] lg:py-0 h-full">
				<Link
					to="/"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<img
						className="w-8 h-8 mr-2"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
						alt="logo"
					/>
					MeetingPeople
				</Link>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Log in to your account
						</h1>
						<form className="space-y-4 md:space-y-6" action="#" onSubmit={submitHandler}>
							<Input
								onInputChange={onInputChange}
								type="email"
								id="login-email"
								placeholder="name@company.com"
								labelText="Your email"
							/>
							<Input
								onInputChange={onInputChange}
								type="password"
								id="login-password"
								placeholder="••••••••"
								labelText="Your password"
							/>

							<div className="text-red-600">{errorAuth}</div>
							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-slate-700 hover:bg-slate-600"
							>
								Log in
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								{`Don't have an account yet? `}
								<Link
									to="/signup"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Sign up
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</main>
	)
}
