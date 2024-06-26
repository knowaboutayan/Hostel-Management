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
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');
    //getting from urlparameter

    const navigate = useNavigate()//navigation hook
    const [alertBox, setAlertBox] = useState("")// status show processsing --->updated OR not updated

    useEffect(() => {
        //cheking when link load is it authenticate or not 
        if (secret == null || userId == null || secret == "" || userId == "") {
            navigate("*")
        }

    }, [])


    const [password, setNewPassword] = useState("")//new password
    const [confirmPassword, setConfirmPassword] = useState("")//confirm new password

    const onSubmitEvebntHandeler = async (e) => {//after submitting form
       

        e.preventDefault()
        
        try {
            setAlertBox(allAlerts.processing)
            
            const recovery = {
                'userId': userId,
                'secret': secret,
                'password': password,
                'passwordAgain': confirmPassword
            }

            //waiting for update status
            console.log(recovery)
            const response = await authService.updateNewPassword(recovery)

            console.log(response);
            //if successful 
            if (response == 0) {
                setAlertBox(allAlerts.successful)
                //waiting for 2 sec and then go to home page

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
            console.log(error);
            setAlertBox(<AlertBox massege={"something went wrong"} color='red' icon={images.unsuccess} >
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
                    <Button type='submit' classname={(confirmPassword == password && password != "" && password != "") ? 'bg-green-600' : "bg-gray-500"} text=" " disabled={(confirmPassword == password && confirmPassword != "" && password != "") ? false : true} >
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