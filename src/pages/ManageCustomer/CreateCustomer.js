import React, { useState, useEffect } from 'react'
import { createCustomer } from '../../api/apiHandler';
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';

function CreateCustomer(props) {

    const navigate = useNavigate()
    const [val, setVal] = useState([]);

    const haChange = (e) => {
        const { name, value } = e.target;
        setVal({ ...val, [name]: value });
    }

    const prodcreate = (e) => {
        e.preventDefault();
        props.isLoader(true)
        createCustomer({ fname:val.fname, lname:val.lname, email:val.email, phone:val.phone, address: val.address, business_name: val.business_name }).then((response) => {
            props.isLoader(false)
            if (response.data.code == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Customer has been added successfully.',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/managecustomer')
                    }
                })
            } else {
                // alert(response.data.message)
            }
        })
    }

  return (
    <>
      <section className="content">
                  <div className="block-header">
                      <div className="row">
                          <div className="col-lg-7 col-md-6 col-sm-12">
                              <h2>Create Customers
                              </h2>
                          </div>
                          <div className="col-lg-5 col-md-6 col-sm-12">
                              <ul className="breadcrumb float-md-right">
                                  {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                                  {/* <li className="breadcrumb-item active">Create Customers</li> */}
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div className="container-fluid">
                      <div className="row clearfix">
                        <div className='col-md-12 col-lg-12'>
                      <div className=''>
                                    <button className="btn btn-raised btn-default waves-effect" style={{margin:'15px'}} onClick={()=> (navigate('/managecustomer'))}>⬅ Back</button>
                                </div></div>
                          <div className="col-lg-7 col-md-7 col-sm-12">
                              <div className="card">
                                  <div className="body">
                                  <form className="col-lg-12" method="" onSubmit={prodcreate} action="#" >
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="form-group form-float" >
                                        <h6>First Name</h6>
                                            <div className="form-line">
                                                <input type='text' className="form-control" id='fname' name="fname" required onChange={haChange} value={val.fname} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                    <div className="form-group form-float" >
                                            <h6>Last Name</h6>
                                            <div className="form-line">
                                                <input type='text' className="form-control" id='lname' name="lname" required onChange={haChange} value={val.lname}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="form-group form-float" >
                                            <h6>Email Address</h6>
                                            <div className="form-line">
                                                <input type='email' className="form-control" id='email' name="email" required onChange={haChange} value={val.email}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="form-group form-float" >
                                            <h6>Phone</h6>
                                            <div className="form-line">
                                                <input type='number' min={0} className="form-control" id='phone' name="phone" required onChange={haChange} value={val.phone}/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="form-group form-float" >
                                            <h6>Address</h6>
                                            <div className="form-line">
                                                <input type='text' className="form-control" id='address' name="address" required onChange={haChange} value={val.address}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="form-group form-float" >
                                            <h6>Business Name</h6>
                                            <div className="form-line">
                                                <input type='text' className="form-control" id='business_name' name="business_name" required onChange={haChange} value={val.business_name}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            <br/>
                                <div className="col-lg-12">
                                    <button className="btn btn-raised btn-primary waves-effect" type="submit">Create</button> &nbsp; &nbsp;
                                </div>
                            </form>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
    </>
  )
}

export default CreateCustomer
