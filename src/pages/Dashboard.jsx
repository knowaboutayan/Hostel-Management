import Cards from "../PanelComponents/Cards"
import PanelSectionTitle from "../PanelComponents/PanelSectionTitle"
import images from "../images"

const Dashboard = ({ children = "" }) => {
    return (
        <div className="">
            <div className='bg-red-600 '>
            <Cards title="Expenses" icon={images.expense} color="red" navigateTo={"/panel/expenses"} />
            <Cards title="All Members" icon={images.members} color={'green'} navigateTo={"/panel/members"} />
          </div>
            <div>      {children}</div>
        </div>
    )
}
export default Dashboard