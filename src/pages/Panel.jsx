import { Outlet, useNavigate } from "react-router"
import NavCards from "../PanelComponents/NavCard"
import images from "../images"
import { useState } from "react"
import UploadFile from "../PanelComponents/UploadFile"
import PopUp from "../components/PopUp"
import database from "../database"
import { useDispatch, useSelector } from "react-redux"
import ErrorPage from "./ErrorPage"
import { Link } from "react-router-dom"
import AlertBox from "../components/AlertBox"
import authService from "../auth"
import { isLogIn, userInfo } from "../store/slice"

const Panel = ({ navigation = [] }) => {
    const date = new Date()
    const [time, setTime] = useState("")
    const [alert, setAlert] = useState("")
    const [popup, setPopup] = useState("")

    const currentUserInfo = useSelector(state => state.currentUserInfo)
    const isAuthorised = useSelector(state => state.isUserLogin)


    const navigate = useNavigate()
    const dispatch = useDispatch()


    setInterval(() => (() => {
        const date = new Date()
        setTime(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
    })(), 1000)
    //logout button 
    const logoutEventHandeler = async () => {
        setAlert(<AlertBox massege={"process"} image={images.process}></AlertBox>)
        await authService.logout()
        dispatch(userInfo(null))
        dispatch(isLogIn(false))

        setAlert(<AlertBox massege={"succesfully logout"} image={images.success}></AlertBox>)
        setTimeout(() => {
            navigate("/")
        }, 800);

    }

    //profile pic upload
    const profilePicUpload = async () => {
        setPopup(<PopUp close_btn={() => setPopup("")}> <UploadFile title={"upload profile pic"} uploadTo={(res) => database.uploadProfilePic(res)} fname={() => setPopup("")}></UploadFile> </PopUp>)
    }
    //checking user login or not 
    if ((currentUserInfo == null || currentUserInfo == {} || currentUserInfo) && isAuthorised != true) {

        return <ErrorPage title="unauthorised entry " descrption="access decliend"><Link to={"/login"}> go to login  </Link> </ErrorPage>
    }

    else if (isAuthorised) {
        return (
            <section className="w-full flex h-screen border-4 flex-row flex-nowrap">
                {/* side nav */}
                <div className="relative top-0 bottom-0 left-0 right-0 flex h-full flex-col w-80  border-4 border-gray-800 ">
                    {/* userProfileBox */}
                    <div>
                        {/* profile data */}
                        <div className="flex flex-row flex-nowrap pt-5 border-b-slate-600  justify-around ">
                            <div className="flex flex-col items-center">
                                <img onClick={profilePicUpload} src={images.user} alt="user" className=" rounded-full size-36" />

                                {/* print user information */}
                                <div>
                                    <p className="text-center font-serif text-sm ">{currentUserInfo.name}</p>
                                    <p className="text-center font-serif text-sm ">{currentUserInfo.email}</p>
                                    <p className="text-center font-serif text-sm ">{currentUserInfo.phone}</p>
                                </div>
                            </div>

                            {/* user social media */}
                            <div className="flex text-green-700 flex-col justify-center items-center gap-4  text-2xl">
                                <i className="fa fa-whatsapp" />
                                <i className="fa fa-facebook" />
                                <i className="fa fa-envelope" />
                                <i className="fa fa-instagram" />

                            </div>
                        </div>
                    </div>
                    {/* navigation cards */}
                    <div className="flex flex-col gap-2">
                        {navigation.map((card) => <NavCards title={card.title} icon={card.icon} color={card.color} isActiveClassName={card.activeClassName} navigateTo={card.id} />)}
                    </div>
                </div>
                {/* remaining space */}
                <div className="w-screen  flex flex-col">
                    {/* top, date time*/}

                    <div className=" flex items-center justify-between h-12 bg-green-700 text-white px-10  w-full " >
                        <p className="flex flex-row text-nowrap">
                            <p className="mx-4 font-sans font-bold "><i className="fa fa-calendar"></i> {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</p>
                            <p className=" font-sans font-bold "><i className="fa fa-clock-o"></i> {time}</p>
                        </p>
                        <p className="mx-4 font-sans text-nowrap ">WELCOME {String(currentUserInfo.name)}</p>
                        <p className="flex flex-row text-nowrap">
                            <p className="mx-4 font-sans font-bold " onClick={() => logoutEventHandeler()}><i className="fa fa-sign-out"></i></p>
                        </p>
                    </div>


                    {/* showing elements */}
                    <div className=" border-2 overflow-auto">
                        <Outlet />
                    </div>
                </div>
                
                {/*  for pop up */}
                <div>
                    {alert}
                    {popup}
                </div>
            </section >
        )
    }
}
export default Panel