import { useSelector } from "react-redux"
import Button from "../components/Button"
import authService from "../auth"
import { useNavigate } from "react-router"
import PopUp from '../components/PopUp'
import images from "../images"
import UpdatePassword from "./UpdatePassword"
import { useState } from "react"
import UpdatePhone from "./UpdatePhone"

const UserProfile = ({ fname = "" }) => {
    const currentUserInfo = useSelector(state => state.currentUserInfo)
    const currentUserStatus = useSelector(state => state.userStatus)
    const haveEmailVerified = useSelector(state => state.emailVerification)
  
    const dataStyle = "font-normal ml-3 text-green-600 cordor"
    const [popUp, setPopUp] = useState("")

    //update Email 
    const updateEmail = () => {

        setPopUp(
            <PopUp close_btn={() => setPopUp("")} title="Update Password " icon={images.resetPassword}>
                <UpdatePassword success={() => setPopUp("")} />
            </PopUp>)

    }

    //update Phone 
    const updatePhone = () => {
        setPopUp(
            <PopUp close_btn={() => setPopUp("")} title="Update Phone Number">
                <UpdatePhone success={() => setPopUp("")} />
            </PopUp>)
    }
    return (
        <section className="p-4  text-gray-700 font-semibold ">
            <p className="">
                UserID:<span className={dataStyle}>{String(currentUserInfo['$id'])}</span>
            </p>
            <p>
                UserStatus:<span className={dataStyle}>{String(currentUserStatus).toUpperCase() || 'member'}</span>
            </p>
            <p>
                Name :<span className={dataStyle}> {currentUserInfo['name']}</span>
            </p>
            <p>
                Email:<span className={dataStyle}>{currentUserInfo['email']} <img src={(haveEmailVerified) ? images.verified : images.notverified} className="w-6 inline-block" /> </span>
            </p>
            <p>
                Phone:<span className={dataStyle}>{currentUserInfo['phone']} <i className=" text-lg fa fa-pencil-square text-gray-600 hover:text-orange-500 cursor-pointer" onClick={() => updatePhone()} /> </span>

            </p>
            <div>
                <p>
                    <i className="" />Social Media
                </p>

            </div>
            <hr></hr>
            <p className="flex flex-row justify-between md:flex-nowrap flex-wrap gap-2 mt-2">
                <Button type="button" classname="bg-orange-500" text="Update Password" fname={() => updateEmail()} ><i className=" fa fa-pencil" /></Button>
                <Button type="button" classname="bg-red-600" fname={fname} text="Logout" ><i className=" fa fa-sign-out" /></Button>
            </p>
            {popUp}
        </section>

    )
}
export default UserProfile