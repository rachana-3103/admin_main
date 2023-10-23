import React, { useState, useEffect, useRef } from 'react'
import { ManageOrdersforInvoice, orderItemDetails } from '../../api/apiHandler';
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import $ from "jquery";
import { Helmet } from 'react-helmet';
import "jquery/dist/jquery.min.js";
import ReactToPrint from 'react-to-print';


function Invoice() {
    const ref = useRef()

    // const Print = (e) => {
    //     e.preventDefault()
    //     //console.log('print');  
    //     // $('.buthide').remove();
    //     let printContents = document.getElementById('printablediv').innerHTML;
    //     let originalContents = document.body.innerHTML;
    //     document.body.innerHTML = printContents;
    //     window.print();
    //     document.body.innerHTML = originalContents;
    // }

    const [order, setOrder] = useState([]);
    const navigate = useNavigate()
    const [item, setItem] = useState([])

    useEffect(() => {
        Swal.fire({
            title: 'Please wait...',
            didOpen: () => {
                Swal.showLoading()
            }
        })
        getonload();
    }, []);
    let ists = window.location.pathname.split('/')[3]
    const getonload = () => {
        ManageOrdersforInvoice({ id: ists }).then((response) => {
            if (response.data.code == 1) {
                setOrder(response.data.data[0])
                Swal.close();
            } else {
                Swal.close()
            }
        });
        orderItemDetails({ id: ists }).then((response) => {
            if (response.data.code == 1) {
                setItem(response.data.data)
            } else {
            }
        });
    }

    const goback = (e) => {
        navigate('/order')
    }
    return (
        <>
            <section className="content">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2>
                                Invoice
                            </h2>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                        <ul className="breadcrumb float-md-right">
                                {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                                {/* <li className="breadcrumb-item">Order</li> */}
                                <li className="breadcrumb-item active">Invoice</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" >
                    <div className="row clearfix" >
                <div className='float-right buthide'>
                            <button className="btn btn-raised btn-default waves-effect " style={{ margin: '15px' }} onClick={(i)=>goback(i)}>⬅ Back</button>
                        </div>
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
                                                <strong>{order.order_id}</strong>
                                            </h5>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6" style={{ marginBottom: '20px' }}>
                                            <address>
                                                <strong>{order.name}</strong>
                                                <br />
                                                {order.address}
                                                <br />
                                                &#9742; {order.phone}
                                            </address>
                                        </div>
                                        <div className="col-md-6 col-sm-6 text-right">
                                            <span>
                                                <strong>Business Name: </strong> {order.business_name}
                                            </span><br/>
                                            <span>
                                                <strong>Order Date: </strong> {order.inserted_at}
                                            </span><br/>
                                            <span>
                                                <strong>Expected Delivery: </strong> {order.deliver_datetime}
                                            </span><br/>
                                            <span>
                                                <strong>Order Status: </strong>{order.status}
                                            </span><br/>
                                            {order.status == 'Order Cancelled' ? <span className="m-t-10">
                                                <strong>Cancel Reason: </strong>{order.cancel_reason}
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
                                                                    <td>$ { (Math.round((item.price * item.quantity) * 100) / 100).toFixed(2) }</td>
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
                                                <b>Sub-total:</b> $ {(Math.round(order.payment_surcharge * 100) / 100).toFixed(2)}
                                            </span><br/>
                                            {/* <span className="text-right">Shipping: $ {order.shipping}</span><br/> */}
                                            <span className="text-right">GST (10%) : $ {(Math.round(order.tax * 100) / 100).toFixed(2)}</span>
                                            <hr />
                                            <h4 className="text-right">AUD $ {(Math.round(order.total_payout * 100) / 100).toFixed(2)} </h4>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="hidden-print col-md-12 text-right">

<ReactToPrint trigger={()=> <button type='button' className="btn btn-raised btn-success" >
                                            <i className="zmdi zmdi-print" />
                                        </button>} content={ ()=> ref.current} />
                                        


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

export default Invoice
