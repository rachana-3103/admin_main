import React from 'react'
import "../../spinner.css";
import LoadingOverlay from 'react-loading-overlay';

export default function Loder(props) {
    if(!props.isActive) return (""); 
    return (      
    <div id="overl">
    <LoadingOverlay
    active={props.isActive}
    spinner={props.isActive}
    text="Loading ..."
  >
  </LoadingOverlay>
</div>

  )
}
