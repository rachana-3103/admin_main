import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import React, { useState, useEffect } from 'react'
import { accpRejOrder, orderItemDetails, acceptorderrejecet } from '../../api/apiHandler';
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import $ from "jquery";
import { Helmet } from 'react-helmet';
import "jquery/dist/jquery.min.js";

function AcceptOrder(props) {
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
    const getonload = () => {
        accpRejOrder({ id: 0 }).then((response) => {
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
            if (response.data.code == 1) {
                setItem(response.data.data)
            } else {
            }
        });
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

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            cellExport: row => row.id,
            width: '75px',
            sortable: true,
        },
        {
            name: 'Order ID',
            selector: row => row.order_id,
            cellExport: row => row.order_id,
            sortable: true,
        },
        {
            name: 'Vendor Name',
            selector: row => row.name,
            cellExport: row => row.name,
            sortable: true,
        },
        {
            name: 'Vendor Address',
            selector: row => row.address,
            cellExport: row => row.address,
            sortable: true,
        },
        {
            name: 'Total Payment',
            selector: row => row.total_payout,
            cellExport: row => row.total_payout,
        },
        {
            name: 'Delivery Date',
            selector: row => row.deliver_datetime,
            cell: (row) => <p>{row.deliver_datetime}</p>
        },
        {
            name: 'View Order',
            selector: row => row.order_id,
            cell: (row) => <button type="button" className="btn" style={{ boxShadow: 'none' }} id={row.order_id} onClick={() => { orsdedeat(row.order_id) }} data-toggle="modal" data-target="#editmodel"><i className="material-icons" id={row.order_id} onClick={() => { orsdedeat(row.order_id) }}>visibility</i>  </button>
        },
        {
            name: 'Accept',
            selector: row => row.id,
            cell: (row) => <button type="button" className="btn btn-success waves-effect rounded waves-float" id={row.id} onClick={() => { rejaccporder(row.order_id, 'accept') }} > <strong>Accept</strong> </button>
        },
        {
            name: 'Reject',
            selector: row => row.id,
            cell: (row) => <button type="button" className="btn btn-warning waves-effect rounded waves-float" id={row.id} onClick={() => {rejaccporder(row.order_id, 'reject') }} > <strong>Reject</strong> </button>
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
                            <h2>Accept Reject Order
                                <small className="text-muted"></small>
                            </h2>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <ul className="breadcrumb float-md-right">
                                {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                                {/* <li className="breadcrumb-item active">Accept Reject Order</li> */}
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
                                        <DataTableExtensions columns={columns} data={order}>
                                            <DataTable columns={columns} data={order} responsive pagination customStyles={customStyles} />
                                        </DataTableExtensions>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="modal fade" id="editmodel" tabindex="-1" role="dialog">
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
            </div>
        </>
    )
}

export default AcceptOrder
