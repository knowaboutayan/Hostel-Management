const ScrollAlert = ({ isScroll = '', children }) => {

    return (
        <p className={` lg:hidden  border-2 rounded-full  
                
        bg-gray-100 drop-shadow-xl border-green-400 text-green-600  absolute left-2/4 top-2/4  size-9   grid  animate-fade-right animate-infinite`} ><i className="fa fa-arrow-right m-auto" />

            {children}
        </p>

    )
}
export default ScrollAlert