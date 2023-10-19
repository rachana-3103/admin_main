import React, { useState, useEffect } from 'react'
import { getProductList, getCategoryList, editProduct } from '../../api/apiHandler';
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import $ from "jquery";
import { Helmet } from 'react-helmet';
import "jquery/dist/jquery.min.js";
import S3 from 'react-aws-s3';
import Select from 'react-select';

const options = [
    {value:'unit', label:'Unit'},
    {value:'kg', label:'Kilogram'}
]

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


function EditProduct(props) {

    const [prod, setProd] = useState([]);
    const navigate = useNavigate()
    const [val, setVal] = useState('');
    console.log(val.qty)
    const [categ, setCateg] = useState([]);
    const [upd, setUpd] = useState([]);
    const [proded, setProded] = useState([])
    const [cateid, setCateid] = useState('');
    const cateId = (id) => {
        setCateid(id)
    }

    const haChange = (e) => {
        const { name, value } = e.target;
        setVal({ ...val, [name]: value });
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
    const ist = window.location.pathname.split('/')[3]
    const getonload = () => {
        getProductList({ id: ist}).then((response) => {
            if (response.data.code == 1) {
                response.data.data[0].qty =  response.data.data[0].qty.replace(/[0-9]+/g, '')
                setVal(response.data.data[0])
                cateId(response.data.data[0].category_id)
                Swal.close();
            } else {
                Swal.close()
            }
        });
        getCategoryList({ id: 0}).then((response) => {
            if (response.data.code == 1) {
                setCateg(response.data.data)
            } else {
            }
        });
    }

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
    const prodedit = (e) => {
        e.preventDefault()
        if(val.tag == undefined){
            val.tag = val.qty
        } 
        editProduct({ id: val.id, category_id: cateid, name: val.name, unit: val.unit, price: val.price, qty: val.unit += val.tag, details: val.details, image: upd.toString() }).then((response) => {
            if (response.data.code == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product has been edited successfully',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/product')
                    }
                })
                //   setTimeout(() => {
                //       getonload()
                //   }, 1000);
                } else {
                    getonload()
            }
        })
    }


  return (
    <>
      <section className="content">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2>Edit Product
                            </h2>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <ul className="breadcrumb float-md-right">
                                {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                                {/* <li className="breadcrumb-item active">Edit Product</li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className=''>
          <button className="btn btn-raised btn-default waves-effect" style={{ margin: '15px' }} onClick={() => (navigate('/product'))}>⬅ Back</button>
        </div>
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="body">
                                    <form className="col-lg-12" method="" onSubmit={prodedit} action="#" >
                                        <div className='row'>
                                            <div className='col-md-6'>
                                            <div className="form-group form-float" style={{marginBottom:'0px'}}>
                                            <h6>Product Category</h6>
                                            <select class="form-control form-line" name='category_id' onChange={(e) => cateId(e.target.value)} value={cateid}>
                                            <option >SELECT CATEGORY</option> {categ == '' ? "" : categ.map((el, i) => <><option key={i} value={el.id}>{el.name}</option></>)}
                                        </select>
                                        </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className="form-group form-float" >
                                                    <h6>Product Name</h6>
                                                    <div className="form-line">
                                                        <input type='text' className="form-control" id='name' name="name" required onChange={haChange} value={val.name} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group form-float" >
                                                    <h6>Price</h6>
                                                    {/* <div className="form-line">
                                            <input type='number' className="form-control money-dollar" id='price' name="price" required onChange={haChange} value={val.price}/>
                                            </div> */}
                                                    <div class="input-group"> <span class="input-group-addon"> <i class="material-icons">attach_money</i> </span>
                                                        <div class="form-line">
                                                            <input type="text" class="form-control money-dollar" id='price' name="price" required onChange={haChange} value={val.price} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className="form-group form-float" >
                                                    <h6>QTY</h6>
                                                    <div className="form-line">
                                                        <input type='number' min={0} className="form-control" id='unit' name="unit" required onChange={haChange} value={val.unit} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-2'>
                                                <div className="form-group form-float" >
                                                    <h6>Sold By</h6>
                                                    <div className="form-line">
                                                        <select class="form-control" id="qty" name='qty' value={val.qty} onChange={haChange} required>
                                                            <option value='unit'>Unit</option>
                                                            <option value='kg'>Kilogram</option>
                                                            <option value='gram'>Gram</option>
                                                            <option value='liter'>Liter</option>
                                                            <option value='ml'>Mililiter</option>
                                                        </select>

{/* <Select
        defaultValue={val.qty}
        onChange={haChange}
        options={options}
      /> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group form-float" >
                                                    <h6>Short Product Details</h6>
                                                    <div className="form-line">
                                                        <input type='text' className="form-control" id='details' name="details" required onChange={haChange} value={val.details} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='row'>

                                            <div class="col-md-6">
                                                <div class="form-line mt-4" >
                                                    <h6>Product Photo</h6>
                                                    <input type="file" class="form-control" name="image" id='image' onInput={imgchnge} accept="image/png, image/gif, image/jpeg, image/jpg" />
                                                    <div class="help-info col-red font-bold">NOTE: The newly uploaded photo will replace the previous one if you select it.  </div>
                                                </div>
                                            </div>
                                        </div>

                                        <br />
                                        <div className="col-lg-12">
                                            <button className="btn btn-raised btn-primary waves-effect" type="submit">Save</button> &nbsp; &nbsp;
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default EditProduct
