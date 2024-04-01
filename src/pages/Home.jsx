import { useEffect, useState } from "react"
import MembersAdd from "../PanelComponents/MembersAdd"
import NoDataFound from "../PanelComponents/NoDataFound"
import authService from "../auth"
import Footer from "../components/Footer"
import Header from "../components/Header"
import alert from "../components/allAlerts"
import { useDispatch, useSelector } from "react-redux"
import { isLogIn, userInfo } from "../store/slice"
import Login from "./Login"
import AlertBox from "../components/AlertBox"
import database from "../database"

const Home = () => {
    const [showAlert, setShowAlert] = useState("")

    const dispatch = useDispatch()
    const isLogin = useSelector(state=>state.isUserLogin)

    const currentUserLogin = async () => {//checking for current user
        
        try {
            const data = await authService.getCurrentUser('')
         
            if (data.$id!= "") {
               
                dispatch(userInfo(data))
                dispatch(isLogIn(true))
                
            }
            else {
                dispatch(isLogIn(false))
                await authService.logout()

            }
            

        }

        catch (err) {

            dispatch(isLogIn(false))

        }
        finally{
            setShowAlert("")
        }
    }

    useEffect(() => (async () => {
        setShowAlert(alert.processing)
         await currentUserLogin()
    
    
        
    }),[isLogIn])

    return (
        <div>
            <Header />
            <div className="w-full h-screen flex justify-around items-center text-4xl text-center">
            <div onClick={()=>setShowAlert(<Login/>)} className="h-52 w-52 bg-green-600 flex rounded-lg text-white hover:bg-green-800 cursor-pointer  justify-center items-center">
               < p className="m-auto"> UserLogIn</p>
           </div>
           <div  onClick={()=>setShowAlert(<MembersAdd/>)} className="h-52 w-52 bg-green-600 flex rounded-lg text-white hover:bg-green-800 cursor-pointer  justify-center items-center">
                SignUp
           </div>
           </div>
            <Footer />
            {showAlert}
        </div>
    )
}
export default Home