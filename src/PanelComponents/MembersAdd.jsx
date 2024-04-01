import Input from "../components/Input"

import { useState } from "react"

import AlertBox from "../components/AlertBox"
import images from "../images"
import Button from "../components/Button"
import database from "../database"
import authService from "../auth"


const MembersAdd = ({ title, width = "w-full", status = "" }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    //on submt form
    const onSubmitEventHAndeler = async (e) => {
        class Member {
            //class for member object creation
            name;
            password;
            email;
            phone;
            constructor(name, password, email) {
                this.email = email;
                this.name = name;
                this.password = password;

            }
        }
        e.preventDefault()
        try {
            setShowAlert(
                <AlertBox massege={"please wait..."} image={images.process} >
                    <p className="animate-spin border-green-600 p-8 border-8 border-l-green-200 border-solid rounded-full"></p>
                </AlertBox>
            )

            const member = new Member(name, password, email, phone)
            let add = await authService.CreateAccount(member)

            setShowAlert(< AlertBox massege={"Account successfully created!"} image={images.success} ></AlertBox>)




            if (add == 0) {
                setShowAlert(<AlertBox massege={"User registraction succesful"} image={images.success} >
                </AlertBox >);
                setTimeout(() => { setShowAlert(""); status(true) }, 700)
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
        <section className="">

            <form onSubmit={(e) => onSubmitEventHAndeler(e)}>
                <Input iconName={"fa fa-user"} type={"text"} placeholder={"member's name"} fname={(res) => setName(res)} required={true} />
                <Input iconName={"fa fa-mobile"} type={"tel"} minValue={1000000000} maxValue={9999999999} placeholder={"member's mobile number"} fname={(res) => setPhone(res)} required={true} />
                <Input iconName={"fa fa-envelope"} type={"email"} placeholder={"members's email"} fname={(res) => setEmail(res)} required={true} />
                <Input iconName={"fa fa-lock"} type={"password"} placeholder={"enter strong password"} fname={(res) => setPassword(res)} required={true} />
                <Input iconName={"fa fa-lock"} type={"password"} placeholder={"confirm password"} fname={(res) => setConfirmPassword(res)} required={true} />

                <Button type="submit" text="" classname={`mt-2 mx-auto  ${(name != "" && phone != "" && email != "" && password != "" && confirmPassword != "") ? "bg-green-600" : "bg-gray-600"}`} disabled={(name != "" && phone != "" && email != "" && password != "" && confirmPassword != "") ? false : true} >
                    <i class="fa fa-cloud" aria-hidden="true" fname={() => { }}> </i> save </Button>
            </form>
            {showAlert}
        </section>
    )
}
export default MembersAdd