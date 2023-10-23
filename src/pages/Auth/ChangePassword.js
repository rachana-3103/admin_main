import React,{ useState, useEffect } from 'react'
import './ResetStyle.css'
import Swal from 'sweetalert2'
import { passwordChange } from '../../api/apiHandler';
import { useNavigate } from "react-router-dom";
import {logOutRedirectCall} from "../Common/RedirectPathMange"

function ChangePassword() {


    const initalValue = {opassword:"",password:"",cpassword:""}
    const [formValues,setFormValues]= useState(initalValue);

    const [showpass, setShowpass] = useState (false);
    let navigate = useNavigate();

    const passtext = (pass) => {
        if(pass) {
            setShowpass(false)
        } else {
            setShowpass(true)
        }
    }

    const hChange = (e)=>{
        const {name,value} =e.target;
        setFormValues({...formValues,[name]:value});
    }
    const getonload = (e) => {
        e.preventDefault();
        if(formValues.password == formValues.cpassword){

            passwordChange({ email:localStorage.getItem('MAemail'), opassword:formValues.opassword, npassword: formValues.password }).then((response) => {
                if (response.data.code == 1) {
                    Swal.fire({
                    icon: 'success',
                    text: response.data.message,
                    })
                setTimeout(() => {
                    
                    logOutRedirectCall()
                }, 2000);
                } else {
                    
                }
            });
            
        } else {
            Swal.fire({
                icon: 'error',
                text: "Opps! New Password And Confirm Password are Not Matched",
               
            })
        }

    } 

  return (
    <>
<div class="authentication1">
    <div class="card">
        <div class="body">
            <div class="row">
                <div class="col-lg-12">
                    <div class="header slideDown">
                        <div class="logo"><img src="http://13.238.15.59/api/logo192.png" style={{width: 80}} alt="Ballina's"/></div>
                    </div>
                </div>
                <form class="col-lg-12" action='' onSubmit={getonload} method="">
                    <h5 class="title">Change Password</h5>
                    <div class="form-group form-float">
                            <h6 class="text-left">Old Password</h6>
                        <div class="form-line">
                            <input type='text' class="form-control" required id='opassword' name='opassword' value={formValues.opassword} onChange={hChange} />
                        </div>
                    </div>
                    <div class="form-group form-float">
                        <h6 class="text-left">New Password</h6>
                        <div class="form-line">
                            <input type={showpass ? "text" : "password"} class="form-control" required id='password' name='password' minLength={6} value={formValues.password} onChange={hChange} />
                        </div>
                    </div>
                    <div class="form-group form-float">
                        <h6 class="text-left">Confirm Password</h6>
                        <div class="form-line">
                            <input type={showpass ? "text" : "password"} class="form-control" required id='cpassword' name='cpassword' minLength={6} value={formValues.cpassword} onChange={hChange}/>
                        </div>
                    </div>  
                    <div class="form-group form-float">
                        <div class="">
                            <button type="button" className="btn btn-default btn-circle waves-effect waves-circle waves-float" onClick={()=> {passtext(showpass)}}> <i className="material-icons">visibility</i></button>Show Password
                        </div>
                    </div>  
                    <div class="col-lg-12">
                    <button type="submit" class="btn btn-raised btn-primary waves-effect">Change Password</button>    
                    </div>                 
                </form>
                <div class="col-lg-12">
                                           
                </div>
                <div class="col-lg-12 m-t-20">
                   
                </div>                    
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default ChangePassword
