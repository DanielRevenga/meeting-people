import { useEffect, useState } from "react"
import { chatAPI } from "../api"
import { UserCard } from "../components/general/UserCard"
import { AvatarGenerator } from "random-avatar-generator"
import { useAuthStore } from "../hooks"

const generator = new AvatarGenerator()

export const UserDashboard = () => {
	const [users, setUsers] = useState([])
	const { user } = useAuthStore()

	useEffect(() => {
		chatAPI.get("/users").then(({ data }) => {
			const { users } = data
			setUsers(users)
		})
	}, [])

	return (
		<>
			<div className="flex justify-center flex-wrap overflow-auto max-h-[85vh] items-center gap-3">
				{users &&
					!!users.length &&
					users
						.filter((listUser) => listUser.role !== user.role)
						.map(({ id, name, role, email }) => {
							const key = `${id}_${name}`
							const avatar = generator.generateRandomAvatar(key)

							return (
								<div key={key} className="w-full flex justify-center">
									<UserCard
										name={name}
										email={email}
										role={role}
										avatar={avatar}
										userCardId={id}
									/>
								</div>
							)
						})}
			</div>
		</>
	)
}
