import Input from '../components/Input'
import Button from '../components/Button'
import { useState } from 'react'
import authService from '../auth'
import allAlerts from '../components/allAlerts'
import { userInfo } from '../store/slice'
import { useDispatch } from 'react-redux'
const UpdatePhone = ({ success }) => {
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [alertBox, setAlertBox] = useState("")
    const dispatch = useDispatch("")
    const onSubmitEventHandeler = async (e) => {
        e.preventDefault()
        setAlertBox(allAlerts.processing)

        try {
            const response = await authService.updatePhone({ phone: phone, password: password })
            if (response != 1) {
                setAlertBox(allAlerts.successful)
                const currentUser = await authService.getCurrentUser()
                dispatch(userInfo(currentUser))
                setTimeout(() => { setAlertBox(""); success() }, 1000)
            }
            else {
                setAlertBox(allAlerts.unsuccessful({ fname: () => setAlertBox("") }))
            }

        }
        catch (error) {
            setAlertBox(allAlerts.unsuccessful({ fname: () => setAlertBox('') }))
        }


    }
    return (
        <section>

            <form onSubmit={onSubmitEventHandeler} className='relative'>
                <Input type={"number"} iconName={'fa fa-phone'} fname={(res) => setPhone(res)} placeholder={'enter new number'} />
                <Input type={"password"} iconName={'fa fa-lock'} fname={(res) => setPassword(res)} placeholder={' enter password'} />
                <Button type='submit' text='update phone' classname={(password != '' && phone != "") ? 'bg-green-600' : 'bg-gray-600'} disabled={(password != '' && phone != "") ? false : true} >
                </Button>
            </form>
            {alertBox}
        </section>
    )
}
export default UpdatePhone