import { useState } from "react";
import Input from "../components/Input"
import database from "../database";
import AlertBox from "../components/AlertBox";
import images from "../images";
import { useSelector } from "react-redux";

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

    class Expenses {
        Name;
        UserID;
        Fish; Egg; Meat;
        Grocery
        TotalCost;
        Vegetable;
        submitDate;
        constructor(Vegetable, Grocery, Fish, Egg, Meat, submitDate) {
            this.Name = userInfo['name'];
            this.UserID = userInfo['phone'];
            this.Egg = Number(Egg);
            this.Fish = Number(Fish);
            this.Vegetable = Number(Vegetable);
            this.Meat = Number(Meat);
            this.submitDate = submitDate;
            this.Grocery = Number(Grocery);
            this.TotalCost = Number(this.Vegetable + this.Grocery + this.Meat + this.Egg + this.Fish)
        }

    }
    const onSubmitEventHandeler = async (e) => {
        e.preventDefault()
        try {
            setAlertBox(<AlertBox massege={"adding data..."} image={images.process} ></AlertBox>)
            const expenses = new Expenses( vegetable, grocery, fish, egg, meat, date)
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
        <section className={`p-4 relative w-full min-w-80 bg-gray-50 border-2 border-green-600 mx-auto rounded-lg shadow-lg shadow-gray-700`}>
            <div className="flex mb-2  items-center font-medium text-2xl text-green-600  ">
                <img src={images.expense} alt="addMember" width={"50px"} className="rounded-full bg-green-300 p-2" />
                <hr className="h-12 mx-2 w-1 bg-green-500"></hr>
                <h2>
                    Add New Expense
                </h2>
            </div>
            <hr className="w-full h-1 bg-green-500 mb-2 rounded-lg"></hr>
            <form onSubmit={onSubmitEventHandeler}>
              

                <Input iconName={"fa fa-calendar"} type={"date"} placeholder={"date"} required={true} fname={(res) => setDate(res)}></Input>

                <fieldset className="flex flex-row flex-wrap text-green-600 justify-center rounded-lg bg-gray-100 border-double border-2 border-gray-100">
                    <legend className=" bg-gray-100 p-3 rounded-full text-xl font-extrabold text-center">Today's Marketing Cost</legend>

                    <Input classname="w-1/3 min-w-60" iconName={"fa fa-inr"} type={"number"} placeholder={"Vegetable Cost"} required={true} fname={(res) => setVegetable(Number(res))} require={true}></Input>

                    <Input classname="w-1/3 min-w-60" iconName={"fa fa-inr"} type={"number"} placeholder={"Grocery Cost"} required={true} fname={(res) => setGrocery(Number(res))} require={true}></Input>

                    <Input classname="w-1/3 min-w-60" iconName={"fa fa-inr"} type={"number"} placeholder={"Fish Cost"} required={true} fname={(res) => setFish(Number(res))} require={true}></Input>

                    <Input classname="w-1/3 min-w-60" iconName={"fa fa-inr"} type={"number"} placeholder={"Egg Cost"} required={true} fname={(res) => setEgg(Number(res))} require={true}></Input>

                    <Input classname="w-1/3 min-w-60" iconName={"fa fa-inr"} type={"number"} placeholder={"Meat Cost"} required={true} fname={(res) => setMeat(Number(res))} require={true}></Input>
                </fieldset>
                <p className="text-xl font-bold">TotalCost:{vegetable + grocery + meat + fish + egg}</p>
                <input type="submit" value={"add"} className={`px-3 py-2  w-40 rounded-lg font-semibold hover:cursor-pointer  text-white ${(date != "") ? "bg-green-600 hover:bg-green-700 hover:shadow-md hover:shadow-gray-300" : "bg-gray-600"}`} disabled={(date != "") ? false : true} />
            </form>
            <div>
                {alertBox}
            </div>
        </section>
    )
}
export default AddExpenses