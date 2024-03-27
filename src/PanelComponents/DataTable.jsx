import { useEffect, useState } from "react";
import AlertBox from "../components/AlertBox";
import images from "../images";
import { ID } from "appwrite";
import database from "../database";

const DataTable = ({ title = "", except = "", columns = [], data = [{}], deltePerform ,  classname, children }) => {
    const [printdata, setPrintData] = useState("");
    const [alert, setAlertBox] = useState("")
    const databseID = data[0]['$databaseId']//database Id
    const collectionID = data[0]['$collectionId']//collection Id
    const [deleteId, setDeleteId] = useState("")
    //delete items 
    const deleteDocument = async (docId) => {
        try {

            const response = await database.deleteDocuments(databseID, collectionID, docId)
            setDeleteId(docId)
            deltePerform()

        }
        catch (err) {
            setAlertBox(<AlertBox massege={"delete failed"} image={images.unsuccess} color="red" ><button onClick={() => setAlertBox("")} >close</button></AlertBox>)

        }

    }

    useEffect(() => {
        setPrintData(
            <AlertBox massege={"fetching data..."} image={images.process} color="gray" />
        );

        if (data.length > 0) {
            setPrintData(
                data.map((obj) => (

                    <tr key={obj['$id']}  style={{display: (obj['$id'] === deleteId) ? "none" : "table-row"}} className={`animate-fade-up animate-once animate-duration-1000 animate-delay-200 animate-ease-in-out  animate-fill text-center border even:bg-green-100`}>
                        {Object.keys(obj).map((key, i) => {
                            if (String(key)[0] !== '$')
                                return (<td className=" border p-2 w-24 " key={i}>{obj[key]}</td>)
                        })}
                        <td className="text-3xl text-gray-500 hover:cursor-pointer hover:text-red-600 transition-all" onClick={() => { deleteDocument(obj['$id']) }}>
                            <i className="fa fa-trash" />

                        </td>
                    </tr>

                ))
            );
        } else {
            setPrintData(<p>{except}</p>);
        }
    }, [deltePerform]);

    return (
        <section className="container min-w-80 px-3 ">
            <h2 className="text-2xl underline font-bold mb-4 ">{title}</h2>
            <div className="min-w-80 overflow-auto">
                <table className="border-spacing-1">
                    <thead>
                        <tr>
                            {columns.map((ele) => <th key={ID.unique()} className="bg-green-400 border px-4 py-2">{ele}</th>)}
                            <th className="bg-red-400 border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {printdata}
                    </tbody>
                </table>
            </div>
            {alert}
        </section>
    );
};

export default DataTable;