import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import PopUp from "../components/PopUp"
import { useSelector } from "react-redux"

const Home = () => {
    const [showAlert, setShowAlert] = useState("")
    

    return (
        <div>
            <Header />
            <div className="w-full h-screen flex flex-wrap gap-2 justify-around items-center text-4xl text-center">
                <div onClick={() => setShowAlert()} className="h-52 w-52 bg-green-600 flex rounded-lg text-white hover:bg-green-800 cursor-pointer  justify-center items-center">
                    < p className="m-auto"> LogIn</p>
                </div>
                <div onClick={() => setShowAlert(<PopUp title="" />)} className="h-52 w-52 bg-green-600 flex rounded-lg text-white hover:bg-green-800 cursor-pointer  justify-center items-center">
                    SignUp
                </div>
            </div>
            <Footer />
            {showAlert}
        </div>
    )
}
export default Home