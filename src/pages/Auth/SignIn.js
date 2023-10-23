import React, { useState, useEffect } from 'react'
import { signInAdmin } from '../../api/apiHandler'
import Alert from '../../components/Alert/Alert';
import { loginRedirectCallWithDataStore } from "../../pages/Common/RedirectPathMange"
import './ResetStyle.css'

export default function SignIn(props) {

    const [msg, setMsg] = useState(null);

    const showAlert = (msgDisplay, type) => {
        setMsg({
            msg: msgDisplay,
            type: type
        })
    }

    const initalValue = { email: "", password: "" }
    const [formValues, setFormValues] = useState(initalValue)

    const handleChange = (e) => {
        if (e.target.value.trim() == "") {
            e.target.value = e.target.value.trim()
        }
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const clickSubmitButton = (e) => {
        e.preventDefault();
        props.isLoader(true)
        signInAdmin({ "email": formValues.email, "password": formValues.password, "device_token":'dasfsdsdfs', "device_type":'A' }).then((resposnse) => {
            props.isLoader(false)
            if (resposnse.data.code == 1) {
                loginRedirectCallWithDataStore(resposnse.data.data)
            } else {
                showAlert(resposnse.data.message, "danger")
            }
        });

    }

    return (
        <>
            <div className="authentication1">
                <div className="card">
                    <div className="body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="header slideDown">
                                    <div className="logo"><img src='http://13.238.15.59/api/logo192.png' style={{width: 80}} alt="ballina" /></div>
                                    <h1>Ballina Farm Fresh</h1>
                                </div>
                            </div>
                            <form className="col-lg-12" id="form_validation" method="" onSubmit={clickSubmitButton} action="#" >
                                <h5 className="title">Sign in to your Account</h5>
                                <div className="form-group form-float">
                                    <div className="form-line">
                                        <input type="text" className="form-control" required id="email" name="email" value={formValues.email} onChange={handleChange} />
                                        <label className="form-label">Email</label>
                                    </div>
                                </div>
                                <div className="form-group form-float">
                                    <div className="form-line">
                                        <input type="password" className="form-control" required id="password" name="password" value={formValues.password} onChange={handleChangePassword} />
                                        <label className="form-label">Password</label>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <button className="btn btn-raised btn-primary waves-effect" type="submit">SIGN IN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
