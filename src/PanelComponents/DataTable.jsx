import { useEffect, useState } from "react";
import AlertBox from "../components/AlertBox";
import images from "../images";
import { ID } from "appwrite";
import database from "../database";
import { useSelector } from "react-redux";
import { handler } from "tailwindcss-animate";
import ScrollAlert from "./ScrollAlert";

const DataTable = ({ title = "", except = "", columns = [], data = [{}], deltePerform, classname, children }) => {
    const [printdata, setPrintData] = useState("");
    const [alert, setAlertBox] = useState("")
    const databseID = data[0]['$databaseId']//database Id
    const collectionID = data[0]['$collectionId']//collection Id

    const [deleteId, setDeleteId] = useState("")

    const currentUserStatus = useSelector(state => state.userStatus)
    const [scrollAlert, setScrollAlert] = useState(<ScrollAlert/>)
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

    useEffect(() => (() => {


        setPrintData(
            <AlertBox massege={"fetching data..."} image={images.process} color="gray" />
        );

        if (data.length != 0 || data != null) {
            setPrintData(
                data.map((obj) => (

                    <tr key={obj['$id']} style={{ display: (obj['$id'] === deleteId) ? "none" : "table-row" }} className={`animate-fade-up animate-once animate-duration-1000 animate-delay-200 animate-ease-in-out  animate-fill text-center border even:bg-green-100`}>
                        {Object.keys(obj).map((key, i) => {
                            if (String(key)[0] !== '$')
                                return (<td className=" border p-2 w-24 " key={i}>{obj[key]}</td>)
                        })}

                        {/* delete button only show admin and maneger */}
                        {(currentUserStatus == 'admin' || currentUserStatus == 'maneger') ?
                            <td className="text-3xl text-gray-500 hover:cursor-pointer hover:text-red-600 transition-all" onClick={() => { deleteDocument(obj['$id']) }}>
                                <i className="fa fa-trash" />

                            </td> : <td className="">contact maneger for update/delete</td>}
                    </tr>

                ))
            );
        } else {
            setPrintData(<p>{except}</p>);
        }

    })(), [deleteId]);

    

    return (
        <section className="container border  px-3 ">
            <h2 className="text-2xl underline font-bold mb-4 ">{title}</h2>
            <div id="tableId" className="overflow-auto relative" onScrollCapture={() =>  setScrollAlert('')}>

                <table className="m-auto relative w-full text-center ">
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
             {scrollAlert}
            </div>
            {alert}
        </section>
    );
};

export default DataTable;