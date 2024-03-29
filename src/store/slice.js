import { createSlice } from "@reduxjs/toolkit"
import images from "../images"

let initialState = {

    currentUserInfo: null,
    isUserLogin: false,
    userStatus: "no-user",
    userName: "untitled",
    userId: "0000",
    userHaveProfilePic: false,
    profilePicFile: images.user,
    update: 0,

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
                if (recivedData !== null) {
                    state.userStatus = recivedData['labels'][0]
                    state.userName = recivedData['name']
                    state.userId = recivedData['$id']
                }
                else {
                    state.userStatus = 'no-user'
                    state.userName = "untitled"
                    state.userId = "0000"
                }
                console.log(state.userId)


            },

            haveProfilePic: (state, action) => {
                state.userHaveProfilePic = action.payload

            },
            setProfilePicFile: (state, action) => {
                console.log(action.payload)
                state.profilePicFile = action.payload
            },
            setDataUpdate: (state, action) => {
                state.update = action.payload
            }




        }
    }
)
export const { isLogIn, userInfo, haveProfilePic, setProfilePicFile, setDataUpdate } = authenication.actions
export default authenication.reducer