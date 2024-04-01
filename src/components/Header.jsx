import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import { useNavigate } from 'react-router';
import Button from './Button';
import images from '../images';
import PopUp from './PopUp';
import Login from '../pages/Login'
import { useSelector } from 'react-redux';
import MembersAdd from '../PanelComponents/MembersAdd';

const Header = ({ logo = "", navList = [] }) => {

    const navigate = useNavigate()
    const [popup, setPopUp] = useState()

    const isLogin = useSelector(state => state.isUserLogin)
    const currentUserName = useSelector(state => state.userName)
    const profilePicFile = useSelector(state => state.profilePicFile)
    const [navShow,setNavShow] = useState(false)
    const showNav = (res)=>{
        setNavShow(pre=>!pre)
        

    }

    return (
        <header className="bg-gray-300  shadow shadow-gray-700 py-4 px-8 flex justify-between items-center flex-wrap">
            <div className='sm:hidden block'>

                <i className={`fa fa-${navShow?'bars':"times"} cursor-pointer text-4xl text-gray-600 `} onClick={()=>showNav()}/>
            </div>
            <div className="flex items-center">
                <img src={profilePicFile || images.user} alt="logo" className="rounded-full border-2 bg-gray-300 h-8 mr-4" />
                
            </div>
            <div className={` gap-4 items-center flex-wrap sm:flex ${navShow?"hidden ":"h-max transition-all"} `}>
                {/* conditional rendering for user login or not  */}
                {!isLogin ? (
                    <>
                        <Button fname={() => setPopUp(<PopUp title='SignUp' icon={images.user} close_btn={() => setPopUp("")}>
                            <MembersAdd />
                        </PopUp>)} className="bg-green-600">
                            <i className=' fa fa-sign-up' /> SignUp
                        </Button>
                        <Button fname={() => setPopUp(<PopUp title='Login' icon={images.login} close_btn={() => setPopUp("")}>
                            <Login />
                        </PopUp>)} className="bg-green-600">
                            <i className=' fa fa-sign-in' />LogIn
                        </Button>
                    </>
                ) : (
                    <Button fname={() => navigate('/panel')}>
                        welcome back {String(currentUserName).split(" ")[0]}
                    </Button>
                )}

                <Input
                    iconName="fa fa-search"
                    type="search"
                    fname={() => null}
                    placeholder="Search here..."
                    className="mt-4 w-full"
                />
                <div className="flex gap-4 items-center">
                    <i className="fa fa-facebook text-xl"></i>
                    <i className="fa fa-twitter text-xl"></i>
                    <i className="fa fa-whatsapp text-xl"></i>
                </div>
                {popup}
            </div>
        </header>
    )
}

export default Header;
