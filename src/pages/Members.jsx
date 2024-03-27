import { useEffect, useState } from "react"

import PopUp from "../components/PopUp"
import images from "../images"
import MembersAdd from "../PanelComponents/MembersAdd"
import PanelSectionTitle from "../PanelComponents/PanelSectionTitle"
import AlertBox from "../components/AlertBox"
import database from "../database"
import DataTable from "../PanelComponents/DataTable"

const Members = ({ }) => {
    const [box, setBox] = useState("")
    const [isMemberAdded, setIsMemberAdded] = useState(false)
    const [printData, setPrintData] = useState("")
    const [totalMember, setTotalMember] = useState(0)
    const addNewMember = () => {
        setBox(<AlertBox massege={"Loading"} image={images.process} color="blue" />)
        setBox(<PopUp isPopUpClose={(res) => setIsPopUpClose(true)} close_btn={() => setBox("")} ><MembersAdd title={"Add New Member"} status={() => setIsMemberAdded(true)} /></PopUp>)
    }
    const userInfo = async () => {
        setPrintData(<AlertBox massege={"please wait..."} image={images.process} color="blue" />)
        try {
            const data = await database.getMembersShow()
            setTotalMember(data['documents'].length)
            if (data.documents.length > 0 && data != null) {
                setPrintData(<AlertBox image={images.success} massege={"succesfully fatched"} />)
                setPrintData(<DataTable title="Members Information" except="No Member add" columns={Object.keys(data['documents'][0]).filter((key) => { if (!String(key).startsWith('$', 0)) { return (key) } })} data={data["documents"]} />)
            }
            else {
                setPrintData(<p>No data Found</p>)
            }
        }
        catch (err) {
            setPrintData(<AlertBox image={images.unsuccess} color="red" massege={"Error " + err}><button onClick={() => setPrintData("")}>ok</button></AlertBox>)
        }

    }
    useEffect(() => {
        setBox("")
        setIsMemberAdded(false)
        userInfo()
    }, [isMemberAdded])



    return (

        <section className="w-full">

            <PanelSectionTitle title={"All Members Details"} image={images.members} alt={"members"}>
            </PanelSectionTitle>
            <div className=" flex justify-between flex-wrap items-center text-gray-500 font-bold text-xl border px-5 ">
                <p>Total Member:<big>{totalMember}</big></p>
                <button onClick={() => addNewMember()} type="button" className=" px-3 py-2  text-lg text-white rounded-lg shadow-lg bg-green-600"><i className="fa fa-plus-circle"></i>Add New Member</button>
            </div>
            <div>
                {printData}
            </div>
            <div>
                {box}
            </div>
        </section>
    )
}
export default Members