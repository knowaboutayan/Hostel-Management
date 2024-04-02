import { useEffect, useState } from "react";
import Input from "../components/Input"
import database from "../database";
import AlertBox from "../components/AlertBox";
import images from "../images";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import Transction from "../transactionAdd";
import conf from "../conf/conf";

const AddExpenses = ({ title, status }) => {
    const [name, setName] = useState("")
    const [fish, setFish] = useState(0)
    const [egg, setEgg] = useState(0)
    const [meat, setMeat] = useState(0)
    const [grocery, setGrocery] = useState(0)
    const [vegetable, setVegetable] = useState(0)
    const [date, setDate] = useState(0)
    const [alertBox, setAlertBox] = useState(null)
    const userInfo = useSelector(state => state.currentUserInfo)
    const [totalCost, setTotalCost] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        function totalCost() {
            setTotalCost(
                Number(fish) + Number(egg) + Number(meat) + Number(grocery) + Number(vegetable))
        }
        totalCost()
    }, [fish, egg, meat, vegetable, grocery])

    const onSubmitEventHandeler = async (e) => {
        e.preventDefault()

        class Expenses {
            constructor() {
                this.name = userInfo['name'];
                this.userId = userInfo['$id'];
                this.egg = Number(egg);
                this.fish = Number(fish);
                this.vegetable = Number(vegetable);
                this.meat = Number(meat);
                this.date = date;
                this.grocery = Number(grocery);
                this.total = Number(totalCost)
                this.date = date;
            }

        }
        try {
            setAlertBox(<AlertBox massege={"adding data..."} image={images.process} ></AlertBox>)
            const expenses = new Expenses(vegetable, grocery, fish, egg, meat, date)

            const dataSubmit = await database.addToCollection(conf.expenseId, expenses)// add o expense 
            setAlertBox(<AlertBox massege={"working please wait..."} image={images.process} >
                <p className="animate-spin border-green-600 p-8 border-8 border-l-green-200 border-solid rounded-full"></p>
            </AlertBox>)
            if (dataSubmit == 0) {
                setAlertBox(<AlertBox massege={"succesfully added"} image={images.success} 
 color="green" ></AlertBox>)
                const transaction = new Transction(userInfo['email'], userInfo['name'], date, 'debit', totalCost, "daily marcketing cost")

                 await database.addToCollection(conf.transactionCollectionId, transaction)//addTransactionHistory

                setTimeout(async () => await status(true), 2000)
            }
            else {
                setAlertBox(<AlertBox massege={"Error"}   image={images.unsuccess} color="orange"    ><button onClick={() => setAlertBox("")}>OK</button></AlertBox>)
            }
        }
        catch (err) {
            setAlertBox(<AlertBox massege={"Error" + err}   image={images.unsuccess} color="orange"    ><button onClick={() => setAlertBox("")}>OK</button></AlertBox>)
        }

    }





    return (
        <section>

            <form onSubmit={onSubmitEventHandeler}>
                <Input iconName={"fa fa-calendar"} type={"date"} placeholder={"date"} required={true} fname={(res) => setDate(res)}></Input>

                <fieldset className=" grid grid-flow-row   m-auto px-1 py-3   justify-center rounded-lg bg-stone-200 border-double border-2 ">
                    <legend className="text-wrap break-words text-gray-500 font-bold  tracking-wider bg-stone-200 p-3 rounded-full text-xl  text-center">Today's Marketing Cost</legend>
                    <div className="   p-3 flex flex-row flex-wrap justify-around items-center">

                        <Input classname="w-1/2 min-w-64" iconName={"fa fa-inr"} type={"number"} placeholder={"Vegetable Cost"} required={true} fname={(res) => setVegetable(Number(res))} require={true}></Input>

                        <Input classname="w-1/2 min-w-64" iconName={"fa fa-inr"} type={"number"} placeholder={"Grocery Cost"} required={true} fname={(res) => setGrocery(Number(res))} require={true}></Input>

                        <Input classname="w-1/2 min-w-64" iconName={"fa fa-inr"} type={"number"} placeholder={"Fish Cost"} required={true} fname={(res) => setFish(Number(res))} require={true}></Input>

                        <Input classname="w-1/2 min-w-64" iconName={"fa fa-inr"} type={"number"} placeholder={"Egg Cost"} required={true} fname={(res) => setEgg(Number(res))} require={true}></Input>

                        <Input classname="w-1/2 min-w-64" iconName={"fa fa-inr"} type={"number"} placeholder={"Meat Cost"} required={true} fname={(res) => setMeat(Number(res))} require={true}></Input>

                    </div>
                </fieldset>

                <p className=" break-words text-wrap hover:cursor-not-allowed text-xl w-fit p-3 m-auto mt-2 border-2 border-green-600 font-mono font-medium  rounded-xl mb-2 bg-green-200 text-gray-500 text-center">
                    <big><b>TotalCost</b></big><br></br> {totalCost}
                </p>
                <Button type="submit" text="" classname={`mt-2 mx-auto float-right  ${(date != "") ? "bg-green-600 hover:bg-green-700 hover:shadow-md hover:shadow-gray-300" : "bg-gray-600"}`} disabled={(date != "") ? false : true} >
                    <i class="fa fa-cloud" aria-hidden="true"> </i> save</Button>
            </form>
            <div>
                {alertBox}
            </div>
        </section>
    )
}
export default AddExpenses