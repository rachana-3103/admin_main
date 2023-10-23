import React from 'react'
import { Link } from "react-router-dom";
import {logOutRedirectCall} from "../../../pages/Common/RedirectPathMange"
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import $ from "jquery";

export default function SideBar() {
  return (
    <>
    {/* <Helmet>
    <script>{`@media (max-width: 1199px) {
    .ls-closed section.content {
        margin-left: 260px;
    }

    .ls-closed .sidebar {
        margin-left: 0px;
        margin-top: 50px;
    }
}`}</script>
    </Helmet> */}
    <aside id="leftsidebar" className="sidebar">
    <div className="user-info" style={{background:'#fff'}}>
    <div class="image">
            <img src="http://13.238.15.59/api/logo192.png" width="50" height="50" alt="User" />
        </div>
        <div className="info-container">
            <div className="name">{localStorage.getItem("MAname")}</div>
            <div className="email">{localStorage.getItem("MAemail")}</div>
        </div>
    </div>
    <div className="menu">
        <ul className="list">
        <li class="header"></li>
            <li><Link to="/dashboard"><i className="zmdi zmdi-view-dashboard"></i><span>Dashboard</span> </Link> </li>
            {/* <li class="header"></li> */}
            <li><Link to="/managecustomer"><i className="zmdi zmdi-account"></i><span>Customers</span> </Link> </li>
            {/* <li><Link to="/vendorrequest"><i className="zmdi zmdi-accounts-add"></i><span>Manage Vendor Request</span> </Link> </li> */}
            <li><Link to="/category"><i className="zmdi zmdi-store"></i><span>Category</span> </Link> </li>
            <li><Link to="/product"><i className="zmdi zmdi-store"></i><span>Products</span> </Link> </li>
            {/* <li><Link to="/orderaccrej"><i className="zmdi zmdi-store"></i><span>Accept Reject Order</span> </Link> </li> */}
            <li><Link to="/order"><i className="zmdi zmdi-shopping-basket"></i><span>Orders</span> </Link> </li>
            {/* <li><Link to="/sendnofification"><i className="zmdi zmdi-notifications-add"></i><span>Send Notification</span> </Link> </li> */}
            
            <li class="header">Manage Reports</li>
            {/* <li><Link to="/reportone"><i className="zmdi zmdi-assignment"></i><span>Customers Reports</span> </Link> </li> */}
            <li><Link to="/reporttwo"><i className="zmdi zmdi-assignment"></i><span>Customer Reports</span> </Link> </li>
            <li><Link to="/reportthree"><i className="zmdi zmdi-assignment"></i><span>Order Reports</span> </Link> </li>

            <li class="header">Page Control</li>
            <li><Link to="/aboutus"><i className="zmdi zmdi-assignment"></i><span>About Us</span> </Link> </li>
            <li><Link to="/terms"><i className="zmdi zmdi-assignment"></i><span>Terms &amp; Conditions</span> </Link> </li>
            <li><Link to="/privacy"><i className="zmdi zmdi-assignment"></i><span>Privacy Policy</span> </Link> </li>
            <li><Link to="/faq"><i className="zmdi zmdi-assignment"></i><span>FAQ's</span> </Link> </li>
            <li><Link to="/contactus"><i className="zmdi zmdi-account"></i><span>Contact Us</span> </Link> </li>
            <li class="header"></li>
            <li><Link to="/changepassword"><i className="zmdi zmdi-key"></i><span>Change Password</span> </Link> </li>
            <li> <a onClick={()=>{
Swal.fire({
    title: 'Are you sure You want to Signout ?',
    icon: 'warning',
    showDenyButton: true,
    confirmButtonText: 'Signout',
    denyButtonText: `Cancel`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Successfully Signout',
        timer: 1500,
        showConfirmButton: false
      })
      setTimeout(() => {
          logOutRedirectCall();
      }, 1500);
    } else if (result.isDenied) {
    }
  })}}><i className="zmdi zmdi-power-off"></i><span>Sign Out</span> </a> </li>
        </ul>
    </div>
</aside>    
</>
  )
}
