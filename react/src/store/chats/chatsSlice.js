import { createSlice } from "@reduxjs/toolkit"

// chat example:
// {
//    id: 1,
//    id_user_1: 1,
//    id_user_2: 2,
//    messages: [ // order by date
//       {
//          id: 1,
//          id_user: 1,
//          content: "Hello",
//          sending_date: "2021-08-01 12:00:00",

//       },
//       {
//          id: 1,
//          id_user: 2,
//          content: "Bye",
//          sending_date: "2021-08-01 12:00:01",
//       },
// }
export const authSlice = createSlice({
	name: "chats",
	initialState: {
		chats: [],
	},
	reducers: {
		onAddChat: (state) => {
			state.isAuth = true
		},
		onAddUserMessage: (state) => {
			state.isAuth = false
		},
		onAddNotUserMessage: (state) => {
			state.isAuth = false
		},
		onSetActiveChat: (state) => {
			state.isAuth = false
		},
	},
})

export const { onLogin, onLogout } = authSlice.actions
