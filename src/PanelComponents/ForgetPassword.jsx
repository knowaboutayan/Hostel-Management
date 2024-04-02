import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import allAlerts from "../components/allAlerts"
import authService from "../auth"
import AlertBox from "../components/AlertBox"
import images from "../images"

const ForgetPassword = ({ status }) => {
    const [email, setEmailId] = useState("")
    const [alertBox, setAlertBox] = useState("")
    //on form submission (recovery mailsend)
    const onSubmitEvebntHandeler = async (e) => {
        e.preventDefault()
        setAlertBox(allAlerts.processing)
        try {
            const response = await authService.forgetPassword({ email })
            if (response == 0) {
                setAlertBox(<AlertBox massege={" recovery link send to your EmailId"} image={images.success} 
 color="green"  >
                </AlertBox>)

            }
            else {
                setAlertBox(<AlertBox massege={"failed to send"}      image={images.unsuccess} color="orange"  >
                </AlertBox>)
            }
            setTimeout(() => {
                status()
            }, [2000])

        }
        catch (error) {
            setAlertBox(<AlertBox massege={error}   image={images.unsuccess} color="orange">
                <Button text="Ok" fname={() => setAlertBox("")} />
            </AlertBox>)

        }
    }
    return (
        <div>
            <form onSubmit={onSubmitEvebntHandeler}>
                <Input iconName={'fa fa-envelope'} fname={(res) => setEmailId(res)} type={'email'} placeholder={'enter your email'} required={true} />
                <Button type="submit" disabled={(email == "" && String(email).match('@')) ? true : false} >
                    <i className="fa fa-paper-plane" />
                    send recovery link
                </Button>
            </form>
            {alertBox}
        </div>
    )
}
export default ForgetPassword