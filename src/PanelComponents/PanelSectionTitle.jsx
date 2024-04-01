import { useSelector } from "react-redux"

const PanelSectionTitle = ({ title, image, children, alt }) => {

    const credit = useSelector(state => state.totalCredit)
    const debit = useSelector(state => state.totalDebit)

    return (

        <div className=" bg-gray-200 full h-42 box-border px-8 py-2 ">
            <div className="bg-gray-300 flex sm:flex-row flex-col  rounded-xl p-3 w-full  sm:justify-between sm:items-center">
                <div className="inline-flex items-center "> <img src={image} alt={alt} className="w-16 rounded-lg mr-3" />

                    <h2 className="border-l-2 text-nowrap border-green-700 pl-3  w-full text-4xl md:text-4xl text-green-700 font-thin">
                        {title}
                    </h2>
                </div>

                <div className="  sm:block flex justify-evenly items-center text-nowrap font-semibold text-gray-600 shadow-lg bg-gray-200 p-2 rounded-md ">
                    <h2>   Total  Deposit:{credit}</h2>

                    <h2>   Total Expense:{debit}</h2>

                    <h2 className="text-xl cborder-gray-600">    Balance:{Number(credit) - Number(debit)}</h2>
                </div>
            </div>
            {children}

        </div>
    )
}
export default PanelSectionTitle