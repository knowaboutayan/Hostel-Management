import { useDispatch } from "react-redux"
import NoDataFound from "../PanelComponents/NoDataFound"
import images from "../images"
import { isLogIn, userInfo } from "../store/slice"
import { useEffect } from "react"
const ErrorPage = ({ image = "", descrption = "", children }) => {
    const dispatch = useDispatch()


    return (
        <section className="m-auto text-center">
            <NoDataFound text={"pagenotfound"} image={images.pagenotfound}>
            </NoDataFound>
            {descrption}
            <div>{children}</div>
        </section>
    )

}
export default ErrorPage