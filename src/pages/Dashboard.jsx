import { useSelector } from "react-redux"
import Cards from "../PanelComponents/Cards"
import PanelSectionTitle from "../PanelComponents/PanelSectionTitle"
import images from "../images"
import { useEffect } from "react"

const Dashboard = ({ children = "" }) => {

    const totalCredit = useSelector(state=>state.totalCredit)
    const totalDebit = useSelector(state=>state.totalDebit)
    

    return (
        <div className="h-full flex flex-row  gap-5 flex-wrap justify-between items-center w-full border-red-600 p-2">
            
            <Cards title="All Members" icon={images.members} color={'green'} navigateTo={"/panel/members"} />
            <Cards title="All Expenses" icon={images.expense}navigateTo={"/panel/expenses"} > <p>Total Expense:{totalDebit} </p></Cards>
            <Cards title="All Deposit" icon={images.deposit} color={'green'} navigateTo={"/panel/deposit"} >
            <p>Total Deposit:{totalCredit} </p>
            
            </Cards>
            <Cards title="All Transactions" icon={images.transaction} color={'green'} navigateTo={"/panel/transactions"} />
          
            <div>      {children}</div>
        </div>
    )
}
export default Dashboard