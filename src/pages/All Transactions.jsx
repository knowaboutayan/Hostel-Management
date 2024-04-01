import { useEffect, useState } from "react"
import DataTable from "../PanelComponents/DataTable"
import allAlerts from "../components/allAlerts"
import database from "../database"
import conf from "../conf/conf"
import images from "../images"

const AllTransactions = () => {
    const [alertBox, setAlertBox] = useState("")
    const [data, setData] = useState([])
    const [deletePerform, setDeletePerform] = useState(false)

    useEffect(() => {
        setAlertBox(allAlerts.processing)
        async function fetchData() {
            try {
                const response = await database.getListOfDocuments(conf.transactionCollectionId)
                setAlertBox("")
                if (response.documents.length != 0) {
                    setData(<DataTable
                        title="All Transactions"
                        data={response.documents} deltePerform={() => setDeletePerform(pre => !pre)}
                        columns={Object.keys(response.documents[0]).filter(key => !key.startsWith('$'))}
                    />)
                }
                else {
                    setData(<img src={images.empty} className="w-3/4 m-auto" />)
                }
            } catch (error) {
                console.error("Error fetching data:", error)
                setAlertBox(allAlerts.error)
            }
        }
        fetchData()
    }, [])

    return (
        <section>
            <div>

            </div>
            <div  >
                {data}
            </div>
            {alertBox}
        </section>
    )
}

export default AllTransactions
