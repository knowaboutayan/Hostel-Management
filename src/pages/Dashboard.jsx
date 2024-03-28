import PanelSectionTitle from "../PanelComponents/PanelSectionTitle"
import images from "../images"

const Dashboard = ({ children = "" }) => {
    return (
        <div className="h-screen">
            
            <div>      {children}</div>
        </div>
    )
}
export default Dashboard