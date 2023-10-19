import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import React, { useState, useEffect } from 'react'
import { getCategoryList,deleteCategory, createCategory,editCategory } from '../../api/apiHandler';
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
    dirName: 'category',
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    s3Url: 'https://ballians3.s3.amazonaws.com'
  };

const ReactS3Client = new S3(config);

function ManageCategory() {

    const [cate, setCate] = useState([]);
    const navigate = useNavigate()
    const [createcat, setcreatecat] = useState('');
    const [imge, setImge] = useState([]);
    const [upd, setUpd] = useState([]);

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
        getCategoryList({ id: 0}).then((response) => {
            if (response.data.code == 1) {
                setCate(response.data.data)
                Swal.close();
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
            // console.log('data :', data);
            if (data.status === 204) {
                // upd.push(data.location.split("/")[4]);
                setUpd(newfile)
            } else {
                console.log('obj err')
            }
        });
    }
    const imgupds = (e) => {
        setImge([])
        const files = e.target.files[0]
        var newfile = new Date().getTime() + files.name
        ReactS3Client.uploadFile(files, newfile).then(data => {
            // console.log('data :', data);
            if (data.status === 204) {
                // imge.push(data.location.split("/")[4]);
                setImge(newfile)
            } else {
                console.log('obj err')
            }
        });
    }

    const categoCreate = () => {
        createCategory({ name : createcat.name, image: upd.toString() }).then((response) => {
            if (response.data.code == 1) {
                getonload()
                setcreatecat('')
                Swal.fire({
                    icon: 'success',
                    title: 'Category has been added successfully.',
                    confirmButtonText: 'Okay'
                })
            } else {
                getonload()
                setcreatecat('')
            }
        });
    }

    const categoEdit = () => {
        editCategory({ id: createcat.id, name : createcat.name, image: imge.toString() }).then((response) => {
            if (response.data.code == 1) {
                getonload()
                setcreatecat('')
                Swal.fire({
                    icon: 'success',
                    title: 'Category has been edited successfully.',
                    confirmButtonText: 'Okay'
                })
            } else {
                getonload()
                setcreatecat('')
            }
        });
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
                deleteCategory({ id : id }).then((response) => {
                  if (response.data.code == 1) {
                  Swal.fire(
                    'Deleted!',
                    'Category has been deleted successfully.'
                  )
                  setTimeout(function() {
                    getonload()
                  }, 1000)  
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
        //   width: '75px',
        //   sortable: true,
        // },
        {
            name: 'Category Image',
            selector: row => row.image,
            // width: '300px',
            cell: (row) => <a href={row.image} className="image-popup"><img className="rounded image-popup" alt="category_image" style={{width: 100, height: 100}} src={row.image}/></a>,
          },
        {
          name: 'Category Name',
          selector: row => row.name,
          cellExport: row => row.name,
        //   width:'300px',
          sortable: true,
        },
          {
            name: 'Action',
            selector: row => row.id,
            width: '150px',
            cell: (row) => <><button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={()=> {document.getElementById("editcat").reset();setImge([]);setUpd([]); setcreatecat({name:row.name, id:row.id})}}  data-toggle="modal" data-target="#editmodel"><i className="material-icons" id={row.id} onClick={()=> {document.getElementById("editcat").reset();setImge([]);setUpd([]);setcreatecat({name:row.name, id:row.id})}}>create</i>  </button> 
         <button type="button" className="btn" style={{boxShadow: 'none'}} id={row.id} onClick={() => { deletec(row.id) }} ><i className="material-icons" id={row.id} onClick={()=>{deletec(row.id)}}>delete</i>  </button>
            </>
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
                              <h2>Category
                                  <small className="text-muted">Add, Edit &amp; Delete Category</small>
                              </h2>
                          </div>
                          <div className="col-lg-5 col-md-6 col-sm-12">
                              <ul className="breadcrumb float-md-right">
                                  {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                                  {/* <li className="breadcrumb-item active">Category</li> */}
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div className="container-fluid">
                      <div className="row clearfix">
                          <div className="col-lg-8 col-md-8 col-sm-12">
                              <div className="card">
                              <div className='float-right'>
                                    <button className="btn btn-raised btn-primary waves-effect" style={{margin:'15px'}} onClick={()=>{document.getElementById("createcat").reset(); setcreatecat({name: ''});setImge([]);setUpd([])}} data-toggle="modal" data-target="#defaultModal" >Create Category</button>
                                </div>
                                  <div className="body">
                                      <div className='table-responsive'>
                                      <DataTableExtensions columns={columns} data={cate}>
                          <DataTable columns={columns} data={cate} responsive pagination customStyles={customStyles}/>
                        </DataTableExtensions>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

          <div class="modal fade" id="defaultModal" tabindex="-1" role="dialog">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h4 class="modal-title" id="defaultModalLabel">Create Category</h4>
                      </div>
                      <div class="modal-body">
                          <form method="" action='#' id='createcat'>
                              <div className="row clearfix modal-body">
                                  <div className="col-sm-12">
                                      <div className="form-group">
                                          <h6>Category Name</h6>
                                          <div className="form-line">
                                              <input type='text' className="form-control" id='name' name="name" required value={createcat.name} onChange={haChange} placeholder="Type here ..." />
                                          </div>
                                      </div>
                                    <div class="form-line" >
                                    <h6>Category Image</h6>
                                      {/* <div class="col-md-6"> */}
                                        <input type="file" class="form-control" name="image" id='image' required onInput={imgchnge} accept="image/png, image/gif, image/jpeg, image/jpg" />
                                  {/* </div> */}
                                    </div>
                                </div>
                              </div>
                              <div className="modal-footer">
                                  <button type="submit" className="btn btn-link waves-effect" data-dismiss="modal" onClick={categoCreate}>SAVE</button>
                                  <button type="button" className="btn btn-link waves-effect" data-dismiss="modal">CLOSE</button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>

          <div class="modal fade" id="editmodel" tabindex="-1" role="dialog">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h4 class="modal-title" id="defaultModalLabel">Edit Category</h4>
                      </div>
                      <div class="modal-body">
                          <form method="" action='#' id='editcat'>
                              <div className="row clearfix modal-body">
                                  <div className="col-sm-12">
                                      <div className="form-group">
                                          <h6>Category Name</h6>
                                          <div className="form-line">
                                              <input type='text' className="form-control" id='name' name="name" required value={createcat.name} onChange={haChange} placeholder="Type here ..." />
                                          </div>
                                      </div>
                                      <div class="form-line" >
                                    <h6>Category Image</h6>
                                      {/* <div class="col-md-6"> */}
                                        <input type="file" class="form-control" name="image" id='image' required onInput={imgupds} accept="image/png, image/gif, image/jpeg, image/jpg" />
                                        <div class="help-info col-red font-bold">NOTE: The newly uploaded photo will replace the previous one if you select it.  </div>
                                  {/* </div> */}
                                    </div>
                                  </div>
                              </div>
                              <div className="modal-footer">
                                  <button type="submit" className="btn btn-link waves-effect" data-dismiss="modal" onClick={categoEdit}>SAVE</button>
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

export default ManageCategory
