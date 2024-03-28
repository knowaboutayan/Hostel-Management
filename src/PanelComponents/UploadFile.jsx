import React, { useState } from "react";
import AlertBox from "../components/AlertBox";
import images from "../images";
import database from "../database";
import Button from "../components/Button";

const UploadFile = ({ title, requirements, classname, children, uploadTo, fname }) => {
    const [alert, setAlert] = useState("");
    const [file, setFile] = useState(null); // Initialize file state with null

    const uploadFile = async (e) => {
        e.preventDefault();
        setAlert(<AlertBox massege={"uploading..."} image={images.process} />);
        try {
            // Create FormData object to append the file
            const formData = new FormData();
            formData.append("file", file); // Append the file to FormData

            const res = {
                userId: '222',
                file: file
            };
            console.log(file)
            // Pass formData to uploadTo function
            const response = await database.uploadProfilePic(file);

            setAlert(<AlertBox massege={"success..."} image={images.success} />);

            setTimeout(() => {
                fname();
            }, 1000);
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <>
            <section>
                <div>{title}</div>
                <div>
                    <div>
                        <div>
                            <form onSubmit={uploadFile}>
                                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])} // Set file to the selected file
                                    required
                                />
                                <Button type="submit" className="bg-green-600">
                                <i className="fa fa-upload"/>    upload
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UploadFile;
