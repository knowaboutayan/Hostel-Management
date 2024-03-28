import { useState } from "react"
import images from "../images"

const PopUp = ({ title = "", icon = "", children, close_btn }) => {
    const [animation, setAnimation] = useState('animate-fade-up')
    const close_box = async () => {
        setAnimation('animate-fade-down animate-reverse animate-ease-out animate-duration-700')
        setTimeout(() => close_btn(), 700)
    }
    return (
        //popup page
        <section className={`border-8 border-gray-950 animate-fade w-full fixed   bg-black bg-opacity-50 top-0 bottom-0 z-10 left-0 right-0 block items-center justify-center`}>
            <div>
                {/* popupbox container*/}

                <div className={`w-3/5 my-auto  min-w-80 overflow-hidden h-max ${animation} bg-gray-50 border-2 border-green-500 mx-auto rounded-lg shadow-lg shadow-gray-700 p-4 box-border`}>
                    {/* close */}
                    <div className="float-end text-3xl bg-red-100 border-red-600 hover:cursor-pointer hover:text-red-600 border-2 rounded-full h-9 w-9 p-4 items-center justify-center flex" onClick={close_box}>
                        <i className="fa fa-close text-red-700 align-middle" />
                    </div>
                    {/* popup box */}
                    <div>
                        {/* popup title box */}
                        <div className="flex mb-2 border items-center font-medium text-2xl text-green-600">
                            <img src={icon} alt="addMember" width={"50px"} className="rounded-full bg-green-300 p-2" />
                            <hr className="h- mx-2 w-1 bg-green-500"></hr>
                            <h2>{title}</h2>
                        </div>
                        <hr className="w-full bg-green-500 mb-2 rounded-lg"></hr>
                        {/* children box (form) */}
                        <div>{children}</div>
                    </div>

                </div>
            </div>
        </section>

    )
}
export default PopUp