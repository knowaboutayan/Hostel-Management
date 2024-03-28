const AlertBox = ({ massege, image, color = 'green', children }) => {
  
    return (
        <section className={` fixed w-full  top-0 bottom-0 left-0 right-0 flex flex-row justify-center items-center bg-black bg-opacity-50`}>
            <div className={`animate-fade-up flex flex-col gap-2  justify-center items-center bg-${color}-300 border-4 border-${color}-600 rounded-lg shadow-lg w-80 min-w-60 p-6 my-auto`}>
                <div>
                    <img src={image} alt="img" className="w-14 h-14 rounded-full drop-shadow-lg" />
                </div>
                <div className="font-sans text-lg text-stone-900 font-semibold text-center">
                    {massege}
                </div>
                {children}
            </div>
        </section>
    );
}

export default AlertBox;
