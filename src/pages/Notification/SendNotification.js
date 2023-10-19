import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { sendPush } from '../../api/apiHandler';
import Swal from 'sweetalert2';

function SendNotification() {

    const navigate = useNavigate();
    const initalValue = { title: "", message: "" }
    const [formValues, setFormValues] = useState(initalValue);

    const haChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const sendnoti = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Please wait...',
            didOpen: () => {
            Swal.showLoading()
            }
          })
        sendPush({ "title": formValues.title, "message": formValues.message })
      .then((response) => {
          if (response.data.code == 1) {
            Swal.close()
                Swal.fire({
                    icon:'success',
                    title:response.data.message
                })
            setFormValues({ title: "", message: "" })
          } else {
            Swal.close()
              // alert(response.data.message)
          }
      })
    }
  return (
    <>
      <section class="content">
            <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2>Send Notification
                                <small className="text-muted"></small>
                            </h2>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <ul className="breadcrumb float-md-right">
                            <li className="breadcrumb-item"><Link to="/dashboard"><i className="zmdi zmdi-home"></i> Live Cart</Link></li>
                                <li className="breadcrumb-item active">Send Push Notification</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="row clearfix">
                        <div class="col-lg-6 col-md-6 col-sm-6">
                            <div class="card">
                                <div class="body">
                                    <form method="" onSubmit={sendnoti}  action='#'>
                                        <div className="row clearfix modal-body">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <h6>Title</h6>
                                                    <div className="form-line">
                                                        <input type='text' className="form-control" id='title' name="title" required value={formValues.title} onChange={haChange} placeholder="Type here ..." />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <h6>Message</h6>
                                                    <div className="form-line">
                                                        <input type='text' className="form-control" id='message' name='message' required value={formValues.message} onChange={haChange} placeholder="Type Here ..." />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-raised btn-success waves-effect">Send</button>
                                            <button type="reset" className="btn btn-raised bg-red waves-effect" onClick={()=>{setFormValues("")}}>CLEAR</button>
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

export default SendNotification
