import PanelSectionTitle from "../PanelComponents/PanelSectionTitle"

const Deposits = ()=>{
    const[popupBox,setPopUpBox] = useState("")

    const ShowData = () =>{

    }
    return(
        <section>
            <PanelSectionTitle title={"Deposits"} image={images.deposits}/>
            <div>
                <h2>All deposits</h2>
                {

                }
            </div>
            <div>
            {
                popupBox
            }
            </div>
        </section>
    )
}
export default Deposits