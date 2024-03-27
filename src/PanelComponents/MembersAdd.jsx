import Input from "../components/Input"
import newMember from '../../images/newMember.png'
import { useState } from "react"
import database from "../database"
import AlertBox from "../components/AlertBox"
import images from "../images"

const MembersAdd = ({ title, width = "w-full", status = "" }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const onSubmitEventHAndeler = async (e) => {
        e.preventDefault()
        try {
            setShowAlert(
                <AlertBox massege={"working please wait..."} image={images.process} >
                    <p className="animate-spin border-green-600 p-8 border-8 border-l-green-200 border-solid rounded-full"></p>
                </AlertBox>
            )
            const add = await database.memberAdd(name, phone, email)
            if (add == 0) {
                setShowAlert(< AlertBox massege={"successfully registered"} image={images.success} >
                </AlertBox >);
                setTimeout(() => status(true), 700)
            }
            else {
                setShowAlert(
                    <AlertBox massege={"registration unsuccessful"} image={images.unsuccess} >
                        <button type="button" className="bg-red-600" onClick={() => setShowAlert(false)}>ok</button>
                    </AlertBox>
                )
            }

        }
        catch (error) {
            setShowAlert(
                <AlertBox massege={"registration unsuccessful"} image={images.unsuccess} >
                    <button type="button" className="bg-red-600" onClick={() => setShowAlert(false)}>ok</button>
                </AlertBox>
            )

        }
    }
    return (
        <section className={`p-4 ${width} relative min-w-80 bg-gray-50 border-2 border-green-600 mx-auto rounded-lg shadow-lg shadow-gray-700`}>
            <div className="flex mb-2  items-center font-medium text-2xl text-green-600  ">
                <img src={newMember} alt="addMember" width={"50px"} className="rounded-full bg-green-300 p-2" />
                <hr className="h-12 mx-2 w-1 bg-green-500"></hr>
                <h2>
                    {title}
                </h2>
            </div>
            <hr className="w-full h-1 bg-green-500 mb-2 rounded-lg"></hr>

            <form onSubmit={onSubmitEventHAndeler}   >
                <Input iconName={"fa fa-user"} type={"text"} placeholder={"member's name"} fname={(res) => setName(res)} required={true} />
                <Input iconName={"fa fa-mobile"} type={"tel"} minValue={1000000000} maxValue={9999999999} placeholder={"member's mobile number"} fname={(res) => setPhone(res)} required={true} />
                <Input iconName={"fa fa-envelope"} type={"tel"} placeholder={"members's email"} fname={(res) => setEmail(res)} required={true} />
                <Input iconName={"fa fa-lock"} type={"password"} placeholder={"enter strong password"} fname={(res) => setPassword(res)} required={true} />
                <Input iconName={"fa fa-lock"} type={"password"} placeholder={"confirm password"} fname={(res) => setConfirmPassword(res)} required={true} />
                <input type="submit" value={"Add Member"} className={`px-3 py-2  w-40 rounded-lg font-semibold hover:cursor-pointer  text-white ${(password === confirmPassword && password != "" && confirmPassword != "") ? "bg-green-600 hover:bg-green-700 hover:shadow-md hover:shadow-gray-300" : "bg-gray-600"}`} disabled={(password === confirmPassword && password != "" && confirmPassword != "") ? false : true} />
            </form>
            {showAlert}
        </section>
    )
}
export default MembersAdd