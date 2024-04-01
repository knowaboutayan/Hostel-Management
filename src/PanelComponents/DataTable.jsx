import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertBox from "../components/AlertBox";
import images from "../images";
import { ID } from "appwrite";
import database from "../database";
import ScrollAlert from "./ScrollAlert";
import conf from "../conf/conf";
import Transction from "../transactionAdd";
import { setTotalCredit, setTotalDebit } from "../store/slice";

const DataTable = ({ title = "", except = "", columns = [], data = [{}], deletePerform }) => {
    // State
    const [printdata, setPrintData] = useState("");
    const [alert, setAlertBox] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [scrollAlert, setScrollAlert] = useState(<ScrollAlert />);
    
    // Redux
    const dispatch = useDispatch();
    const currentUserStatus = useSelector(state => state.userStatus);
    const userId = useSelector(state => state.userId);
    const userName = useSelector(state => state.userName);
    
    // Effect for fetching data and updating table
    useEffect(() => {
        const fetchData = async () => {
            setPrintData(<AlertBox massege={"fetching data..."} image={images.process} color="gray" />);
            
            if (data.length !== 0 || data !== null) {
                setPrintData(
                    data.map((obj) => (
                        <TableRow key={obj['$id']} obj={obj} deleteId={deleteId} deleteDocument={deleteDocument} currentUserStatus={currentUserStatus} title={title} />
                    ))
                );
            } else {
                setPrintData(<p>{except}</p>);
            }
        };

        fetchData();
    }, [data, deleteId, currentUserStatus, title, except]);

    // Effect for transaction update
    useEffect(() => {
        const updateTransaction = async () => {
            const data = await database.getTotalTransaction();

            if (data !== 1) {
                dispatch(setTotalCredit(data.totalCredit));
                dispatch(setTotalDebit(data.totalDebit));
                console.log(data);
            }
        };

        updateTransaction();
    }, [dispatch]);

    // Function to delete a document
    const deleteDocument = async (docId, amount) => {
        const date = new Date();
        setAlertBox(<AlertBox massege={"deleting..."} image={images.process} />);

        try {
            let response = await database.deleteDocuments(data[0]['$databaseId'], data[0]['$collectionId'], docId);
            
            if (response === 0) {
                setDeleteId(docId);
                const transaction = new Transction(userId, userName, `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`, 'update', amount, `delete record from ${title}`);
                response = await database.addToCollection(conf.transactionCollectionId, transaction);
                const transactionUpdate = await database.getTotalTransaction();
                dispatch(setTotalCredit(transactionUpdate.totalCredit));
                dispatch(setTotalDebit(transactionUpdate.totalDe));
                setTimeout(() => {
                     // Call deletePerform prop
                    setAlertBox("");
                    deletePerform;
                }, 1000);
            }
        } catch (err) {
            setAlertBox(<AlertBox massege={"delete failed"}   image={images.unsuccess} color="orange"    ><button onClick={() => setAlertBox("")}>close</button></AlertBox>);
        }
    };

    return (
        <section className="container border px-3 ">
            <h2 className="text-2xl font-medium text-gray-700 mb-4 "><i className="fa fa-thumb-tack"/> {title}</h2>
            <hr className="h-1"></hr>
            <div id="tableId" className="overflow-auto relative" onScrollCapture={() => setScrollAlert('')}>
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

// TableRow component for rendering each row
const TableRow = ({ obj, deleteId, deleteDocument, currentUserStatus, title }) => {
    const handleDelete = () => {
        if (currentUserStatus === 'admin' || currentUserStatus === 'maneger') {
            deleteDocument(obj['$id'], obj['amount']);
        }
    };

    return (
        <tr key={obj['$id']} style={{ display: (obj['$id'] === deleteId) ? "none" : "table-row" }} className={`animate-fade-up animate-once animate-duration-1000 animate-delay-200 animate-ease-in-out  animate-fill text-center border even:bg-green-100`}>
            {Object.keys(obj).map((key, i) => {
                if (String(key)[0] !== '$')
                    return (<td className=" border p-2 w-24 " key={i}>{obj[key]}</td>)
            })}
            {/* Delete button */}
            {((currentUserStatus === 'admin' || currentUserStatus === 'maneger') && title.toLowerCase() !== 'all transactions') ?
                <td className="text-3xl text-gray-500 hover:cursor-pointer hover:text-red-600 transition-all" onClick={handleDelete}>
                    <i className="fa fa-trash" />
                </td> : <td className="">{(title.toLowerCase() === 'all transactions') ? "tansaction history can't be deleted " : "delete restricted for members"}</td>}
        </tr>
    );
};

export default DataTable;
