import React, { useEffect, useState, useRef } from 'react'
import { Link } from "react-router-dom";
// import { chatNoti } from '../../../api/apiHandler'


export default function TopBar() {
  // const [noti, setNoti] = useState([]);

  // useEffect(() => {
  //   setInterval(() => {
  //     // console.log('-----------------')
  //     readMsg()
  //   }, 10000);
  // }, []);

  // const readMsg = () => {
  //   chatNoti({}).then((response) => {
  //     if (response.data.code == 1) {
  //       // console.log(responsse.data.data)
  //       setNoti(response.data.data)
  //     } else {
  //     }
  //   });
  // }

  return (
    <nav className="navbar">
      <div className="col-12">
        <div className="navbar-header">
          <Link to='#' className="bars"></Link>
          <Link className="navbar-brand" to="/dashboard">Ballina Farm Fresh</Link>
        </div>
        {/* <ul class="nav navbar-nav navbar-right">
          <li class="dropdown"> <Link to="#" class="dropdown-toggle" data-toggle="dropdown" role="button"><i class="zmdi zmdi-notifications"></i>
           {noti.length > 0 ? <div class="notify"><span class="heartbit"></span><span class="point"></span></div> : <></>}
          </Link>
            <ul class="dropdown-menu slideDown">
              <li class="header">NOTIFICATIONS</li>
              <li class="body">
                <ul class="menu list-unstyled">

                  {noti && noti.map((item, int) => {
                    return (
                      <li key={int}>
                        <Link to={`/chatuser/${item.chat_room_id}/${item.sender_id}`}>
                          <div class="icon-circle l-slategray"> <i class="material-icons">comment</i> </div>
                          <div class="menu-info">
                            <h4><b>{item.username}</b></h4><p>You have {item.count} unread Message</p>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </li>
        </ul> */}
      </div>
    </nav>
  )
}
