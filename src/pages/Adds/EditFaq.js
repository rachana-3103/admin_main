import React, { useState, useEffect } from 'react'
import { faqsUpdate, faqsList } from '../../api/apiHandler';
import Swal from 'sweetalert2'
import { useNavigate, Link } from 'react-router-dom';

function EditFaq() {
    const navigate = useNavigate();
    const [art, setArt] = useState([]);

    useEffect(() => { getload(); }, []);

    let ists = window.location.pathname.split('/')[2]
    const getload = () => {
        faqsList({ "id": ists }).then((response) => {
            if (response.data.code == 1) {
                setArt(response.data.data[0])
            } else {
                alert(response.data.message)
            }
        });
    }

    const haChange = (e) => {
        const { name, value } = e.target;
        setArt({ ...art, [name]: value });
    }

    const updatefaq = (e) => {
        e.preventDefault();

        faqsUpdate({ "id": ists, "question": art.question, "answer": art.answer }).then((response) => {
            if (response.data.code == 1) {
                Swal.fire({
                    icon:'success',
                    title: "Update FAQs successfully",
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
                            <h2>Edit FAQs
                                <small className="text-muted"></small>
                            </h2>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <ul className="breadcrumb float-md-right">
                                <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li>
                                <li className="breadcrumb-item">Manage FAQs</li>
                                <li className="breadcrumb-item active">Edit FAQs</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="container-fluid">
                    <div class="row clearfix">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="card">
                                <div class="body">
                                    {/* <h2 class="card-inside-title">Update FAQs</h2> */}
                                    <form method="" onSubmit={updatefaq} action='#'>
                                                <div className="row clearfix modal-body" >
                                                    <div className="col-sm-12">

                                                        <div className="form-group">
                                                        <h6>Question</h6>
                                                            <div className="form-line">
                                                                <input type='text' className="form-control" id='question' name="question" value={art.question} onChange={haChange} required placeholder="Type Here ..." />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                        <h6>Answer</h6>
                                                            <div className="form-line">
                                                                <input type='text' className="form-control" id='answer' name='answer' value={art.answer} onChange={haChange} required placeholder="Type Here ..." />
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

export default EditFaq
