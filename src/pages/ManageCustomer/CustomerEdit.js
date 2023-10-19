import React, { useEffect, useState } from 'react'
import { manageCustomer, updateCustomer } from '../../api/apiHandler';
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import S3 from 'react-aws-s3';

window.Buffer = window.Buffer || require("buffer").Buffer;

const S3_BUCKET = "ballians3";
const REGION = "ap-southeast-2";
const ACCESS_KEY = "AKIAVPLV3K6GCR74BC6S";
const SECRET_ACCESS_KEY = "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";


const config = {
    bucketName: S3_BUCKET,
    dirName: 'profileimage',
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    s3Url: 'https://ballians3.s3.amazonaws.com'
  };

const ReactS3Client = new S3(config);

function CustomerEdit() {

    var ist = window.location.pathname.split('/')[2];
    let navigate = useNavigate();
    const [val, setVal] = useState([]);
    const [upd, setUpd] = useState([]);
    
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
        manageCustomer({ id : ist}).then((response) => {
            if (response.data.code == 1) {
                setVal(response.data.data[0])
                Swal.close()
            } else {
                Swal.close()
            }
        });
    }

    const imgchnge = (e) => {
        setUpd([])
        const files = e.target.files[0]
        var newfile = new Date().getTime() + files.name
        ReactS3Client.uploadFile(files, newfile).then(data => {
            if (data.status === 204) {
                // upd.push(data.location.split("/")[4]);
                setUpd(newfile)
            } else {
                console.log('obj err')
            }
        });
    }

    const updateCustom = (e) => {
        e.preventDefault();

        updateCustomer({ id:ist, fname:val.fname, lname: val.lname, email: val.email, phone: val.phone, business_name: val.business_name, address:val.address }).then((response) => {
            if (response.data.code == 1) {
                Swal.fire({
                    icon:'success',
                    title: 'Customer has been edited successfully',
                    confirmButtonText: 'Okay'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setTimeout(() => { navigate('/managecustomer') })
                    }
                })
            } else {
                // alert(response.data.message)
            }
        })
    }
  return (
    <>
       <section className="content">
            <div className="block-header">
                <div className="row">
                    <div className="col-lg-7 col-md-6 col-sm-12">
                        <h2>Edit Customer
                        </h2>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12">
                    <ul className="breadcrumb float-md-right">
                                  {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                                  {/* <li className="breadcrumb-item active">Edit Customer</li> */}
                              </ul>
                    </div>
                </div>
            </div>

            <div class="container-fluid">
        <div class="row clearfix">
        <div className='col-md-12 col-lg-12'>
        <div className=''>
        <button className="btn btn-raised btn-default waves-effect" style={{margin:'15px'}} onClick={()=> (navigate('/managecustomer'))}>⬅ Back</button>
        </div></div>
            <div class="col-lg-7 col-md-7 col-sm-12">
                <div class="card">
                    <div class="body">
                        <form action="#" onSubmit={updateCustom} method="" >
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <label class="">First Name</label>
                                            <input type="text" class="form-control" name="fname" id='fname' value={val.fname} onChange={haChange} required />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <label class="">Last Name</label>
                                            <input type="text" class="form-control" name="lname" id='lname' value={val.lname} onChange={haChange} required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <label class="">email</label>
                                            <input type="text" class="form-control" name="email" id='email' value={val.email} onChange={haChange} required />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <label class="">Phone</label>
                                            <input type="number" class="form-control" name="phone" id='phone' value={val.phone} onChange={haChange} required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <label class="">Address</label>
                                            <input type="text" class="form-control" name="address" id='address' value={val.address}  onChange={haChange}  required/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <label class="">Business Name</label>
                                            <input type="text" class="form-control" name="business_name" id='business_name' value={val.business_name}  onChange={haChange}  required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="">
                                <div class="form-line">
                                    <label class="">Profile Photo</label>
                            <input type="file" class="form-control" name="image" id='image' required onInput={imgchnge} accept="image/png, image/gif, image/jpeg, image/jpg" />
                                </div>
                            </div> */}

                           {/* <hr/> */}
                           <div className='form-group'>
                            <button class="btn btn-raised btn-primary waves-effect float-left m-b-2" type="submit">SUBMIT</button>
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

export default CustomerEdit
