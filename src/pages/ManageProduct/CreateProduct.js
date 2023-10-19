import React, { useState, useEffect } from 'react'
import { getCategoryList, productCreate } from '../../api/apiHandler';
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';
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

function CreateProduct(props) {
    const navigate = useNavigate()
    const [val, setVal] = useState([]);
    const [imge, setImge] = useState([]);
    const [upd, setUpd] = useState([]);
    const [cate, setCate] = useState([]);
    const [cateid, setCateid] = useState(1);

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

    const getonload = () => {
        getCategoryList({ id: 0 }).then((response) => {
            if (response.data.code == 1) {
                //delete response.data.data[0]
                setCate(response.data.data)
                Swal.close()
            } else {
                Swal.close()
            }
        });
    }

    const cateId = (id) => {
        setCateid(id)
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

    const prodcreate = (e) => {
        e.preventDefault();
if(cateid > 1){
    if(val.tag != undefined) {
        props.isLoader(true)
        productCreate({ name: val.name, category_id: cateid,  unit: val.qty, price: val.price, qty: val.qty.concat(val.tag), details: val.details, image: upd.toString() }).then((response) => {
            props.isLoader(false)
            if (response.data.code == 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product has been added Successfully',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/product')
                    }
                })
            } else {
                // alert(response.data.message)
            }
        })
    } else{
        Swal.fire({
            icon: 'error',
            title: 'Please Select Sold By Type',
            confirmButtonText: 'Okay'
        })
    }
    } else{
        Swal.fire({
            icon: 'error',
            title: 'Please Select Category',
            confirmButtonText: 'Okay'
        })
    }

    }

    return (
        <>
            <section className="content">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2>Create Product
                            </h2>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <ul className="breadcrumb float-md-right">
                                {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                                {/* <li className="breadcrumb-item active">Create Product</li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className='float-right'>
                            <button className="btn btn-raised btn-default waves-effect" style={{ margin: '15px' }} onClick={() => (navigate('/product'))}>⬅ Back</button>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="body">
                                    <form className="col-lg-12" method="" onSubmit={prodcreate} action="#" >
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className="form-group form-float" style={{ marginBottom: '0px' }}>
                                                    <h6>Product Category</h6>
                                                    <select class="form-control form-line" name='category_id' onChange={(e) => cateId(e.target.value)} value={cateid}>
                                                        <option>SELECT CATEGORY</option>{cate == '' ? "" : cate.map((el, i) => <><option key={i} value={el.id}>{el.name}</option></>)}
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
                                                        <input type='number' min={0} className="form-control" id='qty' name="qty" required onChange={haChange} value={val.qty} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-2'>
                                                <div className="form-group form-float" >
                                                    <h6>Sold By</h6>
                                                    <div className="form-line">
                                                        <select class="form-control" id="tag" name='tag' value={val.tag} onChange={haChange} required>
                                                        <option >SELECT</option>
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
                                                </div>
                                            </div>
                                        </div>

                                        <br />
                                        <div className="col-lg-12">
                                            <button className="btn btn-raised btn-primary waves-effect" type="submit">Create</button> &nbsp; &nbsp;
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

export default CreateProduct
