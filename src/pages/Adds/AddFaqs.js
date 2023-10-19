import React, { useState, useEffect } from 'react'
import { faqsAdd } from '../../api/apiHandler';
import Swal from 'sweetalert2'
import { useNavigate, Link } from 'react-router-dom';


function AddFaqs() {
    const navigate = useNavigate();
    const initalValue = { tag: "",question: "", answer: "" }
    const [formValues, setFormValues] = useState(initalValue);

    const haChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const addfaqs = (e) => {
        e.preventDefault();

        faqsAdd({ "question": formValues.question, "answer": formValues.answer }).then((response) => {
            if (response.data.code == 1) {
                Swal.fire({
                    icon: 'success',
                    title: "Add FAQs successfully",
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setTimeout(() => { navigate('/faq') })
                    }
                })
            } else {
                alert(response.data.message)
            }
        })
    }
    return (
        <>
            <section class="content">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2>Add FAQs
                                <small className="text-muted"></small>
                            </h2>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <ul className="breadcrumb float-md-right">
                                <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li>
                                <li className="breadcrumb-item"> Manage FAQs</li>
                                <li className="breadcrumb-item active">Add FAQs</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="row clearfix">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="card">
                                <div class="body">
                                    {/* <h2 class="card-inside-title">Add FAQs</h2> */}
                                    <form method="" onSubmit={addfaqs} action='#'>
                                        <div className="row clearfix modal-body">
                                            <div className="col-sm-12">
                                                <div className="form-group">
                                                    <h6>Question</h6>
                                                    <div className="form-line">
                                                        <input type='text' className="form-control" id='question' name="question" required value={formValues.question} onChange={haChange} placeholder="Type here ..." />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <h6>Answer</h6>
                                                    <div className="form-line">
                                                        <input type='text' className="form-control" id='answer' name='answer' required value={formValues.answer} onChange={haChange} placeholder="Type Here ..." />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-raised btn-success waves-effect">SAVE</button>
                                            <button type="button" className="btn btn-raised bg-red waves-effect" onClick={() => navigate('/faq')}>CLOSE</button>
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

export default AddFaqs
