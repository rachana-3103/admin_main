import React, { useState, useEffect } from 'react'
import { faqsList, faqsDelete } from '../../api/apiHandler';
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import $ from "jquery";
import "jquery/dist/jquery.min.js";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

function Faq() {
  const navigate = useNavigate();

  const [faq, setFaq] = useState([]);

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
  faqsList({id: 0}).then((response) => {
        if (response.data.code == 1) {
            Swal.close()
          setFaq(response.data.data);
        } else {
          Swal.close();
        }
    });
}



const deletefaqs = (id) => {
  Swal.fire({
    title: 'Are you sure you want to delete?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
}).then((result) => {
    if (result.isConfirmed) {
      faqsDelete({ "id": id}).then((response) => {
            if (response.data.code == 1) {
              Swal.fire({
                icon: 'success',
                title: 'Delete Successfully',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(function() {
                getonload()
              }, 1000)  
            }
        });
    }
})
}

const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      cellExport: row => row.id,
      sortable: true,
      width: '75px'
    },
    {
        name: 'Question',
        selector: row => row.question,
        // cellExport: row => row.question,
        width: '250px',
        sortable: true,
        cell: (row) => <p>{row.question}</p>
      },
      {
        name: 'Answer',
        selector: row => row.answer,
        // cellExport: row => row.answer,
        sortable: true,
        cell: (row) => <p>{row.answer}</p>
      },
      {
        name: 'Edit',
        selector: row => row.id,
        width: '150px',
        cell: (row) => <button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={() => { navigate(`/editfaq/${row.id}`) }} ><i className="material-icons" id={row.id} onClick={()=>{navigate(`/editfaq/${row.id}`)}}>create</i>  </button>
      },
    {
        name: 'Delete',
        selector: row => row.id,
        width: '150px',
        cell: (row) => <button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={() => { deletefaqs(row.id) }} ><i className="material-icons" id={row.id} onClick={()=>{deletefaqs(row.id)}}>delete</i>  </button>
      },
  ];

  const customStyles = {
    headCells: {
        style: {
            fontWeight: 'bold',
            fontSize :'14px' 
        },
    },
};

  return (
    <>
      <section className="content">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2>Manage FAQs
                                <small className="text-muted">View, Add, Edit &amp; Delete FAQs</small>
                            </h2>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <ul className="breadcrumb float-md-right">
                                {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                                {/* <li className="breadcrumb-item active">Manage FAQs</li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className='float-right'>
                                    <button className="btn btn-raised btn-primary waves-effect" style={{margin:'15px'}} onClick={()=>{navigate('/addfaq')}}>Add FAQs</button>
                                </div>
                                <div className="body">
                                    <div className='table-responsive'>
                                    <DataTableExtensions columns={columns} data={faq}>
                          <DataTable columns={columns} data={faq} responsive pagination customStyles={customStyles}/>
                        </DataTableExtensions>
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

export default Faq
