import React from 'react';
import Input from '../components/Input';
import { useNavigate } from 'react-router';

const Header = ({ logo = "", navList = [] }) => {
    const navigate=useNavigate()
    return (
        <header className="bg-green-300 py-4 px-8 flex justify-between items-center">
            <div className="flex items-center">
                <img src={logo} alt="logo" className="h-8 mr-4" />
                <nav className="flex flex-row gap-4">
                    {navList.map((item, index) => (
                        <span key={index} className="text-black hover:text-green-600 active:text-green-700 text-sm font-serif px-2 py-1 hover:bg-gray-400">
                            {item}
                        </span>
                    ))}
                </nav>
            </div>
            <div className="flex gap-4 items-center">
                <button onClick={()=>navigate('login')} className="bg-white text-black px-4 py-2 rounded-md border border-black hover:bg-gray-200">
                    LogIn
                </button>
                <Input
                    iconName="fa fa-search"
                    type="search"
                    fname={() => null}
                    placeholder="Search here..."
                />
                <div className="flex gap-4 items-center">
                    <i className="fab fa-facebook text-xl"></i>
                    <i className="fab fa-twitter text-xl"></i>
                    <i className="fab fa-whatsapp text-xl"></i>
                </div>
            </div>
        </header>
    )
}

export default Header;
