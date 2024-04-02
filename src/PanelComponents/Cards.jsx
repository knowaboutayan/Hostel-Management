import { NavLink } from "react-router-dom"

const Cards = ({ icon = "", alt = "", title = "", color = "gray", children = [], classname = "", navigateTo }) => {

    return (
        <NavLink to={navigateTo}>
            <section className={` m-auto    items-center w-1/6 h-40 min-w-80 hover:bg-opacity-70 bg-${color}-200  border-0 rounded-xl border-b-8 border-${color}-600 hover:border-green-600 py-3 px-4 gap-2 ${classname} rounded-sm hover:cursor-pointer shadow-lg shadow-gray-500 border-2 hover:bg-${String(color)}-300 hover:animate-pulse`}>
                <div>
                    <img src={icon} alt={alt} className="w-20 bg-gray-100  rounded-full p-2 drop-shadow-lg" />
                </div>

                <div>
                    <h2 className="text-xl    text-center">{title}</h2>
                </div>
         
            </section>
        </NavLink>
    )
}
export default Cards