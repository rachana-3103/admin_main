import React from 'react'

export default function Alert(props) {
  return (
   props.alert  && 
  <div class="row clearfix justify-content-end" >
   <div class="col-lg-6 col-md-6 col-sm-12 m-t-15 m-r-15"> 
    <div class={`alert alert-${props.alert.type} alert-dismissible`} role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        {props.alert.msg}
    </div>
    </div>
    </div>
  )
}
