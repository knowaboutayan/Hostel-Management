import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

const NavCards = ({ title = "", icon = "", alt = "", className, isActiveClassName, navigateTo = "", changeStatus = "" }) => {
    const [arrow, setArrow] = useState("hidden")
    return (
        <NavLink
            to={`${String(navigateTo).toLowerCase()}`}
            onMouseOver={() => setArrow(` block`)}
            onMouseLeave={() => setArrow(`hidden`)}
            className={({ isActive }) => `flex flex-row  bg-gray-200 text-gray-700 font-semibold hover:border-l-8 hover:cursor-pointer border-green-800  hover:border-green-600 items-center p-2 h-20 ${isActive ? 'border-l-4 bg-green-200 font-extrabold text-gray-700' : 'font-bold'}`}

            onClick={() => changeStatus()}
        >
            <div className="" >
                <img src={icon} alt={icon} className="
                 w-12  drop-shadow-xl  ">
                </img>
            </div>
            <h2 className="w-full   text-justify px-5 text-xl ">{title}

            </h2>
            <div className={`${arrow} animate-fade-right  float-right m-auto  text-2xl text-green-700`}>
                <i className="fa fa-angle-double-right" />
            </div>
        </NavLink>

    )
}
export default NavCards