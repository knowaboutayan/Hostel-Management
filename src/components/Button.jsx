

const Button = ({ color = "green", type = "button", classname = "", text = "", fname = "", children }) => {
    return (
        <button type="button" className={`font-serif text-sm ${classname} w-52`}>{children}{text}</button>
    )

}
export default Button