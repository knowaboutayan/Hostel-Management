import { useState } from "react"


const PopUp = ({ title = "", icon = "", children, close_btn }) => {
    const [animation, setAnimation] = useState('animate-jump-in animate-once animate-normal')
    const close_box = async () => {
        setAnimation('animate-jump-out animate-once animate-duration-700')
        setTimeout(() => close_btn(), 700)
    }
    return (
        //popup page
        <section className={`overflow-auto flex animate-fade-in  w-full fixed   bg-black bg-opacity-50 top-0 bottom-0 z-50 left-0 right-0  items-center justify-center`}>

                {/* popupbox container*/}

                <div className={`w-3/5 my-auto min-w-80 overflow-hidden h-max ${animation} animate-duration-500  bg-gray-50 border-2 border-green-500 mx-auto rounded-lg shadow-lg shadow-gray-700 p-4 box-border`}>
                    {/* close */}
                    <div className="float-end text-3xl bg-red-100 border-red-600 hover:cursor-pointer text-red-500  hover:text-red-600 border-2 rounded-full h-9 w-9 p-4 items-center justify-center flex" onClick={close_box}>
                        <i className="fa fa-close align-middle" />
                    </div>
                    {/* popup box */}
                    <div>
                        {/* popup title box */}
                        <div className="flex mb-2  items-center font-medium text-2xl text-green-600">
                            <img src={icon} alt="addMember" width={"50px"} className="rounded-full bg-green-300 p-2" />
                            <hr className="h-10 mx-2  bg-green-500" ></hr>
                            <h2>{title}</h2>
                        </div>
                        <hr className="w-full bg-green-500 mb-2 rounded-lg"></hr>
                        {/* children box (form) */}
                        <div>{children}</div>
                    </div>

                </div>
            
        </section>

    )
}
export default PopUp