import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUserInfo: null,
    isUserLogin: false
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
                console.log("slice::",action.payload)
                state.currentUserInfo = action.payload
            },

        }
    }
)
export const { isLogIn, userInfo } = authenication.actions
export default authenication.reducer