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



const Panel = ({ navigation = [] }) => {

    const date = new Date()
    const [time, setTime] = useState("")
    const [alert, setAlert] = useState("")
    const [popup, setPopup] = useState("")
    const [title, setTitle] = useState("Dashboard")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const image = useSelector(state => state.profilePicFile)

    const currentUserInfo = useSelector(state => state.currentUserInfo)
    const currentUserId = useSelector(state => state.userId)
    const isAuthorised = useSelector(state => state.isUserLogin)
    const [succesful, setSuccessStatus] = useState(false)
    const currentUserStatus = useSelector(state => state.userStatus)

    const [panelLogo, setPanelLogo] = useState(images.dashboard)

    setInterval(() => (() => {
        const date = new Date()
        setTime(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
    })(), 1000)
    let updated = useSelector(state => state.update)
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

    useEffect(() => {
        (async () => {
            setAlert(allAlerts.processing)
            const data = await database.getProfilePic(currentUserId)
            if (data == 1) {
                dispatch(haveProfilePic(false))//updating no profile pic
            } else {
                dispatch(setProfilePicFile(data.href))//have profile pic
                dispatch(haveProfilePic(true))
            }
            setAlert("")
        })()
    }, [succesful])

    //profile pic upload
    const profilePicUpload = async () => {

        setPopup(


            <PopUp title="Upload Profile Pictute" icon={images.imageupload} close_btn={() => setPopup("")}>
                <Button type="button" text="ffff" fname={() => dispatch(setDataUpdate(updated + 1))}>Update</Button>
                <UploadFile uploadTo={(res) => database.uploadProfilePic(res)} successfulStatus={() => { setPopup(""); setSuccessStatus(pre => !pre) }}>
                </UploadFile>
            </PopUp>

        )

    }


    //checking user login or not 
    if ((currentUserInfo == null || currentUserInfo == {} || currentUserInfo) && isAuthorised != true) {

        dispatch(userInfo(null))
        dispatch(isLogIn(false))
        return (<ErrorPage title="unauthorised entry " descrption="access decliend">
            <Button text="" type="button" fname={() => navigate(`/`)}>
                <i className="fa fa-sign-in" />Go to Home</Button>
            {popup}
        </ErrorPage>
        )
    }


    else if (isAuthorised && currentUserInfo != null || currentUserInfo != {}) {


        return (
            <section>
                <section className=" grid  grid-cols-4  overflow-auto flex-col flex-nowrap">

                    {/* top, date time*/}
                    <div className="md:flex  w-100    col-span-4 flex justify-around items-center bg-green-800 text-gray-200 text-lg flex-wrap " >
                        <p className="flex flex-row text-nowrap">
                            <p>
                                {updated}
                            </p>
                            <p className="mx-4 font-sans font-bold "><i className="fa fa-calendar"></i> {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</p>
                            <p className=" font-sans font-bold "><i className="fa fa-clock-o"></i> {time}</p>
                        </p>
                        <p className="mx-4 font-sans text-nowrap "> {String(currentUserInfo['$id'])} ({String(currentUserStatus)[0].toUpperCase() + String(currentUserStatus).substring(1,)})</p>
                        <p className="flex flex-row text-nowrap">
                            <p className="mx-4 font-sans font-bold " onClick={() => logoutEventHandeler()}><i className="fa fa-sign-out"></i></p>
                        </p>
                    </div>

                    {/* side nav */}
                    <div className="  md:col-span-1  md:col-span-0  md: bg-stone-200-50  border-2 md:border-r-0 md:static 
                 md:w-full md:z-0 md:block
                relative w-72 h-full  z-10 hidden  ">
                        {/* userProfileBox */}
                        <div className="bg-gray-50 break-words text-wrap border-2 box-border p-2 h-54 " >

                            {/* profile data */}

                            <div className=" grid text-gray-700 grid-cols-4">
                                <div className=" col-span-3 size-4/5 m-auto">     {/* image */}
                                    <img onClick={profilePicUpload} src={image} alt="user" className=" rounded-full w-full" />
                                </div>

                                <div className=" flex flex-nowrap flex-col col-span-1 text-green-600  justify-center gap-6 h items-center p-5  text-3xl">
                                    <i className="fa fa-whatsapp" onClick={() => setPopup(<PopUp close_btn={() => setPopup("")} title="facebook">
                                        <iframe src="http://whatsapp.com" title="W3Schools Free Online Web Tutorials" className="h-96  w-full"></iframe>
                                    </PopUp>)} />
                                    {/* user social media */}

                                    <i className="fa fa-facebook" />
                                    <i className="fa fa-envelope" />
                                    <i className="fa fa-instagram" />
                                </div>

                                {/* print user information */}
                                <div className=" col-span-4 border-t-4 mt-2  border-green-600 grid break-all w-full text-wrap   ">
                                    <p className=" text-2xl font-serif font-bold hover:text-green-700 hover:cursor-pointer "><i className="fa fa-user" /> {currentUserInfo.name} </p>
                                    <p className=" text-xl  font-light"> <i className="fa fa-envelope " /> {currentUserInfo.email} </p>
                                    <p className="text-xl  font-light "> <i className="fa fa-phone " /> {currentUserInfo.phone} </p>
                                </div>


                            </div>
                        </div>

                        {/* navigation cards */}
                        <div className={`flex flex-col gap-1 overflow-auto `} >
                            {navigation.map((card) => <NavCards title={card.title} icon={card.icon} color={card.color} isActiveClassName={card.activeClassName} navigateTo={card.id} changeStatus={() => { setPanelLogo(card.icon); setTitle(card.title) }} />)}
                        </div>
                    </div>

                    {/* remaining space */}
                    <div className=" md:col-span-3 col-span-4  ">
                        {/* showing elements */}
                        <div className="    ">

                            <div className="border   ">
                                <PanelSectionTitle title={title} image={panelLogo} />
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
                        
                         ${isActive ? "animate-pulse animate-once bg-green-300 border-8 border-gray-50  shadow-black -translate-y-6 " : " animate-jump translate-y-0 bg-green-50 "}  `} onClick={() => { setPanelLogo(card.icon); setTitle(card.title) }}>
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