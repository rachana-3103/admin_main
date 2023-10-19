import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import React, { useState, useEffect } from 'react'
import { manageCustomer, statusCustomer, deleteCustomer } from '../../api/apiHandler';
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import $ from "jquery";
import { Helmet } from 'react-helmet';
import "jquery/dist/jquery.min.js";

function ManageCustomer() {

    const [custo, setCusto] = useState([]);
    const navigate = useNavigate()

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
        manageCustomer({ id: 0}).then((response) => {
            if (response.data.code == 1) {
                setCusto(response.data.data)
                Swal.close();
            } else {
                Swal.close()
            }
        });
    }
    const active = (id) => {
        statusCustomer({ id : id }).then((response) => {
            if (response.data.code == 1) {
              Swal.fire({
                icon: 'success',
                title: response.data.message,
                confirmButtonText: 'Okay'
            })
                  // setCusto([])
                setTimeout(function() {
                    getonload()
                  }, 1000)            
                } else {
            }
        })
    }

    const deletec = (id) => {
        Swal.fire({
            title: 'Are you sure to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteCustomer({ id : id }).then((response) => {
                  if (response.data.code == 1) {
                  Swal.fire(
                    'Deleted!',
                    'Customer has been deleted Successfully.'
                  )
                  setCusto([])
                  setTimeout(function() {
                    getonload()
                  }, 1000)  
              }  else  {
                getonload()
                }
              }) 
            } 
          })
    }

    const columns = [
        // {
        //   name: 'Id',
        //   selector: row => row.id,
        //   cellExport: row => row.id,
        //   sortable: true,
        //   width: '75px'
        // },
        {
          name: 'Business Name',
          selector: row => row.business_name,
          cellExport: row => row.business_name,
          sortable: true,
        },
        {
          name: 'Customer Name',
          selector: row => row.fname,
          cell: (row) => <p>{row.fname} {row.lname}</p>,
          sortable: true,
        },
        {
          name: 'Address',
          selector: row => row.address,
          cellExport: row => row.address,
          sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            cellExport: row => row.email,
            sortable: true,
          },
        {
            name: 'Action – Disable Delete',
            selector: row => row.id,
            cell: (row) => <><button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={() => { navigate(`/customer/${row.id}`) }} ><i className="material-icons" id={row.id} onClick={()=>{navigate(`/customer/${row.id}`)}}>visibility</i>  </button><button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={() => { navigate(`/customeredit/${row.id}`) }} ><i className="material-icons" id={row.id} onClick={()=>{navigate(`/customeredit/${row.id}`)}}>create</i>  </button><button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={() => { deletec(row.id) }} ><i className="material-icons" id={row.id} onClick={()=>{deletec(row.id)}}>delete</i>  </button></>
          },
          // {
          //   name: 'Edit',
          //   selector: row => row.id,
          //   width: '150px',
          //   cell: (row) => <button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={() => { navigate(`/customeredit/${row.id}`) }} ><i className="material-icons" id={row.id} onClick={()=>{navigate(`/customeredit/${row.id}`)}}>create</i>  </button>
          // },
          {
            name: 'Active/Inactive',
            selector: row => row.is_active,
            // width: '150px',
            // cell: (row) => <button type="button" className="btn btn-default waves-effect rounded waves-float" id={row.id} onClick={() => { active(row.id) }} >  {row.is_active == '0' ? "🔴 InActive" : "🟢 Active"}</button>
            cell: (row) => <div class="demo-switch"><div class="switch"><label>{row.is_active == 1 ? <input type="checkbox" id={row.id} onClick={() => {active(row.id)}} defaultChecked/> : <input type="checkbox" id={row.id} onClick={() => {active(row.id)}}/>} <span class="lever switch-col-light-blue"></span></label>
            </div>
        </div>
          },
          
        // {
        //     name: 'Delete',
        //     selector: row => row.is_deleted,
        //     width: '150px',
        //     cell: (row) => <button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={() => { deletec(row.id) }} ><i className="material-icons" id={row.id} onClick={()=>{deletec(row.id)}}>delete</i>  </button>
        //   },
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
      </Helmet>
        <section className="content">
                  <div className="block-header">
                      <div className="row">
                          <div className="col-lg-7 col-md-6 col-sm-12">
                              <h2>Customers
                                  <small className="text-muted">View, Edit, Block/UnBlock &amp; Delete Customers</small>
                              </h2>
                          </div>
                          <div className="col-lg-5 col-md-6 col-sm-12">
                              <ul className="breadcrumb float-md-right">
                                  {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li>
                                  <li className="breadcrumb-item active">Customers</li> */}
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div className="container-fluid">
                      <div className="row clearfix">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="card">
                              <div className='float-right'>
                                    <button className="btn btn-raised btn-primary waves-effect" style={{margin:'15px'}} onClick={()=> (navigate('/customer/create'))}>Create Customer</button>
                                </div>
                                  <div className="body">
                                      <div className='table-responsive'>
                                      <DataTableExtensions columns={columns} data={custo}>
                          <DataTable columns={columns} data={custo} responsive pagination customStyles={customStyles}/>
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

export default ManageCustomer
