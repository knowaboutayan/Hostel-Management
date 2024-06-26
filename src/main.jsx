import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromChildren, createRoutesFromElements } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Panel from './pages/Panel.jsx'
import images from './images.js'
import Dashboard from './pages/Dashboard.jsx'
import AllExpenses from './pages/AllExpenses.jsx'
import Members from './pages/Members.jsx'
import Cards from './PanelComponents/Cards.jsx'
import SendMassege from './PanelComponents/SendMassege.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Header from './components/Header.jsx'
import Deposits from './pages/Deposits.jsx'

import Footer from './components/Footer.jsx'
import NoDataFound from './PanelComponents/NoDataFound.jsx'
import Home from './pages/Home.jsx'
import PasswordRecovery from './pages/PasswordRecovery.jsx'
import EmailVerification from './pages/EmailVerification.jsx'
import AllTransactions from './pages/All Transactions.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

const navCardsData = [

  {
    title: "All Members",
    icon: images.members,
    color: "green",
    activeClassName: "active-members",// Add the appropriate class name
    id: "members"//navigation-id
  },

  {
    title: "Deposit",
    icon: images.deposit,
    color: "green",
    activeClassName: "active-deposit", // Add the appropriate class name
    id: "deposits"//navigation-id
  },

  {
    title: "Expenses",
    icon: images.expense,
    color: "green",
    activeClassName: "active-expenses", // Add the appropriate class name
    id: "expenses"//navigation-id
  },

  {
    title: "Transactions",
    icon: images.transaction,
    color: "green",
    activeClassName: "active-expenses", // Add the appropriate class name
    id: "transaction"//navigation-id
  },

  {
    title: "Message",
    icon: images.massege,
    color: "green",
    activeClassName: "active-message", // Add the appropriate class name
    id: "massege"//navigation-id
  },

];


const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path='' element={<App />} errorElement={<ErrorPage />}>
      <Route path={"resetPassword"} element={<PasswordRecovery />} />
      <Route path="emailVerification" element={<EmailVerification />} />
      <Route path="" element={<Home />} />

      <Route path={'/panel'} element={<Panel navigation={navCardsData} />} >
        <Route path={'/panel'} element={<Dashboard />} />

        <Route path={'/panel/expenses'} element={<AllExpenses />} />
        <Route path={'/panel/members'} element={<Members />} />
        <Route path={'/panel/transaction'} element={<AllTransactions />} />
        <Route path={'/panel/massege'} element={<SendMassege />} />
        <Route path={'/panel/deposits'} element={<Deposits />} />

      </Route>

      <Route path='/*' element={<ErrorPage />} />

    </Route>

  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} className="scroll-smooth transition-all ">

  <RouterProvider router={router} />
  </Provider>
)
