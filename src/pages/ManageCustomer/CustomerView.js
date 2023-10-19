import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { manageCustomer } from '../../api/apiHandler';
import { Helmet } from 'react-helmet';

function CustomerView() {
  const navigate = useNavigate()

  const ist = window.location.pathname.split('/')[2]
  const [hello, setHello] = useState([]);

  useEffect(() => {
    Swal.fire({
      title: 'Please wait...',
      didOpen: () => {
        Swal.showLoading()
      }
    })
    getonload();
  }, []);
  const getonload = () => {
    manageCustomer({ id: ist }).then((response) => {
      if (response.data.code == 1) {
        Swal.close();
        setHello(response.data.data[0])
      } else {
        Swal.close()
      }
    });
  }

  return (
    <>
      <Helmet>
        <script>{`
                  $(document).ready(function() {
                      $('body').magnificPopup({
                      delegate: '.image-popup',
                      type: 'image',
                      image:{
                              verticalFit:true,
                      },
                      zoom:{
                              enabled:true,
                              duration:300
                      }
                  });
                  });`}</script>
        <style>{`.gmap_canvas {overflow:hidden;background:none!important;height:100%;width:100%;} .mapouter{position:relative;text-align:right;height:100%;width:100%;}`}</style>
      </Helmet>
      <section className="content home">
        <div className="block-header">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h2>Customer Details
                <small className="text-muted"></small>
              </h2>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12">
              <ul className="breadcrumb float-md-right">
                {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                {/* <li className="breadcrumb-item">Customers</li> */}
                <li className="breadcrumb-item active">View Customer Details</li>
              </ul>
            </div>
          </div>
        </div>

        <div className=''>
          <button className="btn btn-raised btn-default waves-effect" style={{ margin: '15px' }} onClick={() => (navigate('/managecustomer'))}>⬅ Back</button>
        </div>
        <div className="row clearfix d-flex justify-content-center" >
          <div className="col-lg-9 col-md-12">

            <div className="card member-card" >
              <div className="header l-slategray">
                <h4 className="m-t-10">{hello.fname} {hello.lname}</h4>
              </div>
              <div className="member-img">
                <img src={hello.profile_image == null ? 'https://www.pngitem.com/pimgs/m/508-5087336_person-man-user-account-profile-employee-profile-template.png' : hello.profile_image} className="rounded-circle" alt="profile-image" style={{ width: 200, height: 200 }} />
              </div>
              <div className="body">
                <div className="col-12">
                  {/* <h5>Customer Address</h5>
                      <p className="text-muted">{hello.address == null ? '-' : hello.address}</p> */}
                </div>
                <hr />
                <div className="row">
                   <div className="col-3">
                    <h5>Business Name</h5>
                    <small>{hello.business_name}</small>
                  </div>
                  <div className="col-3">
                    <h5>Email</h5>
                    <small>{hello.email}</small>
                  </div>
                  <div className="col-3">
                    <h5>Phone Number</h5>
                    <small>{hello.phone}</small>
                  </div>
                 
                  <div className="col-3">
                    <h5>Address</h5>
                    <p className="text-muted">{hello.address == null ? '-' : hello.address}</p>
                  </div>
                </div>
                <br /><br />
                <div className="row">
                  <div className="col-3 offset-3">
                    <h5> Password</h5>
                    <p className="text-muted">{hello.password}</p>
                  </div>
                  <div className="col-3">
                    <h5>Status</h5>
                    <small>{hello.is_active == '0' ? "🔴 InActive" : "🟢 Active"}</small>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default CustomerView
