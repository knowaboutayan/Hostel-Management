import { useEffect, useState } from "react"
import PanelSectionTitle from "../PanelComponents/PanelSectionTitle"
import images from "../images"
import AlertBox from "../components/AlertBox"
import PopUp from "../components/PopUp"
import AddExpenses from "../PanelComponents/AddExpense"
import DataTable from "../PanelComponents/DataTable"
import database from "../database"


const AllExpenses = () => {
    const [box, setBox] = useState("")
    const [newExpenseAdd, setNewExpenseAdd] = useState(false)
    const [allExpenses, setAllExpenses] = useState("")
    const [totalExpense, setTotalExpense] = useState(0)

    const addNewExpense = () => {
        setBox(<AlertBox massege={"please Wait..."} image={images.process} color="gray" />)
        setBox(<PopUp className="animate-fade-left" close_btn={() => setBox("")}><AddExpenses status={() => setNewExpenseAdd(true)} /></PopUp>)

    }
    const showExpenses = async () => {
        setAllExpenses(<AlertBox massege={"please wait..."} color="gray" image={images.process} />)
        try {
            const data = await (database.getAllExpenses())
            console.log("ff", data)

            if (data == 1 || data == null || data == {} || data.documents.length == 0) {
                setAllExpenses(<AlertBox image={images.unsuccess} color="red" massege={"Error " + err}><button onClick={() => setPrintData("")} className="">ok</button></AlertBox>)
            } else {
                data['documents'].forEach(ele => {
                    const cost = 0
                    setTotalExpense(Number(Number(cost) + Number(ele['TotalCost'])))
                })
                setAllExpenses(<DataTable title="All Expenses" data={data['documents']} columns={Object.keys(data['documents'][0]).filter((key) => { if (!String(key).startsWith('$')) { return key } })} />)
            }
        }
        catch (error) {

            setAllExpenses(<AlertBox image={images.unsuccess} color="red" massege={"Error " + error}><button onClick={() => setAllExpenses("")}>ok</button></AlertBox>)
        }
    }
    useEffect(() => {
        setBox("")
        showExpenses()
        setNewExpenseAdd(false)
    }, [newExpenseAdd])

    return (
        <section>
            <PanelSectionTitle title={"All Expenses"} image={images.expense}></PanelSectionTitle>
            <div className="flex items-center w-full justify-between  px-5"> <p className="text-green-700 text-2xl">
                Total Expense : {totalExpense}
            </p> <button onClick={() => addNewExpense()} type="button" className="px-3 py-2  text-lg text-white rounded-lg shadow-lg bg-green-600"><i className="fa fa-plus-circle"></i> Add New Expense</button></div>
            {box}
            <div>


            </div>
            <div>
                {allExpenses}
            </div>

        </section>
    )
}
export default AllExpenses