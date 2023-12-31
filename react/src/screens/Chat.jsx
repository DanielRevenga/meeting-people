//

import { useEffect, useRef, useState } from "react"
import { chatAPI } from "../api"
import { MessageBox } from "../components/general/MessageBox"
import { formatDate } from "../helpers"
import Echo from "laravel-echo"
import Pusher from "pusher-js"
import { useAuthStore } from "../hooks"
import chatApi from "../api/chatApi"
import { useParams } from "react-router-dom"

// const chatId = 1
// let echo

export const Chat = () => {
	const [textMsg, setTextMsg] = useState("ddd")
	const [messages, setMessages] = useState([])
	const [chatUsers, setChatUsers] = useState([])
	const [chatId, setChatId] = useState(0)
	const [chatOtherUser, setChatOtherUser] = useState(null)
	const { user } = useAuthStore()
	const { id: otherUserId } = useParams()
	const [loading, setLoading] = useState(true)
	const [isOnline, setIsOnline] = useState(false)

	useEffect(() => {
		chatApi
			.get(`/chat/with/${otherUserId}`)
			.then(({ data }) => {
				const { chat } = data
				// const { chat, chatUsers } = data
				setChatId(chat.id)
				// setChatUsers(chatUsers)
				// setChatOtherUser(chatUsers[0])
			})
			.catch((err) => {
				console.log(err)
			})
	}, [otherUserId])

	useEffect(() => {
		if (chatId == 0) return
		const token = localStorage.getItem("access-token")
		// Pusher.logToConsole = true
		window.Pusher = Pusher

		window.Echo = new Echo({
			broadcaster: "pusher",
			key: "LNMkOtgYL5sE0IM",
			cluster: "mt1",
			authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
			auth: {
				headers: { Authorization: "Bearer " + token },
			},
			// authEndpoint: "http://127.0.0.1:8000/api/login?email=trajann%40gmail.com&password=123456",
			wsHost: "127.0.0.1",
			wsPort: 6001,
			forceTLS: false,
			enabledTransports: ["ws"],
			disableStats: true,
		})

		window.Echo.join(`chat.${chatId}`)
			.listen(".messagesent", (e) => {
				const { message } = e
				const { content, created_at, user: eventUser } = message

				if (eventUser.id !== user.id) {
					setMessages((lastMessages) => {
						return [
							...lastMessages,
							{
								content,
								myMsg: false,
								name: eventUser.name,
								createdAt: formatDate(created_at),
							},
						]
					})
				}
				//  appendMessage(e.user.name, PERSON_IMG, "left", e.message.content);
			})
			.here((listeningUsers) => {
				const filteredUsers = listeningUsers.filter(
					(listeningUser) => listeningUser.id !== user.id
				)
				if (filteredUsers.length > 0) setIsOnline(true)
			})
			.joining((joiningUser) => {
				if (joiningUser.id != user.id) setIsOnline(true)
			})
			.leaving((leavingUser) => {
				if (leavingUser.id != user.id) setIsOnline(false)
			})
	}, [chatId])

	useEffect(() => {
		if (chatId == 0) return
		chatApi
			.get(`/chat/${chatId}/get_users`)
			.then((response) => {
				const { users } = response.data
				if (users.length > 0) {
					setChatOtherUser(users[0])
					const anotherUser = users.filter((another) => another.id !== user.id)
					setChatOtherUser(anotherUser[0])
				}
			})
			.then(() => {
				chatApi.get(`/chat/${chatId}/get_messages`).then(({ data }) => {
					const { messages } = data
					const chatMessages = messages.map(
						({ content, user: chatUser, user_id, created_at }) => {
							return {
								content: content,
								myMsg: user_id === user.id,
								name: user_id === user.id ? user.name : chatUser.name,
								createdAt: formatDate(created_at),
							}
						}
					)
					setMessages(chatMessages)
					setLoading(false)
				})
			})
	}, [chatId])

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const submitMsgHandler = async (e) => {
		e.preventDefault()

		try {
			const { data } = await chatAPI.post("/messages", {
				chat_id: chatId,
				content: textMsg,
				// user_id: 2,
			})
			const { messageCreated } = data
			const { content, user, created_at } = messageCreated

			setMessages((lastMessages) => {
				return [
					...lastMessages,
					{
						content,
						myMsg: true,
						name: user?.name ?? "delete",
						createdAt: formatDate(created_at),
					},
				]
			})
		} catch (error) {
			console.log(error)
		}
		scrollToBottom()
		setTextMsg("")
	}

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	const writeMsgHandler = (e) => {
		setTextMsg(e.target.value)
	}

	const messagesEndRef = useRef(null)

	if (loading) return <div>Loading...</div>

	return (
		<section className="px-12 flex flex-col justify-between h-full md:px-[22vw]">
			<main className="h-full">
				<header className="mb-6 ml-1 flex justify-between items-center">
					<div className="text-[1.4rem] border border-transparent border-b-blue-600 rounded-[6px] px-4 py-2">
						{chatOtherUser && chatOtherUser.name}
					</div>
					<div>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
								fill={isOnline ? "#3dd362" : "#ff0000"}
							/>
						</svg>
					</div>
				</header>
				<div
					id="chat-main-chat"
					className="overflow-auto min-h-[60vh]  max-h-[60vh] h-[80%] block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					{messages.map(({ content, name, myMsg, createdAt }, index) => {
						const color = myMsg ? "blue" : "green"
						const side = myMsg ? "right" : "left"

						return (
							<MessageBox
								key={`message_2_${index}`}
								content={content}
								color={color}
								side={side}
								createdAt={createdAt}
								name={name}
							/>
						)
					})}
					<div ref={messagesEndRef} />
				</div>
			</main>

			<footer className="w-full mb-14 h-[15%]">
				<form onSubmit={submitMsgHandler} className=" h-full">
					<div className="flex items-center px-4 py-2 rounded-lg bg-gray-50 h-full dark:bg-gray-700">
						<textarea
							id="chat"
							rows="2"
							className="block mr-4 p-2.5 w-full text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-700 resize-none outline-none focus:outline-blue-600"
							placeholder="Your message..."
							onChange={writeMsgHandler}
							value={textMsg}
						></textarea>
						<button
							type="submit"
							className="md:border md:p-2.5 py-4 px-4 md:border-slate-500 inline-flex justify-center rounded-lg hover:rounded-full md:hover:rounded-lg hover:text-blue-700 hover:bg-gray-500 md:hover:bg-blue-500 md:bg-blue-600 text-blue-600 cursor-pointer md:px-10"
						>
							<svg
								aria-hidden="true"
								className="w-6 h-6 rotate-90 md:hidden"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
							</svg>
							<div className="hidden md:block text-white font-bold p-2 rounded-lg">Send</div>
						</button>
					</div>
				</form>
			</footer>
		</section>
	)
}
