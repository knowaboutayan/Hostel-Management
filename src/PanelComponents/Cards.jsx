import { NavLink } from "react-router-dom"

const Cards = ({ icon = "", alt = "", title = "", color = "green", children = [], classname = "", navigateTo }) => {

    return (
        <NavLink to={navigateTo}>
            <section  className={` m-auto flex flex-col items-center w-1/6 h-40 min-w-80 hover:bg-opacity-70 bg-${color}-200 border-solid border-${color}-600 py-3 px-4 gap-2 ${classname} hover:cursor-pointer rounded-lg border-2 hover:bg-${String(color)}-300`}>

                <img src={icon} alt={alt} className="w-16  rounded-xl p-2 drop-shadow-lg" />
                <div>
                    <h2 className="text-xl  font-semibold  text-center">{title}</h2>
                </div>
                {children}
            </section>
        </NavLink>
    )
}
export default Cards