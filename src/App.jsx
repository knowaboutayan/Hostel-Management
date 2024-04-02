
import { Outlet, Route, Router, Routes, useNavigate } from 'react-router'
import './App.css'
import {  useDispatch } from 'react-redux'

import authService from './auth'
import database from './database'
import { isLogIn, setProfilePicFile, userInfo } from './store/slice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    async function checkCurrentUser() {
        try {
            const data = await authService.getCurrentUser()
            
            console.log(data);
            if (data.$id != '') {
                const profilePic = await database.getProfilePic(data.$id)
                dispatch(userInfo(data))
                dispatch(isLogIn(true))
                dispatch(setProfilePicFile(profilePic))
  
            }
  
            else {
                dispatch(userInfo(null))
                dispatch(isLogIn(false))
  
            }
        }
        catch (error) {
            dispatch(userInfo(null))
            dispatch(false)
  
        }
  
    }
    checkCurrentUser()
  }, [])
  
  return (
    <>

      
        <div className=' box-border overflow-auto w-screen h-screen '>
          <Outlet />
        </div>

      

    </>
  )
}

export default App
