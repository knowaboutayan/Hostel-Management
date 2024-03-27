import images from "../images"
const ErrorPage = ({ title = "connection error", image = "", descrption = "", children }) => {
    return (
        <section>
            <div>
                <img alt="error" src={(image == "") ? images.pagenotfound : image} />
            </div>
            <div>
                {title}
                <p> {descrption}</p>
            </div>
            {children}
        </section>
    )

}
export default ErrorPage