import { useEffect, useState } from "react"
import PanelSectionTitle from "../PanelComponents/PanelSectionTitle"
import images from "../images"
import AlertBox from "../components/AlertBox"
import PopUp from "../components/PopUp"
import AddExpenses from "../PanelComponents/AddExpense"
import DataTable from "../PanelComponents/DataTable"
import database from "../database"
import AddOtherExpenses from "../PanelComponents/AddOtherExpense"
import { useSelector } from "react-redux"



const AllExpenses = () => {

    const [box, setBox] = useState("")
    const [databaseUpdate, setDatabaseUpdated] = useState(false)
    const [alert, setAlert] = useState("")
    const [totalExpense, setTotalExpense] = useState(0)

    const userStatus = useSelector(state => state.userStatus)

    const addNewExpense = () => {
        setBox(<AlertBox massege={"please Wait..."} image={images.process} color="gray" />)
        setBox(<PopUp title="Add New Expenses " icon={images.expense} className="animate-fade-left" close_btn={() => setBox("")}><AddExpenses status={(res) => setDatabaseUpdated((pre)=>!pre)} /></PopUp>)

    }


    //add new other expenses
    const addOtherExpense = () => {
        setBox(<AlertBox massege={"please Wait..."} image={images.process} color="gray" />)
        setBox(<PopUp title="Add Other Expenses " icon={images.expense} className="animate-fade-left" close_btn={() => setBox("")}><AddOtherExpenses status={(res) => setDatabaseUpdated((pre)=>!pre)} /></PopUp>)

    }

    //all Expenses show
    const showExpenses = async () => {
        setAlert(<AlertBox massege={"please wait..."} color="gray" image={images.process} />)

        try {
           //caling db
            const data = await (database.getAllExpenses())

            if (data == 1 || data == null || data == {} || data.documents.length == 0) {
                setAlert(<p>No expense</p>)
            }
            else {
                let cost = 0
                //total expence calculate
                data['documents'].forEach(ele => {
                    cost += Number(ele['TotalCost'])
                    setTotalExpense(Number(cost).toFixed(2))
                })
                setAlert(<DataTable deltePerform={()=>setDatabaseUpdated((pre)=>!pre)} title="All Expenses" data={data['documents']} columns={Object.keys(data['documents'][0]).filter((key) => { if (!String(key).startsWith('$')) { return key } })} />)
            }
        }
        catch (error) {

            setAlert(<AlertBox image={images.unsuccess} color="red" massege={"Error " + error}><button onClick={() => setAlert("")}>ok</button></AlertBox>)
        }
    }
    useEffect(() => {

        setBox("")
        showExpenses()
        setDatabaseUpdated(false)

    }, [databaseUpdate])

    return (
        <section>
            <PanelSectionTitle title={"All Expenses"} image={images.expense}></PanelSectionTitle>
            <div className="flex items-center w-full justify-between  px-5"> <p className="text-green-700 text-2xl">
                Total Monthly Expense : {totalExpense} {userStatus}
            </p>

                <button onClick={() => addNewExpense()} type="button" className="px-3 py-2  text-lg text-white rounded-lg shadow-lg bg-green-600"><i className="fa fa-plus-circle"></i> Add New Expense</button>
                {(userStatus === 'admin') ? <button onClick={() => addOtherExpense()} type="button" className="px-3 py-2  text-lg text-white rounded-lg shadow-lg bg-green-600"><i className="fa fa-plus-circle"></i> Add Other Expense</button> : null}
            </div>
            <div>
                {alert}
            </div>
            {box}

        </section>
    )
}
export default AllExpenses