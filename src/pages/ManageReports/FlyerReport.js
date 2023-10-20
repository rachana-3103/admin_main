import React, { useState, useEffect } from 'react'
import { flyperReports } from '../../api/apiHandler';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Chart from 'react-apexcharts';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";

function FlyerReport() {
    const navigate = useNavigate();

    const [rep, setRep] = useState([]);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [redeem, setRedeem] = useState(0);
    const [tosone, setTosone] = useState(0);

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
        flyperReports({ "start_date": start, "end_date": end }).then((response) => {
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
              Swal.close()
            }
          })

        }
      }, [start, end]);

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
                text: 'Total Order Report Date Wise',
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

    // const columns = [
    // {
    //     name: 'Id',
    //     selector: row => row.id,
    //     cellExport: row => row.id
    // },
    // {
    //     name: 'Store Name',
    //     selector: row => row.store_name,
    //     cellExport: row => row.store_name
    // },
    // {
    //     name: 'Product Name',
    //     selector: row => row.product_name,
    //     cellExport: row => row.product_name
    // },
    // {
    //     name: 'Image',
    //     selector: row => row.image,
    //     cell: (row) => <a href={row.image} className="image-popup"><img className="rounded image-popup" alt="profile_image" style={{width: 125, height: 125}} src={row.image}/></a>
    // },
    // {
    //     name: 'Min Max Range',
    //     selector: row => row.min_range,
    //     cell: (row)=> <p>{row.min_range}% - {row.max_range}%</p>
    // },
    // {
    //     name: 'Start Date',
    //     selector: row => row.start_day,
    //     cellExport: row => row.start_day
    // },
    // {
    //     name: 'End Date',
    //     selector: row => row.end_day,
    //     cellExport: row => row.end_day
    // },
    // ];
    // const customStyles = {
    //     headCells: {
    //         style: {
    //             fontWeight: 'bold',
    //             fontSize :'14px' 
    //         },
    //     },
    // };

    const resetfi = () => {
        var startdate = document.getElementById('start_date').value = ''
        var enddate = document.getElementById('end_date').value = ''
        setRep([])
    }

    const columns1 =  [
      {
          name: 'Order ID',
          selector: row => row.order_id,
          cellExport: row => row.order_id,
          sortable: true,
      },
      {
          name: 'Product ID',
          selector: row => row.product_id,
          cell: (row) => <p>{row.product_id}</p>,
          sortable: true,
      },
      {
          name: 'Address',
          selector: row => row.address,
          cellExport: row => row.address,
          sortable: true,
      },
      {
        name: 'Order Date',
        selector: row => row.order_date,
        cell: (row) => <p>{row.order_date}</p>,
        sortable: true,
    },
      {
          name: 'Delivery Date',
          selector: row => row.deliver_datetime,
          cell: (row) => <p>{row.deliver_datetime}</p>,
          sortable: true,
      },
      {
          name: 'Amount',
          selector: row => row.payment,
          cell: (row) => <p> $ {(Math.round(row.payment * 100) / 100).toFixed(2)}</p>,
      },
      {
          name: 'Order Status',
          selector: row => row.status,
          cell: (row) => <>{row.status == 'Delivered' ? <div className='alert alert-success m-0'><strong>{row.status}</strong></div> : (row.status == 'Order Cancelled' || row.status == 'Rejected') ? <div className='alert alert-danger m-0'><strong>{row.status}</strong></div> : row.status == 'Order Placed' ? <div className='alert alert-warning m-0'><strong>{row.status}</strong></div>: <div className='alert alert-info m-0'><strong>{row.status}</strong></div>}</>
      },
  ];

  const customStyles = {
    headCells: {
        style: {
            fontWeight: 'bold',
            fontSize: '14px'
        },
    },
};

  return (
    <>
    <section className="content">
     <div className="block-header">
       <div className="row">
         <div className="col-lg-7 col-md-6 col-sm-12">
           <h2>Date Wise Order Report</h2>
         </div>
         <div className="col-lg-5 col-md-6 col-sm-12">
           <ul className="breadcrumb float-md-right">
             {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i>Ballina Farm Fresh</li> */}
             {/* <li className="breadcrumb-item active">Order Report</li> */}
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
                 <div class="col-lg-1 col-md-1 col-sm-2">
                   <div class="form-group">
                     <div class="">
                       <label> &nbsp;</label><br />
                       <button type="button" class="btn btn-raised btn-primary m-l-15 waves-effect" onClick={resetfi} >Reset</button>
                     </div>
                   </div>
                 </div>
                 {/* <div class="col-lg-2 col-md-2 col-sm-2"> */}
                      {/* <div class="form-group">
                        <div class="flaot-right">
                        <label> &nbsp;</label><br />
                          <button class="btn btn-raised btn-success m-l-15 waves-effect" onClick={() => downloadSVG("LineGraph1")} >Download</button>
                        </div>
                      </div>
                    </div> */}

                 <div className='col-lg-2 offset-md-1 col-md-2 col-sm-2'>
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
               <div role="tabpanel" class="tab-pane" id="messages"> 
                            <div className='table-responsive'>
                                        <DataTableExtensions columns={columns1} data={rep}>
                                            <DataTable columns={columns1} data={rep} responsive pagination customStyles={customStyles} />
                                        </DataTableExtensions>
                                    </div>
                            </div>
               {/* <Chart options={incomeData2.options} series={incomeData2.series} type="line" height={310} /> */}
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

export default FlyerReport
