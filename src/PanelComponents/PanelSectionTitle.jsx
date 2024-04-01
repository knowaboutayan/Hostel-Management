import { useSelector } from "react-redux"

const PanelSectionTitle = ({ title, image, children, alt }) => {
    

    return (

        <div className="  flex  flex-wrap justify-between  p-1 bg-gray-100   border-green-500  font-medium text-2xl border-b-4  text-green-600">
            <div className="flex flex-row items-center px-5 py-2 w-full">
                <img src={image} alt={alt} className="w-24 border-2  border-r-gray-200  translate-x-4 box-border  p-2 rounded-full   bg-gray-200 " />

                <h2 className=" box-border pl-3 font-sm text-3xl border-2    rounded-r-full w-full bg-gray-200  py-4 text-center ">
                    {title}
                </h2>
                
            </div>
    
                {children}
            

        </div>
    )
}
export default PanelSectionTitle