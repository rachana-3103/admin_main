import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import React, { useState, useEffect } from 'react'
import { vendorRequestList, vendorRequestAccept, vendorRequestReject } from '../../api/apiHandler';
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import $ from "jquery";
import { Helmet } from 'react-helmet';
import "jquery/dist/jquery.min.js";

function CustomerRequest(props) {

    const navigate = useNavigate()

    const [vendor, setVendor] = useState([]);

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
        vendorRequestList({ }).then((response) => {
            if (response.data.code == 1) {
                setVendor(response.data.data)
                Swal.close();
            } else {
                Swal.close()
            }
        });
    }

    const acceptVendor = (id) => {
      props.isLoader(true)
      vendorRequestAccept({ id : id }).then((response) => {
        props.isLoader(false)
          if (response.data.code == 1) {
            props.isLoader(false)
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: response.data.message
            })
            setVendor([])
            getonload();         
              } else {
                props.isLoader(false)
                getonload();  
          }
      })
    }

    const rejectVendor = (id) => {
      Swal.fire({
          title: 'Are you sure to Reject?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Reject it!'
        }).then((result) => {
          if (result.isConfirmed) {
            props.isLoader(true)
            vendorRequestReject({ id : id }).then((response) => {
              props.isLoader(false)
              if (response.data.code == 1) {
                    props.isLoader(false)
                // Swal.fire(
                //   'Deleted!',
                //   response.data.message
                // )
                setVendor([])
                  getonload()
                 
            }  else  {
                getonload()
              }
            }) 
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
          name: 'Vendor Name',
          selector: row => row.fname,
          cell: (row)=> <p>{row.fname} {row.lname}</p>,
          sortable: true,
        },
        {
            name: 'Vendor Email',
            selector: row => row.email,
            cellExport: row => row.email,
            sortable: true,
          },
        {
          name: 'Image',
          selector: row => row.profile_image,
        //   width: '250px',
          cell: (row) => <a href={row.profile_image} className="image-popup"><img className="rounded image-popup" alt="profile_image" style={{width: 125, height: 125}} src={row.profile_image}/></a>
        },
          {
            name: 'Accept',
            selector: row => row.id,
            width: '150px',
            cell: (row) => <button type="button" className="btn btn-primary waves-effect rounded waves-float" id={row.id}  onClick={()=> {acceptVendor(row.id)} }> Accept</button>
          },
          {
            name: 'Reject',
            selector: row => row.id,
            width: '150px',
            cell: (row) => <button type="button" className="btn btn-danger waves-effect rounded waves-float" id={row.id} onClick={()=> {rejectVendor(row.id)} } > Reject</button>
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
                              <h2>Manage Vendor Request
                                  <small className="text-muted">Accept &amp; Reject Vendor Request</small>
                              </h2>
                          </div>
                          <div className="col-lg-5 col-md-6 col-sm-12">
                              <ul className="breadcrumb float-md-right">
                                  {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                                  {/* <li className="breadcrumb-item active">Manage Vendor Request</li> */}
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div className="container-fluid">
                      <div className="row clearfix">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="card">
                              
                                  <div className="body">
                                      <div className='table-responsive'>
                                      <DataTableExtensions columns={columns} data={vendor}>
                          <DataTable columns={columns} data={vendor} responsive pagination customStyles={customStyles}/>
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

export default CustomerRequest
