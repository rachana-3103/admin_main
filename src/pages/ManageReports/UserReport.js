import React, { useState, useEffect } from 'react'
import { customerReports } from '../../api/apiHandler';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

function UserReport() {
  const navigate = useNavigate();

    const [rep, setRep] = useState([]);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const haChange = () => {
        var startdate = document.getElementById('start_date').value
        var enddate = document.getElementById('end_date').value
        if (startdate.length > 0) {
          setStart(startdate)
        }
        if (enddate.length > 0) {
          setEnd(enddate)
        }
    }

    useEffect(() => {
        if (start != null && end != null) {
          Swal.fire({
            title: 'Please wait...',
            didOpen: () => {
            Swal.showLoading()
            }
        })
            customerReports({ "start_date": start, "end_date": end }).then((response) => {
            if (response.data.code == 1) {
                setRep(response.data.data)
                Swal.close()
            } else {
              Swal.close()
            }
          })

        }
      }, [start, end]);

    const columns = [
    {
        name: 'Id',
        selector: row => row.id,
        cellExport: row => row.id
    },
    {
        name: 'Full Name',
        selector: row => row.full_name,
        cellExport: row => row.full_name
    },
    {
        name: 'Email',
        selector: row => row.email,
        cellExport: row => row.email
    },
    {
        name: 'Phone',
        selector: row => row.phone,
        cell: (row)=> <p>{row.country_code} {row.phone}</p>
    },
    {
        name: 'Address',
        selector: row => row.address,
        cell: (row)=> <p>{row.address}</p>
    },
    {
        name: 'Is Active',
        selector: row => row.is_active,
        cellExport: row => row.is_active
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

    const resetfi = () => {
        var startdate = document.getElementById('start_date').value = ''
        var enddate = document.getElementById('end_date').value = ''
        setRep([])
    }

  return (
    <>
       <section className="content">
        <div className="block-header">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h2>Customer Report</h2>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12">
              <ul className="breadcrumb float-md-right">
                <li className="breadcrumb-item"><Link to="/dashboard"><i className="zmdi zmdi-home"></i>Live Cart</Link></li>
                <li className="breadcrumb-item active">Customer Report</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="body table-responsive">
                  <div className='row'>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
                      <div class="form-group">
                        <div class="form-line">
                          <label>Start Date</label>
                          <input type="date" class="form-control" id='start_date' name="start_date" onChange={haChange} />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-6">
                      <div class="form-group">
                        <div class="form-line">
                          <label>End Date</label>
                          <input type="date" class="form-control" id='end_date' name="end_date" onChange={haChange} />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2">
                      <div class="form-group">
                        <div class="">
                          <label> &nbsp;</label><br />
                          <button type="button" class="btn btn-raised btn-primary m-l-15 waves-effect" onClick={resetfi} >Reset</button>
                        </div>
                      </div>
                    </div>

                    <div className='col-lg-2 offset-md-4 col-md-2 col-sm-2'>
                    <div className="card l-slategray">
                        <div className="body">
                            <h3 className="m-t-0 c-0 text-white" >{rep.length}</h3>
                            <h5 className="m-b-0 c-0 text-white" >Total Customer</h5>
                        </div>
                     </div>
                  </div>

                  </div>

                  <DataTableExtensions columns={columns}
                    data={rep}>
                    <DataTable
                      columns={columns}
                      data={rep}
                      responsive
                      pagination
                      customStyles={customStyles}
                    />
                  </DataTableExtensions>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default UserReport
