import { useEffect, useState } from "react";
import Input from "../components/Input"
import database from "../database";
import AlertBox from "../components/AlertBox";
import images from "../images";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import conf from '../conf/conf'
import Transction from "../transactionAdd";

const AddOtherExpenses = ({ title, status }) => {
    const [date, setDate] = useState("")
    const [cookCost, setCookcost] = useState(0)
    const [lpgCost, setLPGCost] = useState(0)
    const [riceCost, setRiceCost] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [otherCost, setOtherCost] = useState(0)
    const [otherCostDetails, setOtherCostDetails] = useState("")

    useEffect(
        () => {
            function totalCost() {
                setTotalCost(
                    Number(cookCost) + Number(riceCost) + Number(lpgCost) + Number(otherCost)
                )
            }
            totalCost()
        }), [cookCost, riceCost, lpgCost, otherCost]


    const [alertBox, setAlertBox] = useState(null)

    const userInfo = useSelector(state => state.currentUserInfo)


    class Expenses {
        constructor() {
            this.userId = userInfo['email'],
                this.name = userInfo['name'],
                this.date = date,
                this.lpgCost = lpgCost,
                this.cookCost = cookCost,
                this.riceCost = riceCost,
                this.otherCostDetails = otherCostDetails,
                this.otherCost = Number(otherCost),
                this.TotalCost = totalCost
        }

    }


    const onSubmitEventHandeler = async (e) => {
        e.preventDefault()
        try {
            setAlertBox(<AlertBox massege={"adding data..."} image={images.process} ></AlertBox>)
            const expenses = new Expenses()

            setAlertBox(<AlertBox massege={"working please wait..."} image={images.process} >
                <p className="animate-spin border-green-600 p-8 border-8 border-l-green-200 border-solid rounded-full"></p>
            </AlertBox>)
            let dataSubmit = await database.addToCollection(ID,conf.otherExpenseId, expenses)//expenses add

            const transaction = new Transction(userInfo['email'], userInfo['name'], date, 'debit', totalCost, "otherCost")
            dataSubmit = await database.addToCollection(ID,conf.transactionCollectionId, transaction)//addTransactionHistory


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

                <Input iconName={"fa fa-calendar"} type={'date'} placeholder={'select date '} fname={(res) => setDate(res)} required={true} />
                <fieldset className=" grid grid-flow-row   m-auto px-1 py-3   justify-center rounded-lg bg-stone-200 border-double border-2 ">
                    <legend className="text-wrap break-words text-gray-500 font-bold  tracking-wider bg-stone-200 p-3 rounded-full text-xl  text-center">Other Expenses</legend>
                    <div className=" p-2 flex flex-row flex-wrap justify-around items-center">

                        <Input classname="w-1/2 min-w-64" iconName={"fa fa-inr"} type={'number'} placeholder={'payment of cook'} fname={(res) => setCookcost(res)} required={true} />
                        <Input classname="w-1/2 min-w-64" iconName={"fa fa-inr"} type={'number'} placeholder={'cost of LPG'} fname={(res) => setLPGCost(res)} required={true} />
                        <Input classname="w-1/2 min-w-64" iconName={"fa fa-inr"} type={'number'} placeholder={'cost of Rice'} fname={(res) => setRiceCost(res)} required={true} />
                        <Input classname="w-1/2 min-w-64" iconName={"fa fa-pencil"} type={"text"} placeholder={"Other expense details"} required={false} fname={(res) => setOtherCostDetails(res)}></Input>
                        <Input classname="w-1/2 min-w-64" iconName={"fa fa-inr"} type={"number"} placeholder={"Othe expense amount"} required={(otherCostDetails != "") ? true : false} fname={(res) => setOtherCost(res)}></Input>

                    </div>
                </fieldset>
                <p className=" break-words text-wrap hover:cursor-not-allowed text-xl w-fit p-3 m-auto mt-2 border-2 border-green-600 font-mono font-medium  rounded-xl mb-2 bg-green-200 text-gray-500 text-center">
                    <big><b>TotalCost</b></big><br></br> {totalCost}
                </p>

                <Button type="submit" text="" classname={`mt-2 mx-auto  ${!(Number(totalCost) <= 0 || (Number(otherCost) <= 0 && otherCostDetails != "")) ? "bg-green-600 hover:bg-green-700 hover:shadow-md hover:shadow-gray-300" : "bg-gray-600"}`} disabled={(Number(totalCost) <= 0 || (Number(otherCost) <= 0 && otherCostDetails != "")) ? true : false} >
                    <i class="fa fa-cloud" aria-hidden="true"> </i> save</Button>
            </form>
            <div>
                {alertBox}
            </div>
        </section>
    )
}
export default AddOtherExpenses