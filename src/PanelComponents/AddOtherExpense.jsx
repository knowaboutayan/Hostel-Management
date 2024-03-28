import { useState } from "react";
import Input from "../components/Input"
import database from "../database";
import AlertBox from "../components/AlertBox";
import images from "../images";
import { useSelector } from "react-redux";

const AddOtherExpenses = ({ title, status }) => {

    const [expanseDetails, setDetails] = useState("")
    const [amount, setAmount] = useState("")

    const [alertBox, setAlertBox] = useState(null)

    const userInfo = useSelector(state => state.currentUserInfo)


    class Expenses {
        constructor(expanseDetails, amount) {
            this.Name = userInfo['name'];
            this.UserID = userInfo['phone'];
            this.expanseDetails = expanseDetails;
            this.amount = amount;
        }

    }
    const onSubmitEventHandeler = async (e) => {
        e.preventDefault()
        try {
            setAlertBox(<AlertBox massege={"adding data..."} image={images.process} ></AlertBox>)
            const expenses = new Expenses(expanseDetails, amount)
            console.log(expenses)
            const dataSubmit = await database.newExpenseAdd(expenses)

            setAlertBox(<AlertBox massege={"working please wait..."} image={images.process} >
                <p className="animate-spin border-green-600 p-8 border-8 border-l-green-200 border-solid rounded-full"></p>
            </AlertBox>)
            if (dataSubmit == 0) {
                setAlertBox(<AlertBox massege={"succesfully added"} image={images.success} ></AlertBox>)
                setTimeout(async () => await status(true), 2000)
            }
            else {
                setAlertBox(<AlertBox massege={"Error"} image={images.unsuccess} color="red" ><button onClick={() => setAlertBox("")}>OK</button></AlertBox>)
            }
        }
        catch (err) {
            setAlertBox(<AlertBox massege={"Error" + err} image={images.unsuccess} color="red" ><button onClick={() => setAlertBox("")}>OK</button></AlertBox>)
        }

    }
    return (
        <section >
            
            <form onSubmit={onSubmitEventHandeler}>
                <Input iconName={"fa fa-pencil"} type={"text"} placeholder={"expense details"} required={true} fname={(res) => setDetails(res)}></Input>
                <Input iconName={"fa fa-inr"} type={"number"} placeholder={"amount"} required={true} fname={(res) => setAmount(res)}></Input>
                <input type="submit" value={"add"} className={`px-3 py-2  w-40 rounded-lg font-semibold hover:cursor-pointer  text-white ${(expanseDetails != "" && amount != "") ? "bg-green-600 hover:bg-green-700 hover:shadow-md hover:shadow-gray-300" : "bg-gray-600"}`} disabled={(amount != "" && expanseDetails != "") ? false : true} />
            </form>
            <div>
                {alertBox}
            </div>
        </section>
    )
}
export default AddOtherExpenses