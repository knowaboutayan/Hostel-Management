
import PanelSectionTitle from "./PanelSectionTitle"
import images from "../images"
import Input from "../components/Input"
import { useEffect, useState } from "react"
import database from "../database"
import AlertBox from "../components/AlertBox"
import { ID } from "appwrite"
import { useSelector } from "react-redux"


const SendMassege = () => {
    const [sendChat, setSendChat] = useState("")
    const [reciveChats, setRecieveChats] = useState([])
    const [alert, setAlert] = useState("")
    const userName = useSelector(state=>state.userName);
    const userId = useSelector(state=>state.userId);

    class NewChat {
        constructor( dateAndtime, text) {

            this.userId = userId;
            this.userName = userName;
            this.dateAndTime = dateAndtime;
            this.text = text;

        }
    }

    // send massage
    const send = async () => {

        const date = new Date()
        const newChat = new NewChat( `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`, sendChat)

        try {
            const data = await database.newChatAdd(newChat)

            if (data == 0) {
                await recieve()
            }
            else {
                setAlert(<AlertBox massege={"could not send Try again3"} image={images.senderror}><button>ok</button></AlertBox>)
            }

        }
        catch (err) {
            setAlert(<AlertBox massege={"could not send Try 3" + err} image={images.senderror}><button>ok</button></AlertBox>)


        }


    }

    //recieve massage

    const recieve = async () => {

        try {
            const data = await database.getChat()
            if (data.length > 0) {
                               setRecieveChats(data)
            }
        }
        catch (err) {
            setAlert(<AlertBox massege={"some thing went wrong\n" + err} image={images.senderror}><button onClick={() => setAlert("")}>ok</button></AlertBox>)


        }
    }
    useEffect(() => (
        () => {
            recieve()
        }
    )(), [])

    return (
        <>
{/*        
        <section className="h-full relative border-8  border-green-700 bg-green-700">
           
            <div className="h-12   text-white font-medium box-border   text-2xl ">
                <h2>masseges</h2>
            </div>
            <div className="flex-col gap-2  w-full h-full">
                <div className=" rounded-sm bg-blue-50 h-4/5 border-2 overflow-auto ">
                    {
                        reciveChats.map((chat) => <div key={ID.unique()} className=" m-2" >
                            <article className="bg-green-300 shadow-sm rounded-lg p-2  min-w-64 w-64 font-medium text-lg"><span className="text-sm">{String(chat.userName).toLowerCase()}</span>
                            <br></br>
                            <span>{chat.text}</span>
                            <p className="font-bold flex justify-end text-gray-600">
                                <span className="text-xs">{String(chat.dateAndTime).split("  ")[1]}</span>
                            </p></article>

                        </div>)
                    }
                </div>
                {alert}
                <div className=" m-auto mt-3">
                    <form className=" " onSubmit={(e) => { e.preventDefault(); send() }}>
                        <div className="flex text-center border">
                            <Input classname="w-full resize-y" value={sendChat} inputClassname="w-full" type={"text"} iconName={"fa  fa-pencil-square"} placeholder={"write something...."} fname={(res) => setSendChat(res)} required={true}>

                            </Input>
                            <button type="submit" className="-translate-x-2 bg-green-400 px-2"><i className="fa fa-paper-plane"/></button>
                        </div>
                    </form>
                </div>
            </div>
        </section> */}

        <div>
            <p className="text-3xl text-gray-500 text-center font-light"> Comming Soon...</p>
            <img src={images.maintenence} className="w-1/2 m-auto"/>
        </div>
        </>
    )
}
export default SendMassege