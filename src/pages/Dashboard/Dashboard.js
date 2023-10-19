import React, { useState, useEffect } from 'react'
import { dashBoard, customerGraphs, monthOrderSale, dateOrderSales } from '../../api/apiHandler';
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Chart from 'react-apexcharts';


function Dashboard() {
    const [dash, setDash] = useState([]);
    const [cus, setCus] = useState([]);
    const [ordermo, setOrdermo] = useState([]);
    const [dates, setDates] = useState([]);
    let navigate = useNavigate();
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
        dashBoard({}).then((response) => {
            if (response.data.code == 1) {
                setDash(response.data.data[0])
                Swal.close();
            } else {
                Swal.close()
            }
        });
        customerGraphs({}).then((response) => {
            if (response.data.code == 1) {
                setCus(response.data.data)
                Swal.close();
            } else {
                Swal.close()
            }
        });
        monthOrderSale({}).then((response) => {
            if (response.data.code == 1) {
                setOrdermo(response.data.data)
                Swal.close();
            } else {
                Swal.close()
            }
        });
        dateOrderSales({}).then((response) => {
            if (response.data.code == 1) {
                setDates(response.data.data)
                Swal.close();
            } else {
                Swal.close()
            }
        });
    }

    const incomeData = {
        series: [{
                name: 'User',
                data: cus.map(a => a.count),
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
                text: 'Customers',
              },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'Month',
                categories: cus.map(a => a.month)
            },
        }
    }
    const incomeData1 = {
        series: [{
                name: 'Revenue',
                data: ordermo.map(a => a.payment),
            },
            {
                name: 'Number of Orders',
                data: ordermo.map(a => a.count),
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
                text: 'Monthly',
              },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'Months',
                categories: ordermo.map(a => a.month)
            },
        }
    }
    const incomeData2 = {
        series: [{
                name: 'Revenue',
                data: dates.map(a => a.payment),
            },
            {
                name: 'Number of orders',
                data: dates.map(a => a.count),
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
                text: 'Daily',
              },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'Date',
                categories: dates.map(a => a.date)
            },
        }
    }

    return (
        <>
            <section className="content blog-page">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2>Dashboard
                                {/* <small>Welcome to Ballina Farm Fresh Admin Panel</small> */}
                            </h2>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <ul className="breadcrumb float-md-right">
                                {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                                {/* <li className="breadcrumb-item active">Dashboard</li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <br />
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="card l-slategray">
                                <div className="body">
                                    <h5 className="m-b-0 c-0 text-white" >Total </h5>
                                    <h5 className="m-b-0 c-0 text-white" > Customers</h5>
                                    <h3 className="m-t-0 c-0 text-white" >{dash?.vendor == '' ? 0 : dash.vendor}</h3>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="card l-slategray">
                                <div className="body">
                                    <h5 className="m-b-0 c-0 text-white" >Today</h5>
                                    <h3 className="m-t-0 c-0 text-white" >{dash?.today_order} / $ {dash?.today_value == null ? '0.00' : (Math.round(dash?.today_value * 100) / 100).toFixed(2)}</h3>
                                    <h5 className="m-b-0 c-0 text-white" >Orders / Values</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="card l-slategray">
                                <div className="body">
                                    <h5 className="m-b-0 c-0 text-white" >All</h5>
                                    <h3 className="m-t-0 c-0 text-white" >{dash?.total_order} / $ {dash?.earning == null ? '0.00' : (Math.round(dash?.earning * 100) / 100).toFixed(2)}</h3>
                                    <h5 className="m-b-0 c-0 text-white" > Orders / Values</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 col-md-6">
                            <div className="card">
                                <div className="body">
                                <Chart options={incomeData.options} series={incomeData.series} type="line" height={310} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 col-md-6">
                            <div className="card">
                                <div className="body">
                                <Chart options={incomeData1.options} series={incomeData1.series} type="line" height={310} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 col-md-6">
                            <div className="card">
                                <div className="body">
                                <Chart options={incomeData2.options} series={incomeData2.series} type="line" height={310} />
                                </div>
                            </div>
                        </div>
                    </div>
                        
                </div>
            </section>
        </>
    )
}

export default Dashboard
