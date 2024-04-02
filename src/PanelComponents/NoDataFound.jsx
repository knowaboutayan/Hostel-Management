import images from "../images"

const NoDataFound = ({ text = "No Data Found", image = images.empty }) => {
    return (
        <>
        <div className="p-5l">
            <p className="m-auto text-3xl text-center font-light">{text}</p>
            <img src={image} className="w-4/6 m-auto " />
        </div>
        </>
    )
}
export default NoDataFound