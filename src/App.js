import './App.css';
import React, { Component } from 'react'
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';

import NavBar from './components/NavBar/NavBar';
import BottomBar from './components/BottomBar/BottomBar';

import Loader from './components/Loding/Loder';
import Dashboard from './pages/Dashboard/Dashboard';
import SignIn from './pages/Auth/SignIn';
import RedirectBlankPage from './pages/Common/RedirectBlankPage';
import RedirectBlankPageHome from './pages/Common/RedirectBlankPageHome';
import AboutUs from './pages/PageControl/AboutUs';
import TermsCondi from './pages/PageControl/TermsCondi';
import ContactUs from './pages/PageControl/ContactUs';
import SendMail from './pages/Adds/SendMail'
import Faq from './pages/PageControl/Faq'
import AddFaqs from './pages/Adds/AddFaqs';
import EditFaq from './pages/Adds/EditFaq';
import PrivacyPolicy from './pages/PageControl/PrivacyPolicy'
import ManageCustomer from './pages/ManageCustomer/ManageCustomer';
import CustomerRequest from './pages/ManageCustomer/CustomerRequest';
import CustomerView from './pages/ManageCustomer/CustomerView';
import CustomerEdit from './pages/ManageCustomer/CustomerEdit';
import SendNotification from './pages/Notification/SendNotification';
import UserReport from './pages/ManageReports/UserReport';
import VendorReport from './pages/ManageReports/VendorReport';
import FlyerReport from './pages/ManageReports/FlyerReport';
import ChangePassword from './pages/Auth/ChangePassword';
import ManageCategory from './pages/ManageCategory/ManageCategory';
import ManageProduct from './pages/ManageProduct/ManageProduct';
import CreateProduct from './pages/ManageProduct/CreateProduct';
import ManageOrder from './pages/ManageOrder/ManageOrder';
import AcceptOrder from './pages/ManageOrder/AcceptOrder';
import CreateCustomer from './pages/ManageCustomer/CreateCustomer';
import Invoice from './pages/ManageOrder/Invoice';
import EditProduct from './pages/ManageProduct/EditProduct';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const showLoder =(isLoading)=>{
    setIsLoading(isLoading)
  }

const getFlow = ()=>{

  if(!localStorage.getItem("MAisLogin",false)){
    return (
      <>
     <Loader isActive={isLoading}/>
    <Routes>
    <Route path="/signIn" element={<SignIn type="e" isLoader={showLoder}/>}/>
    <Route path="*" element={<RedirectBlankPage />}/>

    </Routes>
      </>
    )
  }
  else{
      return (
      <>
     <Loader isActive={isLoading}/>
    <NavBar />   
    <Routes>
    <Route path="/dashboard" element={<Dashboard isLoader={showLoder}/>} />
    <Route path="/managecustomer" element={<ManageCustomer isLoader={showLoder}/>} />
    <Route path="/customer/:id" element={<CustomerView isLoader={showLoder}/>} />
    <Route path="/customer/create" element={<CreateCustomer isLoader={showLoder}/>} />
    <Route path="/vendorrequest" element={<CustomerRequest isLoader={showLoder}/>} />
    <Route path="/customeredit/:id" element={<CustomerEdit isLoader={showLoder}/>} />
    <Route path="/sendnofification" element={<SendNotification isLoader={showLoder}/>} />

    <Route path="/category" element={<ManageCategory isLoader={showLoder}/>} />
    <Route path="/product" element={<ManageProduct isLoader={showLoder}/>} />
    <Route path="/product/create" element={<CreateProduct isLoader={showLoder}/>} />
    <Route path="/product/edit/:id" element={<EditProduct isLoader={showLoder}/>} />
    <Route path="/order" element={<ManageOrder isLoader={showLoder}/>} />
    <Route path="/orderaccrej" element={<AcceptOrder isLoader={showLoder}/>} />

    <Route path="/order/invoice/:id" element={<Invoice isLoader={showLoder}/>} />

    <Route path="/reportone" element={<UserReport isLoader={showLoder}/>} />
    <Route path="/reporttwo" element={<VendorReport isLoader={showLoder}/>} />
    <Route path="/reportthree" element={<FlyerReport isLoader={showLoder}/>} />

    <Route path="/aboutus" element={<AboutUs isLoader={showLoder}/>} />
    <Route path="/terms" element={<TermsCondi isLoader={showLoder}/>} />
    <Route path="/faq" element={<Faq isLoader={showLoder}/>} />
    <Route path="/addfaq" element={<AddFaqs isLoader={showLoder}/>} />
    <Route path="/editfaq/:id" element={<EditFaq isLoader={showLoder}/>} />
    <Route path="/contactus" element={<ContactUs isLoader={showLoder}/>} />
    <Route path="/sendmail/:id" element={<SendMail isLoader={showLoder} />} />
    <Route path="/privacy" element={<PrivacyPolicy isLoader={showLoder}/>} />
    <Route path="/changepassword" element={<ChangePassword isLoader={showLoder}/>} />
 

  
    <Route path="*" element={<RedirectBlankPageHome />}/>
    </Routes>
    {/* <BottomBar /> */}
      </>
    )
  }
}

  return (
    <>
    {getFlow()}
    </>
    );
}

export default App;
