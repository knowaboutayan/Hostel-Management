

const Button = ({ type = "button", classname = "bg-green-600", text = "", fname = "", children,disabled  = false}) => {
    return (
        <button type={type} className={` px-3 py-2  text-lg text-white rounded-lg shadow-lg  ${classname} bg-opacity-90 shadow-md shadow-gray-700 hover:bg-opacity-100 `} onClick={() => fname()} disabled={disabled}>{children}{text}</button>
    )
    

}
export default Button