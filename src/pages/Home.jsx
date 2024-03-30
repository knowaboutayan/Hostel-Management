import { useEffect, useState } from "react"
import MembersAdd from "../PanelComponents/MembersAdd"
import NoDataFound from "../PanelComponents/NoDataFound"
import authService from "../auth"
import Footer from "../components/Footer"
import Header from "../components/Header"
import alert from "../components/allAlerts"
import { useDispatch } from "react-redux"
import { isLogIn, userInfo } from "../store/slice"

const Home = () => {
    const [showAlert, setShowAlert] = useState("")

    const dispatch = useDispatch()

    const currentUserLogin = async () => {//checking for current user
        
        try {
            const data = await authService.getCurrentUser('')
         
            if (data != 1) {
               
                dispatch(userInfo(data))
                dispatch(isLogIn(true))
            }
            else {


                dispatch(isLogIn(false))
            }

        }

        catch (err) {
            

        }
    }

    useEffect(() => (async () => {
        setShowAlert(alert.processing)
        await currentUserLogin()
        setShowAlert("")
    }))

    return (
        <div>
            <Header />
            <NoDataFound />
            <MembersAdd />
            <Footer />
            {showAlert}
        </div>
    )
}
export default Home