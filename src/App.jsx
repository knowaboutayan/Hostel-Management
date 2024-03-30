
import { Outlet, Route, Router, Routes, useNavigate } from 'react-router'
import './App.css'

import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <>

      <Provider store={store} className="scroll-smooth transition-all ">

        <div className=' box-border overflow-auto w-screen h-screen '>
          <Outlet />
        </div>

      </Provider>

    </>
  )
}

export default App
