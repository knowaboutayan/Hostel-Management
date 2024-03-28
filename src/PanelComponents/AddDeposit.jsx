import Input from "../components/Input"
import { useDispatch, useSelector } from "react-redux";
import database from "../database";
import { useEffect, useState } from "react";
import AlertBox from "../components/AlertBox";
import images from "../images";

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
            const data=members = await database.getMembersShow()
           
            setMembers(data['documents'].map((member) => <option key={member['$id']} value={[member.name, member.$id]} >{member['name']}</option>))
            setAlertBox("")
        }
        catch (error) {
            setAlertBox(
                <AlertBox massege={"can not fetch" + error} image={images.unsuccess} ></AlertBox>
            )

        }

    }

    const addDeposite = async () => {
        setAlertBox(<AlertBox massege={"processing..."} image={images.process} onClick={() => setAlertBox("")} />)
        class Deposits {
            constructor(member, amount) {
                this.memberName = member[0];
                this.amount = amount;
                this.userId = member[1]
            }

        }
        if (member == []) {
            setAlertBox(<AlertBox massege={"select a member"} image={images.unsuccess} onClick={() => setAlertBox("")} />)
            return
        }
        else {

            try {
                const deposit = new Deposits(member, amount)
                console.log(deposit)
                const response = await database.newDepositAdd(deposit)
                console.log(response)
                if (response == 0) {
                    setAlertBox(<AlertBox massege={"succesfully add"}></AlertBox>)
                    setTimeout(() => status(true), 1000)

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
                    <select onChange={(e) => { console.log(e.target.value); setMember(e.target.value) }} required>
                        <option value={[]}>
                            Select a member
                        </option>
                        <option value={[currenUserName, currenUserId]}>
                            Self
                        </option>
                        {members}
                    </select>
                    <Input type={"number"} iconName={'fa fa-inr'} placeholder={"amount"} fname={(res) => setAmount(res)} required={true} />
                    <button type="submit" className={`w-40 py-2 rounded-lg text-white ${!(member == [] && amount == 0 || amount === "") ? "bg-green-600" : "bg-gray-600"}`}>
                        Add
                    </button>
                </form>

            </section>
            {alertBox}
        </>
    )
}

export default AddDeposite