import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { contactUs, sendReplayMail } from '../../api/apiHandler';
import Swal from 'sweetalert2'


function SendMail() {
    const navigate = useNavigate();
    const [contact, setContact] = useState([]);

    const initalValue = { subject: "", message: "" }
    const [formValues, setFormValues] = useState(initalValue);


    useEffect(() => { getload(); }, []);

    const haChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    let iste = window.location.pathname.split('/')[2]
    const getload = () => {
        contactUs({ "id": iste }).then((response) => {
          if (response.data.code == 1) {
            setContact(response.data.data[0])
          } else {
            // alert(response.data.message)
          }
        });
    }

    const sendmail = (e) => {
        e.preventDefault();

        sendReplayMail({ "id": iste, "subject": formValues.subject, "messages": formValues.message, "sendermail": contact.email}).then((response) => {
            if (response.data.code == 1) {
                Swal.fire({
                    icon: 'success',
                    title: "Mail Send Successfully",
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setTimeout(() => { navigate('/contactus') })
                    }
                })
            } else {
                // alert(response.data.message)
            }
        })
    }

  return (
    <>
       <section class="content">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-7 col-md-6 col-sm-12">
                            <h2> 
                                <small class="text-muted"></small>
                            </h2>
                        </div>

                    </div>
                </div>
                <div class="container-fluid">
                    <div class="row clearfix">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="card">
                                <div class="body">
                                    <h2 class="card-inside-title">Replay Contact</h2>
                                    <form method="" onSubmit={sendmail} action='#'>
                                        <div className="row clearfix modal-body">
                                            <div className="col-sm-12">
                                                <h5>Send On : {contact.email}</h5>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input type='text' className="form-control" id='subject' name="subject" required value={formValues.subject} onChange={haChange} placeholder="Subject" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="form-line">
                                                        <input type='text' className="form-control" id='message' name='message' required value={formValues.message} onChange={haChange} placeholder="Message" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-raised btn-success waves-effect">SAVE</button>
                                            <button type="button" className="btn btn-raised bg-red waves-effect" onClick={()=> navigate('/contactus')}>CLOSE</button>
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

export default SendMail
