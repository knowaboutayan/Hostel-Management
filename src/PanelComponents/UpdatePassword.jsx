import Input from '../components/Input'
import Button from '../components/Button'
import { useState } from 'react'
import authService from '../auth'
import allAlerts from '../components/allAlerts'
const UpdatePassword = ({success})=>{
    const [newPassword,setNewPassword]=useState("")
    const [confirmNewPassword,setConfirmNewPassword] = useState("")
    const [password,setPassword] =useState("")
    const [alertBox,setAlertBox]=useState("")

    const onSubmitEventHandeler = async (e)=>{
        e.preventDefault()
        setAlertBox(allAlerts.processing)
        try{
            const response = await authService.updatePassword({password:password,updateNewPassword:newPassword})
            if(response!=1){
                setAlertBox(allAlerts.successful)

                setTimeout(()=>{setAlertBox("") ; success()},1000)
            }
            else{
                setAlertBox(allAlerts.unsuccessful({fname:()=>setAlertBox("")}))
            }

        }
        catch(error){
            setAlertBox(allAlerts.unsuccessful({fname:()=>setAlertBox('')}))
        }
    

    }
    return(
        <section>
            <form onSubmit={onSubmitEventHandeler} className='relative'>
            <Input type={"password"} iconName={'fa fa-lock'} fname={(res)=>setNewPassword(res)} placeholder={'Type New Password'} />
            <Input type={"password"} iconName={'fa fa-lock'} fname={(res)=>setConfirmNewPassword(res)} placeholder={'Confirm New Password'} />
            <Input type={"password"} iconName={'fa fa-lock'} fname={(res)=>setPassword(res)} placeholder={'type old password'} />
            <Button type='submit' text='update password' classname={(newPassword===confirmNewPassword)&&newPassword!=''&&confirmNewPassword!=''&&password!=''?'bg-green-600':'bg-gray-600'} disabled={(newPassword===confirmNewPassword)&&newPassword!=''&&confirmNewPassword!=''&&password!=''?false:true} >
            </Button>
        </form>
        {alertBox}
        </section>
    )
}
export default UpdatePassword