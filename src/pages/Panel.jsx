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
import { isLogIn, haveProfilePic, userInfo, setProfilePicFile, setDataUpdate } from "../store/slice"
import Button from "../components/Button"
import PanelSectionTitle from "../PanelComponents/PanelSectionTitle"
import allAlerts from '../components/allAlerts'
import UserProfile from "../PanelComponents/UserProfile"
const Panel = ({ navigation = [] }) => {
    const date = new Date()
    const [time, setTime] = useState("")
    const [alert, setAlert] = useState("")
    const [popup, setPopup] = useState("")
    const [title, setTitle] = useState("Dashboard")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const profileImage = useSelector(state => state.profilePicFile)
    const isProfilePic = useSelector(state => state.userHaveProfilePic)

    const currentUserInfo = useSelector(state => state.currentUserInfo)
    const [succesful, setSuccessStatus] = useState(false)
    const currentUserStatus = useSelector(state => state.userStatus)
    const [panelLogo, setPanelLogo] = useState(images.dashboard)


    let updated = useSelector(state => state.update)

    //logout button 
    const logoutEventHandeler = async () => {
        setAlert(<AlertBox massege={"process"} image={images.process}></AlertBox>)
        await authService.logout()
        setAlert(<AlertBox massege={"succesfully logout"} image={images.success}></AlertBox>)
        localStorage.clear()
        sessionStorage.clear()

        setTimeout(() => {
            dispatch(userInfo(null))
            dispatch(isLogIn(false))
            dispatch(haveProfilePic(false))
            navigate("/")
        }, 2000)
    }

    //profile pic upload
    const profilePicUpload = async () => {

        setPopup(
            <PopUp title="Upload Profile Pictute" icon={images.imageupload} close_btn={() => setPopup("")}>

                <UploadFile uploadTo={(res) => database.uploadProfilePic(res)} successfulStatus={() => { setPopup(""); setSuccessStatus(pre => !pre) }}>
                </UploadFile>
            </PopUp>

        )

    }

    //show user Info 
    const showUserInfo = () => {
        setPopup(<PopUp icon={profileImage} title={"Your Profile"} close_btn={() => setPopup("")}><UserProfile fname={() => { setPopup(""); logoutEventHandeler() }} /></PopUp>)
    }


    useEffect(() => {
        (async () => {
            try {

                setAlert(allAlerts.processing);
                const data = await database.getProfilePic(currentUserId);

                if (data === 1) {

                    dispatch(haveProfilePic(false)); // Updating no profile pic
                } else if (data && data.href) {
                    console.log(data);
                    window.localStorage.setItem('imgHref', data.href)
                    dispatch(setProfilePicFile(data.href)); // Have profile pic
                    dispatch(haveProfilePic(true));

                } else {
                    console.error("Invalid profile picture data:", data);

                }
            } catch (error) {
                console.error("Error fetching profile picture:", error);
                // Handle error (e.g., display error message)
            } finally {
                setAlert("");

            }
        })();
    }, [succesful]);


    useEffect(() => {
        (async () => {

            const data = await authService.getCurrentUser()
            setInterval(() => (() => {
                const date = new Date()
                setTime(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
            })(), 1000)
            dispatch(userInfo(data))
            dispatch(isLogIn(true))
        })()
    }, [])

    const isUserLogin = useSelector(state => state.isUserLogin)
    const currentUserId = useSelector(state => state.userId)


    //checking user login or not 
    return (
        (isUserLogin) ?
            <section>
                <section className=" grid h-screen grid-cols-4  overflow-auto flex-col flex-nowrap">

                    {/* top, date time user status*/}
                    <div className="md:flex  w-100    col-span-4  md:justify-between hidden z-30 md:sticky top-0  left-0 right-0 items-center bg-green-800 text-gray-200 text-lg flex-wrap " >
                        <p className="flex flex-row text-nowrap">
                          
                            <p className="mx-4 font-sans font-bold "><i className="fa fa-calendar"></i> {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</p>
                            <p className=" font-sans font-bold "><i className="fa fa-clock-o"></i> {time}</p>
                        </p>
                        <p className="mx-4 font-sans text-nowrap "> {String(currentUserInfo['$id'])} <span className="  rounded-xl px-1  font-bold text-lg bg-green-500 text-white">{String(currentUserStatus)[0].toUpperCase() + String(currentUserStatus).substring(1,)}</span></p>
                        <p className="flex flex-row text-nowrap">
                            <p className="mx-4 font-sans font-bold " onClick={() => logoutEventHandeler()}><i className="fa fa-sign-out"></i></p>
                        </p>
                    </div>

                    {/* side nav */}
                    <div className="fixed top-0 bottom-0 left-0 md:col-span-1  md:col-span-0  md: bg-stone-200-50   md:border-r-0 md:static 
                 md:w-full md:z-0 md:block
                 w-72   hidden overflow-hidden  ">
                        {/* side nav */}
                        <div className="md:col-span-1 md:col-span-0 md:bg-stone-200-50  md:border-r-0 md:static md:w-full md:z-0 md:block relative w-72 h-screen  z-10 hidden">
                            {/* userProfileBox */}
                            <div className="break-words text-wrap box-border h-54  shadow-lg">
                                {/* profile data */}
                                <div className="px-3 bottom-3 h-full bg-gray-100 grid text-gray-700  grid-cols-4 ">
                                    <div className="col-span-3 size-4/5 m-auto">
                                        {console.log(isProfilePic)}
                                        {/* image */}
                                        {<img onClick={profilePicUpload} src={(isProfilePic) ? profileImage : images.user} alt="user" className="rounded-full border w-full" />}
                                    </div>

                                    <div className="flex flex-nowrap flex-col col-span-1justify-center gap-6 h items-center p-5 text-3xl">
                                        <i className="fa fa-whatsapp  text-gray-600 hover:text-green-400 cursor-pointer " onClick={() => setPopup(<PopUp close_btn={() => setPopup("")} title="facebook">
                                            <iframe src="http://whatsapp.com" title="W3Schools Free Online Web Tutorials" className="h-96 w-full"></iframe>
                                        </PopUp>)} />
                                        {/* user social media */}
                                        <i className="fa fa-facebook  text-gray-600 hover:text-blue-700 cursor-pointer " />
                                        <i className="fa fa-envelope  text-gray-600 hover:text-orange-500 cursor-pointer " />
                                        <i className="fa fa-instagram  text-gray-600 hover:text-pink-700 cursor-pointer " />
                                    </div>

                                    {/* print user information */}
                                    <div className="col-span-4 border-t-4 mt-2 border-green-600 grid break-all w-full text-wrap">
                                        <p className="text-2xl font-serif font-bold hover:text-green-700 hover:cursor-pointer" onClick={showUserInfo}><i className="fa fa-user" /> {currentUserInfo.name} </p>
                                        <p className="text-xl font-light"> <i className="fa fa-envelope" /> {currentUserInfo.email} </p>
                                        <p className="text-xl font-light"> <i className="fa fa-phone" /> {currentUserInfo.phone} </p>
                                    </div>
                                </div>
                            </div>

                            {/* navigation cards */}
                            <div className={` overflow-auto h-1/2 `}>
                                <div className=" overflow-auto  flex flex-col gap-1">
                                    {navigation.map((card) => <NavCards title={card.title} icon={card.icon} color={card.color} isActiveClassName={card.activeClassName} navigateTo={card.id} changeStatus={() => { setPanelLogo(card.icon); setTitle(card.title) }} />)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* remaining space */}
                    <div className=" md:col-span-3 col-span-4   ">
                        {/* showing elements */}
                        <div className="border m-auto sticky z-10 shadow-sm top-0 ">
                            <PanelSectionTitle title={title} image={panelLogo} />
                        </div>

                        <div className="  border  w-auto overflow-auto  min-w-320 ">
                            <Outlet />

                        </div>
                    </div>


                </section>


                {/* bottom nav */}
                <div className="md:hidden  fixed py-2  bg-green-700 w-screen min-w-80 bottom-0">
                    <div className=" flex flex-row box-border justify-around" >
                        {navigation.map((card) => <NavLink to={`${card.id}`} className={({ isActive }) => ` w-12 hover:cursor-pointer shadow-lg   p-2 rounded-full 
                        hover:shadow-black transition-all
                        
                         ${isActive ? "animate-pulse animate-once bg-green-300 border-8 border-gray-50  shadow-black -translate-y-6 " : " animate-jump translate-y-0 bg-green-50 "} `} onClick={() => { setPanelLogo(card.icon); setTitle(card.title) }}>
                            <img src={card.icon} />
                        </NavLink>

                        )}
                        <NavLink to='' className={` w-12 hover:cursor-pointer shadow-lg   p-2 rounded-full 
                        hover:shadow-black transition-all `} onClick={logoutEventHandeler}>
                            <img src={images.logout} />
                        </NavLink>
                    </div>
                </div>
                {/*  for pop up */}
                <div className="">
                    {alert}
                    {popup}
                </div>
            </section>

            :

            <ErrorPage title="unauthorised entry " descrption="access decliend">
                <Button text="" type="button" fname={() => navigate(`/`)}>
                    <i className="fa fa-sign-in" />Go to Home</Button>
                {popup}
            </ErrorPage>

    )
}
export default Panel