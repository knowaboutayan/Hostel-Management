import Input from "../components/Input"
import { useDispatch, useSelector } from "react-redux";
import database from "../database";
import { useEffect, useState } from "react";
import AlertBox from "../components/AlertBox";
import images from "../images";
import Button from "../components/Button";
import alert from "../components/allAlerts";

const AddDeposite = ({ status }) => {
    const currenUserId = useSelector(state => state.userId)
    const currenUserName = useSelector(state => state.userName)
    const [amount, setAmount] = useState(0);
    const [member, setMember] = useState("")
    const [alertBox, setAlertBox] = useState()

    let [members, setMembers] = useState([]);


    const fetchMember = async () => {

        setAlertBox(
            <AlertBox massege={"fetching all members.... "} image={images.process} ></AlertBox>
        )
        try {
            const data = members = await database.getMembersShow()
            if (data == 'netErr') {
                setAlertBox(
                    alert.warning({ fname: () => setAlertBox("") })
                )
            }
            else {
                setMembers(data['documents'].map((member) => <option className=" cursor-pointer " key={member['phone']} value={[member.name, member.phone, member.email]} >{member['name']}</option>))
                setAlertBox("")
            }
        }
        catch (error) {
            setAlertBox(
                alert.warning({ fname: () => setAlertBox("") })
            )

        }

    }

    const addDeposite = async () => {
        setAlertBox(<AlertBox massege={"processing..."} image={images.process} onClick={() => setAlertBox("")} />)

        if (member == []) {

            setAlertBox(<AlertBox massege={"select a member"} image={images.unsuccess} onClick={() => setAlertBox("")} />)

        }

        else {

            try {
                class Deposits {

                    memberName; amount; userId;
                    constructor(member, amount) {
                        console.log(member)
                        this.memberName = member[0];
                        this.amount = amount;
                        this.userId = member[1]
                    }
                }

                const deposit = new Deposits(member.split(','), amount)

                console.log(deposit)
                const response = await database.newDepositAdd(deposit)
                if (response == 0) {
                    setAlertBox(<AlertBox massege={"succesfully add"}></AlertBox>)

                    setTimeout(() => { setAlertBox(""), status() }, 1000)


                }
                else {
                    setAlertBox(<AlertBox massege={"Errorr"} image={images.unsuccess} onClick={() => setAlertBox("")} />)
                }

            }
            catch (error) {
                setAlertBox(<AlertBox massege={"Error" + error} image={images.unsuccess} onClick={() => setAlertBox("")} />)
            }
        }
    }
    const onSubmitEventHandeler = (e) => {
        e.preventDefault()
        addDeposite()
    }
    useEffect(() => {
        fetchMember()
    }, [])
    return (
        <>
            <section>
                <form onSubmit={(e) => onSubmitEventHandeler(e)}>
                    <select className="w-full p-3 outline-green-600 justify-center rounded-lg shadow-sm my-2 bg-gray-200  font-bold  " onChange={(e) => setMember(e.target.value)} required>
                        <option value={[]}>
                            Select a member
                        </option>
                        <option value={[currenUserName, currenUserId]}>
                            Self
                        </option>
                        {members}

                    </select>
                    {member}
                    <Input type={"number"} iconName={'fa fa-inr'} placeholder={"amount"} fname={(res) => setAmount(res)} required={true} />
                    <Button type="submit" text="" classname={`mt-2 mx-auto  ${(member != "" && amount != "" && amount != 0) ? "bg-green-600" : "bg-gray-600"}`} disabled={(member != "" && amount != "") ? false : true} >
                        <i class="fa fa-cloud" aria-hidden="true" fname={() => { }}> </i> save </Button>
                </form>

            </section>

            {alertBox}
        </>
    )
}

export default AddDeposite