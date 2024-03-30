import { Link, NavLink } from "react-router-dom"

const NavCards = ({ title = "", icon = "", alt = "", className, isActiveClassName, navigateTo = "" ,changeStatus = ""}) => {

    return (
        <NavLink 
        to={`${String(navigateTo).toLowerCase()}`} 
        className={({isActive}) => `flex flex-row justify-between bg-gray-200 text-gray-700 font-semibold hover:border-l-8 hover:cursor-pointer border-green-800  hover:border-green-600 items-center p-2 h-20 ${isActive ? 'border-l-4 bg-green-200 font-extrabold text-gray-700' : 'font-bold'}`}

onClick={()=>changeStatus()}
>

            <div className="">
                <img src={icon} alt={icon} className="
                 w-12  drop-shadow-xl ">
                </img>
            </div>
            <h2 className="w-full text-center text-xl ">{title}</h2>

        </NavLink>

    )
}
export default NavCards