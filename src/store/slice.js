import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    currentUserInfo: null,
    isUserLogin: false,
    userStatus: "no-user",
    userName: "untitled",
    userId: "0000"


}

const authenication = createSlice(
    {
        name: "accountStatus",
        initialState,
        reducers: {
            isLogIn: (state, action) => {

                state.isUserLogin = action.payload

            },

            userInfo: (state, action) => {
                console.log("slice::", action.payload)
                const recivedData = action.payload
                state.currentUserInfo = recivedData
                if (recivedData != null) {
                    state.userStatus = recivedData['labels'][0]
                    state.userName = recivedData['name']
                    state.userId = recivedData['email']
                }
                else {
                    state.userStatus = 'no-user'
                    state.userName = "untitled"
                    state.userId = "0000"
                }
                console.log(state.userStatus)

            },




        }
    }
)
export const { isLogIn, userInfo, setUserStatus } = authenication.actions
export default authenication.reducer