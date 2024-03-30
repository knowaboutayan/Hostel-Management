import { useSelector } from "react-redux"
import Button from "../components/Button"
import authService from "../auth"

const UserProfile = () => {
    const currentUserInfo = useSelector(state => state.currentUserInfo)
    const currentUserStatus = useSelector(state => state.userStatus)
    console.log(currentUserInfo)
    const dataStyle = "font-normal ml-3 text-green-600 cordor"

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
                Email:<span className={dataStyle}>{currentUserInfo['email']}</span>
            </p>
            <p>
                Phone:<span className={dataStyle}>{currentUserInfo['phone']}</span>

            </p>
            <div>
                <p>
                    <i className="" />Social Media
                </p>

            </div>
            <hr></hr>
            <Button type="button" classname="bg-red-600" onClick={() => authService.logout()} text="Logout" ><i className=" fa fa-sign-out" /></Button>
        </section>

    )
}
export default UserProfile