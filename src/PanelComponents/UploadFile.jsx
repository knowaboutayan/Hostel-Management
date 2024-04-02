import React, { useState } from "react";
import allAlerts from "../components/allAlerts";
import images from "../images";
import database from "../database";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import AlertBox from "../components/AlertBox";
import { haveProfilePic, setProfilePicFile } from "../store/slice";

const UploadFile = ({ title, requirements, classname, children, uploadTo, successfulStatus }) => {
    const [alert, setAlert] = useState("");
    const [file, setFile] = useState(null); // Initialize file state with null
    const currentUserId = useSelector(state => state.userId)
    const havingImage = useSelector(state => state.userHaveProfilePic)//user have profile pic or not




    const dispatch = useDispatch()

    //on Submit 
    const onSubmitEventHandeler = async (e) => {
        e.preventDefault()
        const newImg =  document.getElementById('uploader').files[0];
        
        //check is have any profile pic or not 
        setAlert(allAlerts.processing)
        try {
            if (havingImage) {
                await database.deleteProfilePic(currentUserId)

            }

            const response = await database.uploadProfilePic(currentUserId,newImg)

            if (response == 0) {
                const link = await database.getProfilePic(currentUserId)
                dispatch(setProfilePicFile(link))
                setAlert(<AlertBox massege={'profile picture succesfully updated!'} image={images.success} 
 color="green" />)
                setTimeout(() => { successfulStatus(); setAlert("") }, 2000)
            }
            else {
                setAlert(<AlertBox massege={'Failed to Upload!'}      image={images.unsuccess} color="orange" >
                    <Button type="button" classname="bg-red-600" text="ok" fname={() => {
                        setAlert("")
                    }}></Button>
                </AlertBox>)
            }

        }

        catch (error) {
            setAlert(<AlertBox massege={'Error::' + error}      image={images.unsuccess} color="orange" >
                <Button type="button" classname="bg-red-600" fname={() => {
                    setAlert("")
                }}></Button>
            </AlertBox>)
        }

    }

    return (
        <>
            <section>
                <div>{title}</div>
                <div>
                    <form onSubmit={(e) => onSubmitEventHandeler(e)}>
                        <section className={`flex `}>
                            <div className={`flex border-2 rounded-md  align-middle box-border mb-3 w-full focus-within:border-green-700 transition-all `}>
                                <label className=" border-r-2 flex justify-center rounded-l-md w-12 font-seri bg-gray-100 text-justify"> <i className={` text-green-700 p-2 text-lg fa fa-upload`} /> </label>
                                <input type="file" id="uploader" accept="image/png, image/jpeg,image/gif" onChange={(e) => setFile(e.target.value)} placeholder="choose your picture" className="m-auto w-full" required >
                                </input>
                            </div >
                            <span className="text-red-500 text-2xl font-medium">*</span></section>
                        <p className="text-gray-400 text-sm"># only .jpg , .png , .gif file format allowed</p>
                        <Button type="submit" className="bg-green-600" fname={() => { }}>
                            <i className="fa fa-upload" />    upload
                        </Button>
                    </form>
                </div>
                {alert}
            </section>
        </>
    );
};

export default UploadFile;
