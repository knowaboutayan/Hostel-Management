import { useEffect, useState } from "react";
import PanelSectionTitle from "../PanelComponents/PanelSectionTitle";
import PopUp from "../components/PopUp"
import images from "../images";
import AddDeposite from "../PanelComponents/AddDeposit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AlertBox from "../components/AlertBox";
import database from "../database";
import conf from "../conf/conf";
import DataTable from "../PanelComponents/DataTable";
import Button from "../components/Button";
import alert from "../components/allAlerts";
import NoDataFound from "../PanelComponents/NoDataFound";

const Deposits = () => {


    const [popupBox, setPopupBox] = useState("")
    const [printData, setPrintData] = useState("")//state for he table component for show data
    const [databaseUpdate, setDatabaseUpdated] = useState(false)//database update or not like delete document 

    const userStatus = useSelector(state => state.userStatus)
    const navigate = useNavigate()


    //adding new deposit of members...
    const addNewDeposit = () => {

        setPopupBox(
            <PopUp title="Add New Deposit" icon={images.deposit} close_btn={() => setPopupBox("")}>

                <AddDeposite status={() => setDatabaseUpdated((pre) => !pre)} />

            </PopUp>)
    }

    //print Data table.... 
    const printDeposits = async () => {


        try {
            const data = await database.fetchCollectionData({ collectionId: conf.depositId })//fetching data....


            if (data == 'netErr') {
                alert("")
                setPrintData(alert.networkError(() => setPrintData("")))
                return
            }
            else if (data.length == 0 || data == []) {
                setPrintData(
                    <NoDataFound/>
                )

            }
            else if (data.length > 0 && data != 1) {
                setPrintData(
                    <>

                        <DataTable deltePerform={(res) => setDatabaseUpdated((pre) => !pre)} title="All  Member's Deposit" data={data} columns={Object.keys(data[0]).filter((key) => { if (!String(key).startsWith('$')) { return key } })} />)
                    </>)
            }

            else {
                setPrintData(<AlertBox massege={"No data found"} ><button onClick={() => setPrintData("")}>close</button></AlertBox>)
            }
        }
        catch (error) {
            setPrintData(alert.unsuccessful({ fname: () => setPrintData("") }))
        }

    }

    useEffect(() => (() => {//each time page load....
        setPrintData(alert.processing)
        setPopupBox("")
        printDeposits()

    })()

        , [databaseUpdate])


    if (userStatus == 'admin' || userStatus == 'manager') {

        return (
            <section>

                {popupBox}
                <div className="">
                <Button type="button" text=" " fname={() => addNewDeposit()}><i className="fa fa-plus-circle" /> Add New Deposit</Button>
                        <div>
                            <h3>
                                All Deposit
                            </h3>

                        </div>
                       
                    {printData}

                </div>



            </section>
        )
    }



    else {


        return (

            <AlertBox massege={"You Have No permission "} >
                <Button classname="bg-gray-600" fname={() => navigate('/panel')}>go to dashboard</Button>
            </AlertBox>

        )

    }
}
export default Deposits
