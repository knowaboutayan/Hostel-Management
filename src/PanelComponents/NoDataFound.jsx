import images from "../images"

const NoDataFound = ({text="No Data Found",image=images.empty}) =>{
    return(
        <><div className="p-5l">
                        <p className="m-auto text-3xl text-center font-light">{text}</p>
                        <img src={image} className="size-1/2 m-auto " />
                        </div>
                    </>
    )
}
export default NoDataFound