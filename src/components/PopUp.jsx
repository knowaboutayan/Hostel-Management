import { useState } from "react"

const PopUp = ({ children ,close_btn}) => {
    const [animation,setAnimation]=useState('animate-fade-up')
    const close_box=async()=>{
        setAnimation('animate-fade-down animate-reverse animate-ease-out animate-duration-700')
        setTimeout(()=>close_btn(),700)
    }

    return (
        //popup page
        <section className={` flex flex-row animate-ease-out  fixed overflow-auto bg-black bg-opacity-50 top-0 bottom-0 z-10 left-0 right-0`}>

            {/* popupbox container*/}
            <div className={` flex flex-row  ${animation}   w-3/5 min-w-80 justify-center mx-auto my-auto `}>
                {/* popup box */}
                <div className="   w-full">
                    
                    <div>
                        {children}
                    </div>
                </div>

                {/* close */}
                <div className="text-3xl bg-red-100  border-red-600 hover:cursor-pointer hover:text-red-600 border-2 rounded-full h-9 w-9 p-4 items-center justify-center flex " onClick={close_box}>
                    <i className="fa fa-close text-red-700 "/>
                </div>
            </div>


        </section>
    )
}
export default PopUp