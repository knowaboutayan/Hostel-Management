import { useEffect, useState } from "react";
import authService from "../auth";
import allAlerts from '../components/allAlerts'
import { useNavigate } from "react-router";
const EmailVerification = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');
    const [alertBox, setAlertBox] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        async function fname() {

            try {
                setAlertBox(
                    allAlerts.processing
                )
                const response = await authService.updateEmailVerification({ userId, secret })
                if (response == 0) {
                    setAlertBox(
                        allAlerts.successful
                    )
                    setTimeout(() => {

                        navigate("/")

                    }, 2000)
                }
                else {
                    setAlertBox(allAlerts.unsuccessful({ fname: () => navigate('') }))
                }
            }
            catch (error) {
                setAlertBox(error)

            }
        }
        fname()
    }
        , [])


    return (
        <div>
            {alertBox}
        </div>

    )
}
export default EmailVerification