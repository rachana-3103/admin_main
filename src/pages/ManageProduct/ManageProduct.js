import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import React, { useState, useEffect } from 'react'
import { ManageProducts, getProductList, deleteProduct, productAvaily, getCategoryList, editProduct } from '../../api/apiHandler';
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import $ from "jquery";
import { Helmet } from 'react-helmet';
import "jquery/dist/jquery.min.js";
import S3 from 'react-aws-s3';

window.Buffer = window.Buffer || require("buffer").Buffer;

const S3_BUCKET = "ballians3";
const REGION = "ap-southeast-2";
const ACCESS_KEY = "AKIAVPLV3K6GCR74BC6S";
const SECRET_ACCESS_KEY = "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";


const config = {
    bucketName: S3_BUCKET,
    dirName: 'product',
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    s3Url: 'https://ballians3.s3.amazonaws.com'
  };

const ReactS3Client = new S3(config);


function ManageProduct() {
    const [order, setOrder] = useState([]);
    const [prod, setProd] = useState([]);
    const navigate = useNavigate()
    const [createcat, setcreatecat] = useState('');
    const [categ, setCateg] = useState([]);
    const [upd, setUpd] = useState([]);
    const [proded, setProded] = useState([])
    const [cateid, setCateid] = useState('');
    const cateId = (id) => {
        setCateid(id)
    }

    const [tag, setTag] = useState('all');
    const haChange = (e) => {
        const { name, value } = e.target;
        setcreatecat({ ...createcat, [name]: value });
    }

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
        getProductList({ id: 0}).then((response) => {
            if (response.data.code == 1) {
                setProd(response.data.data)
                Swal.close();
            } else {
                Swal.close()
            }
        });
        getCategoryList({ id: 0}).then((response) => {
            if (response.data.code == 1) {
                //delete response.data.data[0]
                setCateg(response.data.data)
            } else {
            }
        });
           
            //   ManageProducts({ tag: tag }).then((response) => {
            //     if (response.data.code == 1) {
            //         setOrder(response.data.data)
            //         Swal.close();
            //     } else {
            //         Swal.close()
            //     }
            // });
    }

    // const changeProductE = (taqg) => {
    //     console.log("🚀 ~ taqg:", taqg)
    //     Swal.fire({
    //           title: 'Please wait...',
    //           didOpen: () => {
    //           Swal.showLoading()
    //           }
    //       })
    //     ManageProducts({ tag: taqg }).then((response) => {
    //         if (response.data.code == 1) {
    //             setOrder(response.data.data)
    //             Swal.close();
    //         } else {
    //             Swal.close()
    //         }
    //     });
    // }

    const imgchnge = (e) => {
        setUpd([])
        const files = e.target.files[0]
        var newfile = new Date().getTime() + files.name
        ReactS3Client.uploadFile(files, newfile).then(data => {
            // console.log('data :', data);
            if (data.status === 204) {
                // upd.push(data.location.split("/")[4]);
                setUpd(newfile)
            } else {
                console.log('obj err')
            }
        });
    }

    const onudate = (id)=>{
        productAvaily({ id: id}).then((response) => {
            if (response.data.code == 1) {
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    confirmButtonText: 'Okay'
                })
                  setProd([])
                  setTimeout(() => {
                      getonload()
                  }, 1000);
                } else {
                    getonload()
            }
        })
    }

    const prodedit = () => {
        if(createcat.tag == undefined){
            createcat.tag = 'unit'
        } 
        editProduct({ id: createcat.id, category_id: cateid, name: createcat.name, unit: createcat.unit, price: createcat.price, qty: createcat.unit += createcat.tag, details: createcat.details, image: upd.toString() }).then((response) => {
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

                  setTimeout(() => {
                      getonload()
                  }, 1000);
                } else {
                    getonload()
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
                deleteProduct({ id : id }).then((response) => {
                  if (response.data.code == 1) {
                  Swal.fire(
                    'Deleted!',
                    'Product has been deleted successfully'
                  )
                    getonload()
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
        //   width:'75px',
        //   sortable: true,
        // },
        {
            name: 'Product Name',
            selector: row => row.name,
            cellExport: row => row.name,
            sortable: true,
          },
        {
          name: 'Category Name',
          selector: row => row.category_name,
          cellExport: row => row.category_name,
          sortable: true,
        },
        
          {
            name: 'Price',
            selector: row => row.price,
            // cellExport: row => row.price,
            cell: (row) => <p>$ {(Math.round(row.price * 100) / 100).toFixed(2)}</p>,
            sortable: true,
          },
          {
            name: 'Qty',
            selector: row => row.qty,
            cellExport: row => row.qty,
          },
        //   {
        //     name: 'Details',
        //     selector: row => row.details,
        //     cell:(row)=><p>{row.details}</p>
        //   },
          {
            name: 'Image',
            selector: row => row.image,
            width: '200px',
            cell: (row) => <a href={row.image} className="image-popup"><img className="rounded image-popup" alt="product" style={{width: 100, height: 100}} src={row.image}/></a>
          },
          {
            name: 'Sell/NotSell',
            selector: row => row.id,
            // width: '200px',
            // cell: (row) => <>{row.is_sell == 0 ? <button type="button" className="btn btn-danger waves-effect rounded waves-float" id={row.id} onClick={()=> {onudate(row.id)}} > <strong>Out Of Stock</strong> </button> : <button type="button" className="btn btn-success waves-effect rounded waves-float" id={row.id} onClick={()=> {onudate(row.id)}} > <strong>In Stock</strong> </button> }</>
            cell: (row) => <><div class="demo-switch"><div class="switch"><label>{row.is_sell == 1 ? <input type="checkbox" id={row.id} onClick={()=> {onudate(row.id)}} defaultChecked/> : <input type="checkbox" id={row.id} onClick={()=> {onudate(row.id)}}/>} <span class="lever switch-col-light-blue"></span></label></div></div></>
          },
        //   {
        //     name: 'Action',
        //     selector: row => row.id,
        //     width: '150px',
        //     cell: (row) => <><button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={()=> {setcreatecat(row);cateId(row.category_id) }}  data-toggle="modal" data-target="#editmodel"><i className="material-icons" id={row.id} onClick={()=> {setcreatecat(row)}}>create</i>  </button> <button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={() => { deletec(row.id) }} ><i className="material-icons" id={row.id} onClick={()=>{deletec(row.id)}}>delete</i>  </button></>
        //   },
          {
            name: 'Action',
            selector: row => row.id,
            width: '150px',
            cell: (row) => <><button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={()=> navigate(`/product/edit/${row.id}`) } ><i className="material-icons" id={row.id} onClick={()=> navigate(`/product/edit/${row.id}`)}>create</i>  </button> <button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={() => { deletec(row.id) }} ><i className="material-icons" id={row.id} onClick={()=>{deletec(row.id)}}>delete</i>  </button></>
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
                              <h2>Product
                                  <small className="text-muted">Add, Edit, Delete &amp; Action Product</small>
                              </h2>
                          </div>
                          <div className="col-lg-5 col-md-6 col-sm-12">
                              <ul className="breadcrumb float-md-right">
                                  {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                                  {/* <li className="breadcrumb-item active">Product</li> */}
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div className="container-fluid">
                      <div className="row clearfix">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                              <div className="card">
                              <div className='float-right'>
                                    <button className="btn btn-raised btn-primary waves-effect" style={{margin:'15px'}} onClick={()=> (navigate(`/product/create`))}>Create Product</button>
                                </div>
                                  <div className="body">
                                  {/* <ul class="nav nav-tabs">
                            <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#alle" onClick={() => { setTag(''); setTag('all'); setOrder([]); changeProductE('all') }}>All</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#home" onClick={() => { setTag(''); setTag('Fruits'); setOrder([]); changeProductE('Fruits') }}>Fruits</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#messages" onClick={() => { setTag(''); setTag('Vegetables'); setOrder([]); changeProductE('Vegetables') }}>Vegetables</a></li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#profile" onClick={() => { setTag(''); setTag('Grocery'); setOrder([]); changeProductE('Grocery') }}>Grocery</a></li>
                        </ul>  */}
                                      <div className='table-responsive'>
                                      <DataTableExtensions columns={columns} data={prod}>
                          <DataTable columns={columns} data={prod} responsive pagination customStyles={customStyles}/>
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
                          <h4 class="modal-title" id="largeModalLabel">Edit Product</h4>
                      </div>
                      <div class="modal-body">
                          <form method="" action='#'>
                              <div className="row clearfix modal-body">
                                  <div className="col-sm-12">
                                      {/* <div className="form-group">
                                          <h6>Category Name : {createcat.category_name}</h6>
                                      </div> */}
                                      <div className="form-group form-float" style={{marginBottom:'0px'}}>
                                            <h6>Product Category</h6>
                                            <select class="form-control form-line" name='category_id' onChange={(e) => cateId(e.target.value)} value={cateid}>
                                            <option >SELECT CATEGORY</option> {categ == '' ? "" : categ.map((el, i) => <><option key={i} value={el.id}>{el.name}</option></>)}
                                        </select>
                                        </div>
                                  </div>
                                    <div className='col-md-6'>
                                        <div className="form-group form-float" >
                                        <h6>Product Name</h6>
                                            <div className="form-line">
                                                <input type='text' className="form-control" id='name' name="name" required onChange={haChange} value={createcat.name} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                    <div className="form-group form-float" >
                                            <h6>Price</h6>
                                            {/* <div className="form-line">
                                                <input type='number' className="form-control" id='price' name="price" required onChange={haChange} value={createcat.price}/>
                                            </div> */}
                                            <div class="input-group"> <span class="input-group-addon"> <i class="material-icons">attach_money</i> </span>
                                                        <div class="form-line">
                                                            <input type="text" class="form-control money-euro" id='price' name="price" required onChange={haChange} value={createcat.price} />
                                                        </div>
                                                    </div>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className="form-group form-float" >
                                            <h6>QTY</h6>
                                            <div className="form-line">
                                                <input type='number' className="form-control" id='unit' name="unit" required onChange={haChange} value={createcat.unit}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-2'>
                                        <div className="form-group form-float" >
                                            <h6>Sold By</h6>
                                            <div className="form-line">
                                                    <select class="form-control" id="tag" name='tag' value={createcat.tag} onChange={haChange} required>
                                                        <option value='unit'>Unit</option>
                                                        <option value='kg'>Kilogram</option>
                                                        <option value='gram'>Gram</option>
                                                        <option value='liter'>Liter</option>
                                                        <option value='ml'>Mililiter</option>
                                                    </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="form-group form-float" >
                                            <h6>Short Product Details</h6>
                                            <div className="form-line">
                                                <input type='text' className="form-control" id='details' name="details" required onChange={haChange} value={createcat.details}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                    <div class="form-line mt-4" >
                                    <h6>Product Photo</h6>
                                        <input type="file" class="form-control" name="image" id='image' onInput={imgchnge} accept="image/png, image/gif, image/jpeg, image/jpg" />
                                    </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                  <button type="submit" className="btn btn-link waves-effect" data-dismiss="modal" onClick={prodedit}>SAVE</button>
                                  <button type="button" className="btn btn-link waves-effect" data-dismiss="modal">CLOSE</button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>


    </>
  )
}

export default ManageProduct
