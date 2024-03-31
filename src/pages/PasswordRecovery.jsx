import { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'

import { useNavigate } from 'react-router';
import PopUp from '../components/PopUp';
import images from '../images';
import authService from '../auth';
import allAlerts from '../components/allAlerts'
import AlertBox from '../components/AlertBox';
const PasswordRecovery = () => {

    //getting from urlparameter
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');

    const navigate = useNavigate()//navigation hook
    const [alertBox, setAlertBox] = useState("")// status show processsing --->updated OR not updated

    useEffect(() => {
        //cheking when link load is it authenticate or not 
        if (secret == null || userId == null || secret == "" || userId == "") {
            navigate("*")
        }

    }, [])


    const [newPassword, setNewPassword] = useState("")//new password
    const [confirmPassword, setConfirmPassword] = useState("")//confirm new password

    const onSubmitEvebntHandeler = async () => {//after submitting form
        try {
            setAlertBox(allAlerts.processing)
            //waiting for update status
            const response = await authService.updateNewPassword({ userId, secret, password, confirmPassword })

            //if successful 
            if (response == 0) {
                setAlertBox(allAlerts.successful)
                //waiting for 2 sec and then go to home page
                setTimeout(() => navigate(""), 2000)
            }
            // if unsuccessful
            else {
                setAlertBox(<AlertBox massege={"password reset unsuccessful"} color='red' icon={images.unsuccess} >
                    <Button type='button' text='ok' fname={() => setAlertBox("")}>

                    </Button>
                </AlertBox>)
            }

        }
        catch (error) {//other exception
            setAlertBox(<AlertBox massege={"password reset unsuccessful"} color='red' icon={images.unsuccess} >
                <Button type='button' text='ok' fname={() => setAlertBox("")}>
                </Button>
            </AlertBox>)
        }

    }

    return (

        <div>

            <PopUp title='Reset Password' icon={images.resetPassword} close_btn={() => navigate("")} >
                {/* print userId */}
                <p className='font-light text-xl text-gray-700'>
                    <small> UserId:</small>{userId}
                </p>

                {/* form of updating */}
                <form onSubmit={onSubmitEvebntHandeler}>
                    <Input type={'password'} fname={(res) => setNewPassword(res)} iconName={'fa fa-lock'} value='' placeholder={'strong new password'} required={true} />

                    <Input type={'password'} fname={(res) => setConfirmPassword(res)} iconName={'fa fa-lock'} placeholder={"confirm password"} required={true} />
                    {/* submit button */}
                    <Button type='submit' classname={(confirmPassword == newPassword && confirmPassword != "" && newPassword != "") ? 'bg-gray-600' : ""} text=" " disabled={(confirmPassword == newPassword && confirmPassword != "" && newPassword != "") ? false : true} >
                        <i className='fa fa-refresh' > </i>
                        {" "} reset
                    </Button>
                </form>
            </PopUp>
            {alertBox}
        </div>

    )

}
export default PasswordRecovery