import { useEffect, useState } from "react"

import PopUp from "../components/PopUp"
import images from "../images"
import MembersAdd from "../PanelComponents/MembersAdd"
import PanelSectionTitle from "../PanelComponents/PanelSectionTitle"
import AlertBox from "../components/AlertBox"
import database from "../database"
import DataTable from "../PanelComponents/DataTable"
import NoDataFound from "../PanelComponents/NoDataFound"
import conf from "../conf/conf"

const Members = ({ }) => {
    const [box, setBox] = useState("")
    const [isMemberAdded, setIsMemberAdded] = useState(false)
    const [printData, setPrintData] = useState("")
    const [totalMember, setTotalMember] = useState(0)

    //add new member form show .......
    const addNewMember = () => {
        setBox(<AlertBox massege={"Loading"} image={images.process} color="blue" />)
        setBox(<PopUp title="Add New Member" icon={images.newMember} isPopUpClose={(res) => setIsPopUpClose(true)} close_btn={() => setBox("")} ><MembersAdd title={"Add New Member"} status={() => setIsMemberAdded(true)} /></PopUp>)
    }

    //print user data....
    const printUserData = async () => {
        setPrintData(<AlertBox massege={"please wait..."} image={images.process} color="blue" />)
        try {
            const data = await database.getListOfDocuments(conf.collectionId)
            setTotalMember(data['documents'].length)
            if (data.documents.length > 0 && data != null) {
                setPrintData(<AlertBox image={images.success}
                    color="green" massege={"succesfully fatched"} />)
                setPrintData(<DataTable deltePerform={() => setIsMemberAdded((pre) => !pre)} title="All Members Information" except="No Member add" columns={Object.keys(data['documents'][0]).filter((key) => { if (!String(key).startsWith('$', 0)) { return (key) } })} data={data["documents"]} />)
            }
            else if (String(totalMember) == '0') {
                setPrintData(<NoDataFound />)
            }
            else {
                setPrintData(<p>No members found</p>)
            }
        }
        catch (err) {
            setPrintData(<AlertBox image={images.unsuccess} color="orange" massege={"Error " + err}><button onClick={() => setPrintData("")}>ok</button></AlertBox>)
        }

    }

    //user effect ......
    useEffect(() => {
        setBox("")
        setIsMemberAdded(false)
        printUserData()
    }, [isMemberAdded])



    return (

        <section className="w-full">

            <div className=" flex justify-between flex-wrap items-center text-gray-500 font-bold text-xl border px-5 ">
                <p>Total Member:<big>{totalMember}</big></p>
               
            </div>
            <div className="m-auo ">
                {printData}
            </div>
            <div>
                {box}
            </div>
        </section>
    )
}
export default Members