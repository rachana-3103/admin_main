import React, { useState, useEffect } from 'react';
import { getAboutUs, updateAboutUs } from '../../api/apiHandler';
import { useNavigate, Link } from 'react-router-dom'
// import { ReactQuill } from 'react-quill';
import Swal from 'sweetalert2'
import './CustomStyle.css';
// import 'react-quill/dist/quill.snow.css';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function AboutUs() {

  const [abut, setAbut] = useState('')

  let navigate = useNavigate();

  useEffect(() => { 
    Swal.fire({
      title: 'Please wait...',
      didOpen: () => {
      Swal.showLoading()
      }
  })
    getonload(); }, []);

  const getonload = () => {
    getAboutUs({}).then((response) => {
      if (response.data.code == 1) {
        setAbut(response.data.data[0].content)
        Swal.close()
      } else {
        Swal.close()
        // alert(response.data.message)
      }
    });
  }

  const updabout = () => {
    updateAboutUs({ "content": abut }).then((response) => {
      if (response.data.code == 1) {
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        // alert(response.data.message)
      }
    });
  }

  return (
    <>
     <section className="content">
        <div className="block-header">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h2>Manage About Us
                <small className="text-muted">View &amp; Edit About Us</small>
              </h2>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12">
              <ul className="breadcrumb float-md-right">
                {/* <li className="breadcrumb-item"><i className="zmdi zmdi-home"></i> Ballina Farm Fresh</li> */}
                {/* <li className="breadcrumb-item active">AboutUs</li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="container m-0">
        <div class="help-info col-red font-bold">NOTE: Add Backslash(\) before using Single Quote('). E.g: Ballina\'s instead of Ballina's  </div>
        <CKEditor
                    editor={ ClassicEditor }
                    data={abut}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setAbut(data)
                    } }
                />
          {/* {abut} */}
          <div className='px-3'>
          <button type="button" class="btn m-t-10 btn-raised btn-success waves-effect" onClick={updabout}>Save</button>
          <button type="button" class="btn m-t-10 m-l-20 btn-raised bg-red waves-effect" onClick={() => { getonload() }}>Cancel</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUs

