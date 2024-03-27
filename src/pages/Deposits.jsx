import PanelSectionTitle from "../PanelComponents/PanelSectionTitle";
import PopUp from "../components/PopUp";
import database from "../database";
import Input from "../components/Input";
import AlertBox from "../components/AlertBox";
import { useState } from "react";
import images from "../images";

const Deposits = () => {
    const [popupBox, setPopUpBox] = useState("");
    const [alertBox, setAlertBox] = useState("");
   

class Deposit{
    constructor({memberName,memberId},amount){
        this.memberName=memberName;
        this.memberId = memberId;
        this.amount=amount

    }
}

    const onSubmitEventHandeler = async (e,data) => {
        e.preventDefault();
        setAlertBox(<AlertBox massege={"submitting..."}></AlertBox>);
        
        try {
            
            // Construct Deposit object
           
            console.log(deposit);
            
            // Call the API method to add deposit
            await database.newDepositAdd(data);
        } catch (err) {
            console.log(err);
            alert("dipositpanel", err);
        }
    }

    const addDeposit = async () => {
        const memberList = await database.getMembersShow();
        const [amount, setAmount] = useState("");
        const [memberInfo, setMemberInfo] = useState("");
        
        setPopUpBox(
            <PopUp close_btn={() => setPopUpBox("")}>
                <form onSubmit={(e)=>onSubmitEventHandeler(e,JSON.stringify({ memberName: memberInfo.memberName, userId:me,amount:amount }))}>
                    <select onChange={(e) => setMemberInfo(JSON.parse(e.target.value))}>
                        <option value={""}>select a member</option>
                        {memberList['documents'].map((member) => (
                            <option key={member['$id']} value={JSON.stringify({ memberName: member['name'], memberId: member['$id'] })}>
                                {member['name']}
                            </option>
                        ))}
                    </select>
                    {amount}
                    <Input type={"text"} fname={(res) => setAmount(res)}></Input>
                    <button type="submit">Submit</button>
                </form>
            </PopUp>
        );
    }

    return (
        <section>
            <PanelSectionTitle title={"Deposits"} image={images.deposit} />
            <div>
                <h2>All deposits</h2>
                <i onClick={() => addDeposit()}>Deposit</i>
            </div>
            {memberInfo['memberName']}
            <div>
                {popupBox}
            </div>
            {alertBox}
        </section>
    )
}

export default Deposits;
