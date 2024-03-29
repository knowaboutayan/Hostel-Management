
import { Outlet, Route, Router, Routes, useNavigate } from 'react-router'
import './App.css'
import Footer from './components/Footer'

import Header from './components/Header'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Panel from './pages/Panel'




function App() {


  return (
    <>
     
      <Provider store={store} className="scroll-smooth transition-all border-2 border-pink-600">
     
        <div className='border-4  box-border overflow-auto border-blue-800 w-screen h-screen '>
        <Outlet/>
        </div>
       
      </Provider>

    </>
  )
}

export default App
