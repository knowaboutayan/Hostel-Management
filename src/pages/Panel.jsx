import { Outlet, useNavigate } from "react-router"
import NavCards from "../PanelComponents/NavCard"
import images from "../images"
import { useEffect, useState } from "react"
import UploadFile from "../PanelComponents/UploadFile"
import PopUp from "../components/PopUp"
import database from "../database"
import { useDispatch, useSelector } from "react-redux"
import ErrorPage from "./ErrorPage"
import { Link, NavLink } from "react-router-dom"
import AlertBox from "../components/AlertBox"
import authService from "../auth"
import { isLogIn, userInfo } from "../store/slice"
import Button from "../components/Button"
import Login from "./Login"
import PanelSectionTitle from "../PanelComponents/PanelSectionTitle"

const Panel = ({ navigation = [] }) => {
    const date = new Date()
    const [time, setTime] = useState("")
    const [alert, setAlert] = useState("")
    const [popup, setPopup] = useState("")
    const [title, setTitle] = useState("Dashboard")
    const [image, setImage] = useState(images.dashboard)


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentUserInfo = useSelector(state => state.currentUserInfo)
    const isAuthorised = useSelector(state => state.isUserLogin)


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
        setPopup(<PopUp title="Upload Profile Pictute" icon={images.imageupload} close_btn={() => setPopup("")}> <UploadFile title={"upload profile pic"} uploadTo={(res) => database.uploadProfilePic(res)} fname={() => setPopup("")}></UploadFile> </PopUp>)
    }
    //checking user login or not 
    if ((currentUserInfo == null || currentUserInfo == {} || currentUserInfo) && isAuthorised != true) {
        
        dispatch(userInfo(null))
        dispatch(isLogIn(false))
        return (<ErrorPage title="unauthorised entry " descrption="access decliend">
            <Button text="" type="button" fname={()=>navigate(`/`)}>
                <i className="fa fa-sign-in" />Go to Home</Button>
            {popup}
        </ErrorPage>
        )
    }


    else if (isAuthorised&&currentUserInfo != null || currentUserInfo != {}) {
        return (
            <section>
                <section className=" grid grid-cols-4  overflow-auto flex-col flex-nowrap">

                    {/* top, date time*/}
                    <div className="md:flex col-span-4 flex justify-around items-center bg-green-800 text-gray-200 text-lg flex-wrap " >
                        <p className="flex flex-row text-nowrap">
                            <p className="mx-4 font-sans font-bold "><i className="fa fa-calendar"></i> {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</p>
                            <p className=" font-sans font-bold "><i className="fa fa-clock-o"></i> {time}</p>
                        </p>
                        <p className="mx-4 font-sans text-nowrap "> {String(currentUserInfo['$id'])}</p>
                        <p className="flex flex-row text-nowrap">
                            <p className="mx-4 font-sans font-bold " onClick={() => logoutEventHandeler()}><i className="fa fa-sign-out"></i></p>
                        </p>
                    </div>



                    {/* side nav */}
                    <div className="  md:col-span-1 md:col-span-0  md: bg-stone-200-50  border-2 md:border-r-0 md:static 
                md:h-auto md:w-full md:z-0 md:block
                relative w-72 h-screen  z-10 hidden overflow-auto ">
                        {/* userProfileBox */}
                        <div className="bg-gray-50 break-words text-wrap " >

                            {/* profile data */}
                            <div className="flex flex-row flex-nowrap pt-2 px-3   justify-around ">
                                <div className="flex flex-col items-center text-lg font-bold text-green-800">
                                    <img onClick={profilePicUpload} src={images.user} alt="user" className=" rounded-full size-36" />

                                    {/* print user information */}
                                    <div>
                                        <p className="text-center font-serif  ">{currentUserInfo.name}</p>
                                        <p className="text-center font-serif text-sm font-light">{currentUserInfo.email}</p>
                                        <p className="text-center font-serif text-sm font-semibold ">{currentUserInfo.phone}</p>
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
                        <div className={`flex flex-col gap-1 overflow-auto `} >
                            {navigation.map((card) => <NavCards title={card.title} icon={card.icon} color={card.color} isActiveClassName={card.activeClassName} navigateTo={card.id} changeStatus={() => { setImage(card.icon); setTitle(card.title) }} />)}
                        </div>
                    </div>

                    {/* remaining space */}
                    <div className=" md:col-span-3 col-span-4  ">
                        {/* showing elements */}
                        <div className="    ">

                            <div className="border   ">
                                <PanelSectionTitle title={title} image={image} />
                            </div>
                            <div className=" w-auto overflow-auto  min-w-320 h-full">
                                <Outlet />
                            </div>
                        </div>
                    </div>


                </section>
                {/* bottom nav */}
                <div className="md:hidden  fixed py-2  bg-green-700 w-screen min-w-80 bottom-0">
                    <div className=" flex flex-row box-border justify-around" >
                        {navigation.map((card) => <NavLink to={`${card.id}`} className={({ isActive }) => ` w-12 hover:cursor-pointer shadow-lg   p-2 rounded-full 
                        hover:shadow-black transition-all
                        
                         ${isActive ? "animate-pulse animate-once bg-green-300 border-8 border-gray-50  shadow-black -translate-y-6 " : " animate-jump translate-y-0 bg-green-50 "}  `} onClick={() => { setImage(card.icon); setTitle(card.title) }}>

                            <img src={card.icon} />


                        </NavLink>

                        )}
                    </div>

                </div>
                {/*  for pop up */}
                <div>
                    {alert}
                    {popup}
                </div>
            </section>
        )
    }
}
export default Panel