import { useState } from "react"
import Input from "../components/Input"
import PopUp from "../components/PopUp"
import authService from "../auth"
import AlertBox from "../components/AlertBox"
import images from "../images"
import { redirect, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { isLogIn, userInfo } from "../store/slice"
import admin from "../admin"
import Button from "../components/Button"
import ForgetPassword from "../PanelComponents/ForgetPassword"


const Login = ({ loginFor = '', valiDationFunc = "" }) => {

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    //forget password
    const forgetPassword = () => {
        setShowSuccess(<PopUp title="Forgot Password" icon={images.forgotPassword} close_btn={() => setShowSuccess("")}>
            <div className="text-green-600">Recover Password</div>
            <ForgetPassword status={() => setShowSuccess("")} />
        </PopUp>)
    }

    const onSubmitHandeler = async (event) => {

        event.preventDefault()
        try {
            setShowSuccess(<AlertBox massege={"please wait"} color={"gray"} image={images.process} ><p className="animate-spin  animate-reverse border-gray-600 p-8 border-8 border-l-gray-200 border-solid rounded-full"></p></AlertBox>)
            const data = await authService.Login(username, password)//member login

            //onsuccessful login....
            if (data != 1) {
                //setCurrentUserInformation
                setShowSuccess(
                    <AlertBox massege={"Login Successful"} image={images.success} 
 
 color="green" >
                        redirecting...
                        <p className="animate-spin border-green-600 p-8 border-8 border-l-green-200 border-solid rounded-full"></p>
                    </AlertBox>
                )

                const userData = await authService.getCurrentUser()//collect login-user data
                dispatch(userInfo(userData))//set userData
                dispatch(isLogIn(true))//setLogIn status 
                setTimeout(() => navigate("/panel"), 800)//waiting for redirect...
            }
            //onUnsuccessful Login....
            else {

                setShowSuccess(<AlertBox massege={"account not found"} color={"red"}   image={images.unsuccess} color="orange" >
                    <button onClick={() => setShowSuccess("")}>
                        ok
                    </button>
                </AlertBox>)
            }
        }
        catch (error) {
            //error 
            setShowSuccess(<AlertBox massege={"something went wrong"} color={"red"}   image={images.unsuccess} color="orange" >
                <button onClick={() => setShowSuccess("")}>
                    ok
                </button>
            </AlertBox>)

        }
    }
    //cheking loggedin or not
    const isLogin = useSelector(state => state.isUserLogin)

    //if not
    if (!isLogin) {
        return (
            //login
            <section >

                <hr className="w-full h-1 bg-green-500 mb-2 rounded-lg"></hr>
                {/* form login */}
                <form onSubmit={onSubmitHandeler} className="w-full m-auto">
                    <Input label={"Username"} type="text" placeholder={"username"} fname={(res) => setUserName(res)} iconName={"fa fa-user-circle-o"} required="true"></Input>
                    <Input label={"password"} type="password" placeholder={"password"} fname={(res) => setPassword(res)} iconName={"fa fa-lock"} required="true"></Input>
                    <p className="text-right mb-5 font-serif text-sm text-gray-500 hover:text-gray-900 hover:cursor-pointer " onClick={() => { forgetPassword() }} >
                        <h5 >
                            forget password?
                        </h5>
                    </p>
                    <Button type="submit" text={"login"} className={`px-3 py-2  w-40 rounded-lg font-semibold hover:cursor-pointer  text-white ${(username != "" && password != "") ? "bg-green-600 hover:bg-green-700 hover:shadow-md hover:shadow-gray-300" : "bg-gray-600"}`} disabled={(username != "" && password != "") ? false : true} >
                        <i className="fa fa-sign-in" />
                    </Button>
                </form>
                {showSuccess}
            </section>

        )
    }
    // if logged-in
    else {

        setTimeout(() => navigate('/panel')), [700]
        return (

            <div>
                <AlertBox massege={"Already LoggedIn"} image={images.process}><p>redirected to admin panel</p></AlertBox>
            </div>

        )
    }
}
export default Login