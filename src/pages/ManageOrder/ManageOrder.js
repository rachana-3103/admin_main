import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import React, { useState, useEffect, useRef } from 'react'
import { ManageOrders, orderItemDetails, manageOrderOntheway, manageOrderDelvivers, acceptorderrejecet } from '../../api/apiHandler';
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import $ from "jquery";
import { Helmet } from 'react-helmet';
import "jquery/dist/jquery.min.js";
import ReactToPrint from 'react-to-print';


function ManageOrder() {
    const [order, setOrder] = useState([]);
    const navigate = useNavigate()
    const [item, setItem] = useState([])
    const ref = useRef()
    const [order1, setOrder1] = useState([]);
    const [item1, setItem1] = useState([])

    const [tag, setTag] = useState('all');

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
        // setOrder([])
        Swal.fire({
              title: 'Please wait...',
              didOpen: () => {
              Swal.showLoading()
              }
          })
        ManageOrders({ tag: tag }).then((response) => {
            if (response.data.code == 1) {
                setOrder(response.data.data)
                Swal.close();
            } else {
                Swal.close()
            }
        });
    }

    const changeOrderdE = (taqg) => {
        Swal.fire({
              title: 'Please wait...',
              didOpen: () => {
              Swal.showLoading()
              }
          })
        ManageOrders({ tag: taqg }).then((response) => {
            if (response.data.code == 1) {
                setOrder(response.data.data)
                Swal.close();
            } else {
                Swal.close()
            }
        });
    }

    const orsdedeat = (id) => {
        setItem([])
        orderItemDetails({ id: id }).then((response) => {
            console.log("🚀 ~ response:", response)
            if (response.data.code == 1) {
                setItem(response.data.data)
            } else {
            }
        });
    }

    const OrderOnway = (id) => {
        manageOrderOntheway({ id: id }).then((response) => {
            if (response.data.code == 1) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                  })                  
                  Toast.fire({
                    icon: 'success',
                    title: response.data.message
                  })
                setOrder([]);
                getonload()
            } else {
            }
        });
    }

    const OrderDeliverPaymne = (id) => {
        Swal.fire({
            title: 'Is Payment Collected?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Payment Collected!'
          }).then((result) => {
            if (result.isConfirmed) {
                manageOrderDelvivers({ id : id }).then((response) => {
                  if (response.data.code == 1) {
                  Swal.fire({
                    icon: 'success',
                    title: response.data.message
                  })
                  setOrder([]);
                    getonload()
              }  else  {
                getonload()
                }
              }) 
            } 
          })
    }
    const rejaccporder = (id, tag) => {
        acceptorderrejecet({ id: id, tag: tag}).then((response) => {
            if (response.data.code == 1) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                  })                  
                  Toast.fire({
                    icon: 'success',
                    title: response.data.message
                  })
                  setOrder([])
                getonload()
            } else {
                getonload()
            }
        });
    }
    const Print = (e) => {
        e.preventDefault();
        //console.log('print');  
        let printContents = document.getElementById('printablediv').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    const columns =  [
        // {
        //     name: 'Id',
        //     selector: row => row.id,
        //     cellExport: row => row.id,
        //     width: '75px',
        //     sortable: true,
        // },
        {
            name: 'Order ID',
            selector: row => row.order_id,
            cellExport: row => row.order_id,
            sortable: true,
        },
        {
            name: 'Business Name',
            selector: row => row.business_name,
            cell: (row) => <p>{row.business_name}</p>,
            sortable: true,
        },
        {
            name: 'Order Date',
            selector: row => row.inserted_at,
            cellExport: row => row.inserted_at,
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
            selector: row => row.total_payout,
            cell: (row) => <p> $ {(Math.round(row.total_payout * 100) / 100).toFixed(2)}</p>,
        },
        {
            name: 'Order Status',
            selector: row => row.status,
            cell: (row) => <>{row.status == 'Delivered' ? <div className='alert alert-success m-0'><strong>{row.status}</strong></div> : (row.status == 'Order Cancelled' || row.status == 'Rejected') ? <div className='alert alert-danger m-0'><strong>{row.status}</strong></div> : row.status == 'Order Placed' ? <div className='alert alert-warning m-0'><strong>{row.status}</strong></div>: <div className='alert alert-info m-0'><strong>{row.status}</strong></div>}</>
        },
        {
            name: 'Action',
            selector: row => row.order_id,
            cell: (row) => <><button type="button" className="btn" style={{ boxShadow: 'none' }} id={row.order_id} onClick={() => { orsdedeat(row.order_id); setOrder1(row) }} data-toggle="modal" data-target="#editmodel"><i className="material-icons" id={row.order_id} onClick={() => { orsdedeat(row.order_id); setOrder1(row) }}>visibility</i>  </button> 
            <button type="button" className="btn" style={{ boxShadow: 'none' }} id={row.order_id} onClick={() => { navigate(`/order/invoice/${row.order_id}`) }} ><i class="zmdi zmdi-print" onClick={() => { navigate(`/order/invoice/${row.order_id}`) }}></i> </button></>
        }, 
        {
            name: <>{(tag == 'completed' || tag == 'cancelled' || tag == 'all') ? '' :'Change Order Status'}</>,
            selector: row => row.order_id,
            width: '250px',
            cell: (row) => <>{(tag == 'completed' || tag == 'cancelled' || tag == 'all') ? '' : row.status == 'Order Placed' ? <><button type="button" className="btn btn-primary waves-effect rounded waves-float" id={row.id} onClick={() => { rejaccporder(row.order_id, 'accept') }} > <strong>Accept</strong> </button> &nbsp;<button type="button" className="btn btn-danger waves-effect rounded waves-float" id={row.id} onClick={() => {rejaccporder(row.order_id, 'reject') }} > <strong>Cancel</strong> </button></> : <><button type="button" className="btn btn-success waves-effect rounded waves-float" id={row.id} onClick={() => { OrderDeliverPaymne(row.order_id) }} > <strong>Complete</strong> </button>&nbsp;<button type="button" className="btn btn-danger waves-effect rounded waves-float" id={row.id} onClick={() => {rejaccporder(row.order_id, 'reject') }} > <strong>Cancel</strong> </button></>}</>
        },
    ];

    const columns1 =  [
        // {
        //     name: 'Id',
        //     selector: row => row.id,
        //     cellExport: row => row.id,
        //     width: '75px',
        //     sortable: true,
        // },
        {
            name: 'Order ID',
            selector: row => row.order_id,
            cellExport: row => row.order_id,
            sortable: true,
        },
        {
            name: 'Business Name',
            selector: row => row.business_name,
            cell: (row) => <p>{row.business_name}</p>,
            sortable: true,
        },
        {
            name: 'Order Date',
            selector: row => row.inserted_at,
            cellExport: row => row.inserted_at,
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
            selector: row => row.total_payout,
            cell: (row) => <p> $ {(Math.round(row.total_payout * 100) / 100).toFixed(2)}</p>,
        },
        {
            name: 'Order Status',
            selector: row => row.status,
            cell: (row) => <>{row.status == 'Delivered' ? <div className='alert alert-success m-0'><strong>{row.status}</strong></div> : (row.status == 'Order Cancelled' || row.status == 'Rejected') ? <div className='alert alert-danger m-0'><strong>{row.status}</strong></div> : row.status == 'Order Placed' ? <div className='alert alert-warning m-0'><strong>{row.status}</strong></div>: <div className='alert alert-info m-0'><strong>{row.status}</strong></div>}</>
        },
        {
            name: 'Action',
            selector: row => row.order_id,
            cell: (row) => <><button type="button" className="btn" style={{ boxShadow: 'none' }} id={row.order_id} onClick={() => { orsdedeat(row.order_id); setOrder1(row) }} data-toggle="modal" data-target="#editmodel"><i className="material-icons" id={row.order_id} onClick={() => { orsdedeat(row.order_id); setOrder1(row) }}>visibility</i>  </button> 
            <button type="button" className="btn" style={{ boxShadow: 'none' }} id={row.order_id} onClick={() => { navigate(`/order/invoice/${row.order_id}`) }} ><i class="zmdi zmdi-print" onClick={() => { navigate(`/order/invoice/${row.order_id}`) }}></i> </button></>
        }, 
        // {
        //     name: <>{(tag == 'completed' || tag == 'cancelled' || tag == 'all') ? '' :'Change Order Status'}</>,
        //     selector: row => row.order_id,
        //     width: '250px',
        //     cell: (row) => <>{(tag == 'completed' || tag == 'cancelled' || tag == 'all') ? '' : row.status == 'Order Placed' ? <><button type="button" className="btn btn-primary waves-effect rounded waves-float" id={row.id} onClick={() => { rejaccporder(row.order_id, 'accept') }} > <strong>Accept</strong> </button> &nbsp;<button type="button" className="btn btn-danger waves-effect rounded waves-float" id={row.id} onClick={() => {rejaccporder(row.order_id, 'reject') }} > <strong>Cancel</strong> </button></> : <><button type="button" className="btn btn-success waves-effect rounded waves-float" id={row.id} onClick={() => { OrderDeliverPaymne(row.order_id) }} > <strong>Complete</strong> </button>&nbsp;<button type="button" className="btn btn-danger waves-effect rounded waves-float" id={row.id} onClick={() => {rejaccporder(row.order_id, 'reject') }} > <strong>Cancel</strong> </button></>}</>
        // },
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
                            <h2>Order
                                <small className="text-muted"></small>
                            </h2>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <ul className="breadcrumb float-md-right">
                                {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                                {/* <li className="breadcrumb-item active">Order</li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                                {/* <div className=''>
                                    <button className="btn btn-raised btn-primary waves-effect" style={{ margin: '15px' }} onClick={() => { setTag(''); setTag('received'); setOrder([]); changeOrderdE('received') }}>Received Order</button>
                                    <button className="btn btn-raised btn-primary waves-effect" style={{ margin: '15px' }} onClick={() => { setTag(''); setTag('completed'); setOrder([]); changeOrderdE('completed') }}>Completed Order</button>
                                    <button className="btn btn-raised btn-primary waves-effect" style={{ margin: '15px' }} onClick={() => { setTag(''); setTag('cancelled'); setOrder([]); changeOrderdE('cancelled') }}>Canceled Order</button>
                                </div> */}
                                {/* <div className="body"> */}
                                    {/* <div className='table-responsive'>
                                        <DataTableExtensions columns={columns} data={order}>
                                            <DataTable columns={columns} data={order} responsive pagination customStyles={customStyles} />
                                        </DataTableExtensions>
                                    </div> */}

                        <div class="body"> 
                        <ul class="nav nav-tabs">
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#home" onClick={() => { setTag(''); setTag('received'); setOrder([]); changeOrderdE('received') }}>Active</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#messages" onClick={() => { setTag(''); setTag('completed'); setOrder([]); changeOrderdE('completed') }}>Completed</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#profile" onClick={() => { setTag(''); setTag('cancelled'); setOrder([]); changeOrderdE('cancelled') }}>Cancelled / Rejected</a></li>
                            <li class="nav-item"><a class="nav-link " data-toggle="tab" href="#alle" onClick={() => { setTag(''); setTag('all'); setOrder([]); changeOrderdE('all') }}>All</a></li>
                        </ul>                        
                        <div class="tab-content">
                        <div role="tabpanel" class="tab-pane in active" id="alle">
                            <div className='table-responsive'>
                                        <DataTableExtensions columns={columns1} data={order}>
                                            <DataTable columns={columns1} data={order} responsive pagination customStyles={customStyles} />
                                        </DataTableExtensions>
                                    </div>
                            </div>
                            <div role="tabpanel" class="tab-pane in" id="home">
                            <div className='table-responsive'>
                                        <DataTableExtensions columns={columns} data={order}>
                                            <DataTable columns={columns} data={order} responsive pagination customStyles={customStyles} />
                                        </DataTableExtensions>
                                    </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="profile"> 
                            <div className='table-responsive'>
                                        <DataTableExtensions columns={columns1} data={order}>
                                            <DataTable columns={columns1} data={order} responsive pagination customStyles={customStyles} />
                                        </DataTableExtensions>
                                    </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="messages"> 
                            <div className='table-responsive'>
                                        <DataTableExtensions columns={columns1} data={order}>
                                            <DataTable columns={columns1} data={order} responsive pagination customStyles={customStyles} />
                                        </DataTableExtensions>
                                    </div>
                            </div>
                            
                        </div>
                    </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <div class="modal fade" id="editmodel" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="largeModalLabel">Order Details</h4>
                        </div>
                        <div class="modal-body">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Product Image</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Item</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item && item.map((item, int) => {
                                        return (
                                            <tr key={int}>
                                                <td><img className="rounded image-popup" alt="product" style={{ width: 70, height: 70 }} src={item.image} /></td>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td>{item.qty}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-link waves-effect" data-dismiss="modal">CLOSE</button>
                        </div>
                    </div>
                </div>
            </div> */}

            <div class="modal fade" id="editmodel" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="largeModalLabel">Order Details</h4>
                        </div>
                        <div class="modal-body">
                        <div className="col-lg-12" id='printablediv' ref={ref}>
                            <div className="card">
                                
                                <div className="body" >
                                    <div className="row clearfix">
                                        <div className="col-md-12">
                                            <img
                                                src="http://13.238.15.59/api/logo192.png"
                                                width={80}
                                                alt="ballina"
                                            />
                                            <h5 className="float-md-right">
                                                Order Id # <br />
                                                <strong>{order1.order_id}</strong>
                                            </h5>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 text-top" 
                                         style={{ marginBottom: '20px', marginTop:0, paddingTop: 0 }}>
                                            <address>
                                                <span>
                                                <strong>Business Name: </strong> {order1.business_name}
                                                </span><br/>
                                                <strong>{order1.name}</strong>
                                                <br />
                                                {order1.address}
                                                <br />
                                                &#9742; {order1.phone}
                                            </address>
                                        </div>
                                        <div className="col-md-6 col-sm-6 text-right">
                                            
                                            <span>
                                                <strong>Order Date: </strong> {order1.inserted_at}
                                            </span><br/>
                                            <span>
                                                <strong>Expected Delivery: </strong> {order1.deliver_datetime}
                                            </span><br/>
                                            <span >
                                                <strong>Order Status: </strong>{order1.status}
                                            </span><br/>
                                            {order1.status == 'Order Cancelled' ? <span >
                                                <strong>Cancel Reason: </strong>{order1.cancel_reason}
                                            </span> : <></>}
                                        </div>
                                    </div>
                                    <div className="mt-40" />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="table-responsive">
                                                <table
                                                    id="mainTable"
                                                    className="table table-striped"
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>Product ID</th>
                                                            <th>Product Image</th>
                                                            <th>Product Name</th>
                                                            <th>Quantity</th>
                                                            <th>Unit Cost</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {item && item.map((item, int) => {
                                                            return (
                                                                <tr key={int}>
                                                                    <td>{item.id}</td>
                                                                    <td><img className="rounded image-popup" alt="product" style={{ width: 40, height: 40 }} src={item.image} /></td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>$ {(Math.round(item.price * 100) / 100).toFixed(2)}</td>
                                                                    <td>$ {(Math.round((item.price * item.quantity) * 100) / 100).toFixed(2)}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-12 text-right">
                                            <span className="text-right">
                                                <b>Sub-total:</b> $ {(Math.round(order1.payment_surcharge * 100) / 100).toFixed(2)}
                                            </span><br/>
                                            {/* <span className="text-right">Shipping: $ {order1.shipping}</span><br/> */}
                                            <span className="text-right">GST (10%): $ {(Math.round(order1.tax * 100) / 100).toFixed(2)}</span>
                                            <hr />
                                            <h4 className="text-right">AUD $ {(Math.round(order1.total_payout * 100) / 100).toFixed(2)} </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                        <ReactToPrint trigger={()=> <button type='button' className="btn btn-raised btn-success" >Print
                                        </button>} content={ ()=> ref.current} />
                            <button type="button" className="btn btn-link waves-effect" data-dismiss="modal">CLOSE</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageOrder
