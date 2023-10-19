import React, { useState, useEffect } from 'react'
import { vendorReports,manageCustomer } from '../../api/apiHandler';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Chart from 'react-apexcharts';


function VendorReport() {
    const navigate = useNavigate();

    const [rep, setRep] = useState([]);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [redeem, setRedeem] = useState(0);
    const [tosone, setTosone] = useState(0);
    const [userid, setUserId] = useState(null);
    const [custo,setCusto] = useState([])

    const cateId = (id) => {
      setUserId(id)
  }
    const haChange = () => {
        var startdate = document.getElementById('start_date').value
        var enddate = document.getElementById('end_date').value
        var userlist = document.getElementById('user').value
        if (userlist.length > 0) {
          setUserId(userlist)
        }
        if (startdate.length > 0) {
          setStart(startdate)
        }
        if (enddate.length > 0) {
          setEnd(enddate)
        }
    }

    useEffect (()=>{
      Swal.fire({
        title: 'Please wait...',
        didOpen: () => {
        Swal.showLoading()
        }
    })
      manageCustomer({ id: 0}).then((response) => {
        if (response.data.code == 1) {
            setCusto(response.data.data)
            Swal.close();
        } else {
            Swal.close()
        }
    });
    },[])

    useEffect(() => {
        if (start != null && end != null && userid != null) {
          Swal.fire({
            title: 'Please wait...',
            didOpen: () => {
            Swal.showLoading()
            }
        })
        vendorReports({ id:userid , "start_date": start, "end_date": end }).then((response) => {
          setRep([])
            if (response.data.code == 1) {
                setRep(response.data.data)
                let sum = 0;
                response.data.data.forEach(e => {
                  sum += e.payment;
                });
                setTosone(sum)
                let sumx = 0;
                response.data.data.forEach(e => {
                  sumx += e.count;
                });
                setRedeem(sumx)
                Swal.close()
            } else {
              setRep([])
              Swal.close()
            }
          })

        }
      }, [start, end,userid]);

      async function downloadSVG(chartId) {
        const chartInstance = window.Apex._chartInstances.find(
          (chart) => chart.id === chartId
        );
        const base64 = await chartInstance.chart.dataURI();
        const downloadLink = document.createElement("a");
        downloadLink.href = base64.imgURI;
        downloadLink.download = "image.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

      const incomeData2 = {
        series: [{
                name: 'Total Value',
                data: rep.map(a => a.payment),
            },
            {
                name: 'Total Order',
                data: rep.map(a => a.count),
            }],
        options: {
            chart: {
                id: "LineGraph1",
                height: 350,
                type: 'line',
                toolbar: {
                    show: false,
                }
            },
            title: {
                text: 'Customer Date Wise Order Report',
              },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'Date',
                categories: rep.map(a => a.date)
            },
        }
    }


    const resetfi = () => {
      var userselect = document.getElementById('user').value = ''
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
              <h2>Customer Order Report</h2>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12">
              <ul className="breadcrumb float-md-right">
                {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i>Ballina Farm Fresh</li> */}
                {/* <li className="breadcrumb-item active">Customer Order Report</li> */}
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
                        <div class="">
                          <label>Select Customer</label>
                          <select class="form-control form-line" id='user' name='user' onChange={(e) => cateId(e.target.value)} value={userid}>
                              <option>SELECT CUSTOMER</option>{custo == '' ? "" : custo.map((el, i) => <><option key={i} value={el.id}>{el.fname} {el.lname}</option></>)}
                           </select>
                        </div>
                      </div>
                    </div>
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
                    <div class="col-lg-1 col-md-1 col-sm-2">
                      <div class="form-group">
                        <div class="">
                          {/* <label> &nbsp;</label><br /> */}
                          <button type="button" class="btn btn-raised btn-primary m-l-15 waves-effect" onClick={resetfi} >Reset</button><br/>
                          <button class="btn btn-raised btn-success m-l-15 waves-effect" onClick={() => downloadSVG("LineGraph1")} >Download</button>
                        </div>
                      </div>
                    </div>

                    {/* <div class="col-lg-1 col-md-1 col-sm-2">
                      <div class="form-group">
                        <div class="flaot-right">
                        <label> &nbsp;</label><br />
                          <button class="btn btn-raised btn-success m-l-15 waves-effect" onClick={() => downloadSVG("LineGraph1")} >Download</button>
                        </div>
                      </div>
                    </div> */}
{/* <br/> */}
                 <div className='col-lg-2 offset-1 col-md-2 col-sm-2'>
                 <div className="card l-slategray">
                     <div className="body">
                         <h3 className="m-t-0 c-0 text-white" >{redeem}</h3>
                         <h5 className="m-b-0 c-0 text-white" >Total Order</h5>
                     </div>
                  </div>
               </div>
               <div className='col-lg-2 col-md-2 col-sm-2'>
                 <div className="card l-slategray">
                     <div className="body">
                         <h3 className="m-t-0 c-0 text-white" >{(Math.round(tosone * 100) / 100).toFixed(2)}</h3>
                         <h5 className="m-b-0 c-0 text-white" >Total Amount</h5>
                     </div>
                  </div>
               </div>

                  </div>
                  <Chart options={incomeData2.options} series={incomeData2.series} type="line" height={310} />
                  {/* <DataTableExtensions columns={columns}
                    data={rep}>
                    <DataTable
                      columns={columns}
                      data={rep}
                      responsive
                      pagination
                      customStyles={customStyles}
                    />
                  </DataTableExtensions> */}

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default VendorReport
