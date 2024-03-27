
import { Outlet, Route, Router, Routes, useNavigate } from 'react-router'
import './App.css'
import Footer from './components/Footer'

import Header from './components/Header'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import { store } from './store/store'




function App() {


  return (
    <>
     
      <Provider store={store}>
        <Header />
        <div className='h-screen'>
          <Outlet />
        </div>
        <div className='sticky bottom-0'>
          <Footer/>
        </div>
      </Provider>

    </>
  )
}

export default App
