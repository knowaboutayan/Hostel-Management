import { useState } from "react"
import Input from "../components/Input"
import PopUp from "../components/PopUp"
import authService from "../auth"
import AlertBox from "../components/AlertBox"
import images from "../images"
import { redirect, useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { isLogIn, userInfo } from "../store/slice"


const Login = ({ loginFor = '', valiDationFunc = "" }) => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //forget password
    const forgetPassword = () => {
        setShowSuccess(<PopUp close_btn={() => setShowSuccess("")}><div className="text-green-600">Forget password</div><Input type={"email"} fname={() => { }} placeholder={"enter email"} required={true} /></PopUp>)
    }

    const onSubmitHandeler = async (event) => {
        event.preventDefault()
        try {
            setShowSuccess(<AlertBox massege={"please wait"} color={"gray"} image={images.process} ><p className="animate-spin  animate-reverse border-gray-600 p-8 border-8 border-l-gray-200 border-solid rounded-full"></p></AlertBox>)
            const data = await authService.Login(username, password)
            console.log(data)
            //onsuccessful login....
            if (data != 1) {
                //setCurrentUserInformation
                setShowSuccess(
                    <AlertBox massege={"Login Successful"} color={"green"} image={images.success} >
                        redirecting...
                        <p className="animate-spin border-green-600 p-8 border-8 border-l-green-200 border-solid rounded-full"></p>
                    </AlertBox>
                )

                const userData = await authService.getCurrentUser()//collect login-user data
                dispatch(userInfo(userData))//set data as global
                dispatch(isLogIn(true))
                setTimeout(() => navigate("/panel"), 800)//waiting for redirect...
            }

            //onUnsuccessful Login....
            else {
                setShowSuccess(<AlertBox massege={"account not found"} color={"red"} image={images.unsuccess} >
                    <button onClick={() => setShowSuccess("")}>
                        ok
                    </button>
                </AlertBox>)


            }
        }
        catch (error) {
            //error 
            setShowSuccess(<AlertBox massege={"something went wrong"} color={"red"} image={images.unsuccess} >
                <button onClick={() => setShowSuccess("")}>
                    ok
                </button>
            </AlertBox>)

        }
    }

    return (

        //login
        <section className=" flex flex-row p-4 w-max min-w-80  border-2 border-green-600 mx-auto rounded-lg shadow-lg shadow-gray-700 ">
            {/* loginbox */}
            <div>
                <h3 className="text-2xl  text-green-600 ">
                    {loginFor.charAt(0).toUpperCase()}{loginFor.substring(1,)} Login
                </h3>
                <form onSubmit={onSubmitHandeler}>
                    <Input label={"Username"} type="text" placeholder={"username"} fname={(res) => setUserName(res)} iconName={"fa fa-user-circle-o"} required="true"></Input>
                    <Input label={"password"} type="password" placeholder={"password"} fname={(res) => setPassword(res)} iconName={"fa fa-lock"} required="true"></Input>
                    <p className="text-right mb-5 font-serif text-sm text-gray-500 hover:text-gray-900 hover:cursor-pointer " onClick={() => { forgetPassword() }} >
                        <h5>
                            forget password?
                        </h5>
                    </p>
                    <input type="submit" value={"login"} className={`px-3 py-2  w-40 rounded-lg font-semibold hover:cursor-pointer  text-white ${(username != "" && password != "") ? "bg-green-600 hover:bg-green-700 hover:shadow-md hover:shadow-gray-300" : "bg-gray-600"}`} disabled={(username != "" && password != "") ? false : true} />
                </form>
                {showSuccess}

            </div>
        </section>

    )
}

export default Login