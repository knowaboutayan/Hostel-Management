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
               
                const recivedData = action.payload
        
                if (recivedData !== null) {
                    state.currentUserInfo = recivedData
                    state.userStatus = recivedData['labels'][0]
                    state.userName = recivedData['name']
                    state.userId = recivedData['$id']
                }

                else {
                    state.userStatus = 'no-user'
                    state.userName = "untitled"
                    state.userId = "0000"
                }
             


            },

            haveProfilePic: (state, action) => {
                state.userHaveProfilePic = action.payload

            },
            setProfilePicFile: (state, action) => {
                
                state.profilePicFile = action.payload
                state. userHaveProfilePic=true
            },
            
            setDataUpdate: (state, action) => {
                state.update = action.payload
            }




        }
    }
)
export const { isLogIn, userInfo, haveProfilePic, setProfilePicFile, setDataUpdate } = authenication.actions
export default authenication.reducer