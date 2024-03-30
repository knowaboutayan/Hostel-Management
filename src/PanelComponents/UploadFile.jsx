import React, { useState } from "react";
import allAlerts from "../components/allAlerts";
import images from "../images";
import database from "../database";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import AlertBox from "../components/AlertBox";
import { haveProfilePic } from "../store/slice";

const UploadFile = ({ title, requirements, classname, children, uploadTo, successfulStatus }) => {
    const [alert, setAlert] = useState("");
    const [file, setFile] = useState(null); // Initialize file state with null
    const currentUserId = useSelector(state => state.userId)
    const havingImage = useSelector(state => state.userHaveProfilePic)//user have profile pic or not
  


    const dispatch = useDispatch()
    //if already have a image then delete it first *** for case of updation of pic
    const deleteFile = async (e) => {
        setAlert(<AlertBox massege={"removing previous image....."} image={images.process} color="gray" />);
        try {
            //if already have a image then delete it first *** for case of updation of pic
            const response = await database.deleteProfilePic(currentUserId);
           
            if (response == 0) {
                setAlert(<AlertBox massege={"previous image removed"} image={images.success} />);
             
               
                return 0//success
            }
            else if (response == -1) {
                (
                    setAlert(allAlerts.warning({ fname: () => setAlert("") })))
       
                return 1//unsuccess
            }
        }
        catch (error) {
            
            setAlert(allAlerts.unsuccessful({ fname: () => setAlert("") }))
            return 1//unsuccess
        }
    }
    //upload a file
    const uploadFile = async (newImg) => {


        let response = 0
        try {
            //if already have a image then delete it first *** for case of updation of pic

            //if no image then.... OR updating image....
            setAlert(allAlerts.processing)
            if (response == 0)
                response = await database.uploadProfilePic(currentUserId, newImg);
          
            setAlert(<AlertBox massege={"success"} image={images.success} />);

            setTimeout(() => {
                successfulStatus()

                dispatch(haveProfilePic(true))//updating at slice that  user have a file..
            }, 1000);

        }

        catch (error) {
                  }
    }
    const onSubmitEventHandeler = async (e) => {
        e.preventDefault()
        if (havingImage) {
            await deleteFile()
        }
        const newImg = document.getElementById('uploader').files[0];
        await uploadFile(newImg)
        
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
