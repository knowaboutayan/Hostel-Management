import { useEffect, useState } from "react"
import authService from "../auth"
import { useDispatch, useSelector } from "react-redux"
import { isLogIn, userInfo } from "../store/slice"

const PanelSectionTitle = ({ title, image, children, alt }) => {
    




return (

    <div className="z-10 gap-2 flex sticky top-0 flex-wrap mb-2 justify-between   px-5 py-2  bg-gray-100 border-green-500 w-full font-medium text-2xl border-b-4  text-green-600">
        <div className="flex flex-row items-center ">
            <img src={image} alt={alt} className="w-20 rounded-full bg-green-300 drop-shadow-lg p-2" />
            <hr className="h-12 mx-2 w-1 bg-green-500"></hr>
            <h2>
                {title}
            </h2>

        </div>
        <div>
            
        </div>
        {children}
    </div>
    )
}
export default PanelSectionTitle