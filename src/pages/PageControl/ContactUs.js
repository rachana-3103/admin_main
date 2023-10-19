import React, { useState, useEffect } from 'react'
import { contactUs } from '../../api/apiHandler';
import { Link, useNavigate } from 'react-router-dom';
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

function ContactUs() {

  const [contact, setContact] = useState([]);
  const navigate = useNavigate();

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
    contactUs({id: 0}).then((response) => {
      if (response.data.code == 1) {
        setContact(response.data.data)
        Swal.close()
      } else {
        Swal.close()
      }
    });
  }

  const routeChange = (id) => {
    navigate(`/sendmail/${id}`);
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
        name: 'Vendor Email',
        selector: row => row.email,
        cellExport: row => row.email,
        width: '250px',
        sortable: true,
      },
      {
        name: 'Subject',
        selector: row => row.subject,
        sortable: true,
        cell: (row) => <p>{row.subject}</p>
      },
      {
        name: 'Message',
        selector: row => row.description,
        sortable: true,
        cell: (row) => <p>{row.description}</p>
      },
      {
        name: 'Action Status',
        selector: row => row.is_reply,
        width: '150px',
        sortable: true,
        cell: (row) => <button type="button" className="btn btn-default waves-effect rounded waves-float" id={row.id} >  {row.is_reply == 'P' ? "🔴 Pending" : "🟢 ReSolve"}</button>
      },
    {
        name: 'Action',
        selector: row => row.is_active,
        width: '150px',
        cell: (row) => <button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={() => { navigate(`/sendmail/${row.id}`) }} ><i className="material-icons" id={row.id} onClick={()=>{navigate(`/sendmail/${row.id}`)}}>email</i>  </button>
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
  
  // if (contact == null) return <></>

 return(
  <>
  <section className="content">
    <div className="block-header">
      <div className="row">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h2>Manage Contact
            <small className="text-muted">Action On Contact Us</small>
          </h2>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12">
          <ul className="breadcrumb float-md-right">
            {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
            {/* <li className="breadcrumb-item active">Contact</li> */}
          </ul>
        </div>
      </div>
    </div>
    <div className="container-fluid">
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            <div className="body table-responsive">
            <DataTableExtensions columns={columns} data={contact}>
                          <DataTable columns={columns} data={contact} responsive pagination customStyles={customStyles}/>
                        </DataTableExtensions>
              {/* <table id="contactdata" className="table table-bordered table-hover dataTable js-exportable">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contact && contact.map((item, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{item.id}</td>
                        <td>{item.full_name}</td>
                        <td>{item.email}</td>
                        <td>{item.subject}</td>
                        <td>{item.description}</td>
                        <td>{item.status == 'P' ? "🔴 Pending" : "🟢 Resolve"}</td>
                        <td><button type="button" className="btn btn-default btn-circle waves-effect waves-circle waves-float" id={item.id} onClick={() => { routeChange(item.id) }}> <i className="material-icons" id={item.id} onClick={() => { routeChange(item.id) }}>email</i> </button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</>
  )
}

export default ContactUs
