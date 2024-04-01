import images from "../images";
import AlertBox from "./AlertBox";
import Button from "./Button";

const alert = {
    processing: <AlertBox massege={"please wait..."} image={images.process} color="gray" />,
    successful: <AlertBox massege={"succesful"} image={images.success} color="green" />,
    unsuccessful:({fname})=> <AlertBox massege={"unsuccessful"}   image={images.unsuccess} color="orange"   >
        <Button className="bg-red-500 text-white  p-3 shadow-lg shadow-gray-400 text-lg font-medium" fname={()=>fname()}> close </Button>
    </AlertBox>,
    warning:({fname})=> <AlertBox massege={"unsuccessful"} image={images.alert} color="yellow">
        <Button className="bg-yellow-500 text-white  p-3 shadow-lg shadow-gray-400 text-lg font-medium" fname={()=>fname()} > close </Button>
    </AlertBox>,
    


}
export default alert