import React from 'react'
import { Link } from "react-router-dom";

export default function Heading(props) {
  return (
    <div className="block-header">
        <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>{props.title}</h2>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12">
                <ul className="breadcrumb float-md-right">
                    <li className="breadcrumb-item"><Link to="/"><i className="zmdi zmdi-home"></i> Cybersmarties</Link></li>
                    <li className="breadcrumb-item active">{props.title}</li>
                </ul>
            </div>
        </div>
    </div>
  )
}
