import { useEffect, useState } from "react";
import AlertBox from "../components/AlertBox";
import images from "../images";
import { ID } from "appwrite";

const DataTable = ({ title = "", except = "", columns = [], data = [{}], classname, children }) => {
    const [printdata, setPrintData] = useState("");
    console.log(data, columns);

    useEffect(() => {
        setPrintData(
            <AlertBox massege={"fetching data..."} image={images.process} color="gray" />
        );

        if (data.length > 0) {
            setPrintData(
                data.map((obj, index) => (

                    <tr key={index} className="text-center border even:bg-green-100">
                        {Object.keys(obj).map((key, i) => {
                            if (String(key)[0] !== '$')
                                return (<td className=" border p-2  w-fit overflow-auto max-w-9" key={i}>{obj[key]}</td>)
                        })}
                    </tr>
                ))
            );
        } else {
            setPrintData(<p>{except}</p>);
        }
    }, []);

    return (
        <section className="container min-w-80 px-2">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="overflow-x-auto">
                <table className="border-collapse border-2 border-gray-950 mx-auto w-full">
                    <thead>
                        <tr>
                            {columns.map((ele) => <th key={ID.unique()} className="bg-green-400 border px-4 py-2">{ele}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {printdata}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default DataTable;
