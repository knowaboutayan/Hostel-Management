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
    emailVerification:false,
    phoneVerification:false,
    totalDebit:0,
    totalCredit:0,

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
                    state.phoneVerification = recivedData.phoneVerification
                    state.emailVerification = recivedData.emailVerification
                }

                else {
                    state.userStatus = 'no-user'
                    state.userName = "untitled"
                    state.userId = "0000"
                    state.emailVerification = false
                    state.phoneVerification = false
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
            },
            setTotalDebit:(state,action)=>{

                state.totalDebit = action.payload
            },
            setTotalCredit:(state,action)=>{
                state.totalCredit=action.payload

            }
            
        }
    }
)
export const { isLogIn, userInfo, haveProfilePic, setProfilePicFile, setDataUpdate,setTotalCredit,setTotalDebit } = authenication.actions
export default authenication.reducer