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



const Deposits = () => {

    const [status, setStatus] = useState(false)
    const [popupBox, setPopupBox] = useState("")
    const [alertBox, setAlert] = useState("")
    const [printData, setPrintData] = useState("")
    const [databaseUpdate, setDatabaseUpdated] = useState(false)
    

    const userStatus = useSelector(state => state.userStatus)
    const navigate = useNavigate()
    //adding new deposit of members
    const addNew = () => {

        setPopupBox(<PopUp title="addDeposite" icon={images.deposit} close_btn={() => setPopupBox("")}>

            <AddDeposite status={() => setStatus((pre) => !pre)} />

        </PopUp>)
    }
    //print Data 
    const printDeposits = async () => {

        setAlert(<AlertBox massege={"please wait..."} color="gray" image={images.process} />)
     try{
        const data = await database.fetchCollectionData({ collectionId: conf.depositId })
        console.log("hhh",data)
       if(data.length>0 && data!=1)
        setPrintData(<DataTable deltePerform={()=>setDatabaseUpdated((pre)=>!pre)} title="All Expenses" data={data} columns={Object.keys(data[0]).filter((key) => { if (!String(key).startsWith('$')) { return key } })} />)
    else{
        setAlert(<AlertBox massege={"No data found"} ><button onClick={()=>setAlert("")}>close</button></AlertBox>)
    }
    }
     catch(error){
        console.log('error',error)
     }

    }



    useEffect(() => {

        printDeposits()
        setPopupBox("")
        setAlert("")


    }, [status])


    if (userStatus == 'admin' || userStatus == 'manager') {

        return (
            <section>
                <PanelSectionTitle title={"Deposits"} image={images.deposit} />

                <p onClick={() => addNew()}>
                    add new
                </p>


                <div>
                    <h3>
                        All Deposit 
                    </h3>
                    {printData}
                </div>

                <div>

                    {popupBox}
                </div>
                {alertBox}


            </section>
        )
    }



    else {


        return (

            <AlertBox massege={"You Have No permission "} >

                <button onClick={() => navigate('/panel')}>go to dashboard</button>
            </AlertBox>

        )

    }
}
export default Deposits
