//

import { Link, useNavigate } from "react-router-dom"
import { useAuthStore, useForm } from "../hooks"
import { Input } from "../components/form/Input"

const formFields = {
	name: "",
	email: "",
	password: "",
	role: "client",
}

export const SignUp = () => {
	const { name, email, password, role, onInputChange } = useForm(formFields)
	const { errorAuth, signupUser, successMessage } = useAuthStore()
	const navigate = useNavigate()

	const submitHandler = async (e) => {
		e.preventDefault()
		try {
			signupUser({ name, email, password, role })
		} catch (error) {
			console.log("ERROR!")
		}
		// navigate("/login")
	}

	return (
		<section className="bg-gray-50 dark:bg-gray-900 h-[100%] min-h-fit">
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
							Sign up a new account
						</h1>
						<form className="space-y-4 md:space-y-6" action="#" onSubmit={submitHandler}>
							<Input
								onInputChange={onInputChange}
								type="name"
								id="signup-name"
								placeholder="John Doe"
								labelText="Your name"
							/>
							<Input
								onInputChange={onInputChange}
								type="email"
								id="signup-email"
								placeholder="name@company.com"
								labelText="Your email"
							/>
							<Input
								onInputChange={onInputChange}
								type="password"
								id="signup-password"
								placeholder="••••••••"
								labelText="Your password"
							/>

							<div>
								<label
									htmlFor="signup-select-role"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Select your role
								</label>
								<select
									id="signup-select-role"
									className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									name="role"
									onChange={onInputChange}
								>
									<option value="client">Client</option>
									<option value="professional">Professional</option>
								</select>
							</div>
							<div className="text-red-600 whitespace-pre-line">{errorAuth}</div>
							<div className="text-green-600 whitespace-pre-line">{successMessage}</div>
							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-slate-700 hover:bg-slate-600 mt-[106px]"
							>
								Sign up
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								{`Already have an account? `}
								<Link
									to="/login"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Log in
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}
