
export function loginRedirectCall(){
    let path= window.location.protocol+"//"+window.location.host+"/signIn" 
//    window.open(path,'mywindow').focus()
    window.location.href = path;
  }

export function homeRedirectCall(){
    let path= window.location.protocol+"//"+window.location.host+"/dashboard"
//    window.open(path,'mywindow').focus()
    window.location.href = path;  
}

export function logOutRedirectCall(){
  localStorage.removeItem("MAisLogin");
  localStorage.removeItem("MAuserData");
  localStorage.removeItem("MAid");
  localStorage.removeItem("MAtoken");
  localStorage.removeItem("MAname");
  localStorage.removeItem("MAemail");
  localStorage.removeItem("MAimage");

  loginRedirectCall()
}

export function loginRedirectCallWithDataStore(data){
  // console.log("Redirect Call")
  // console.log(data)
  localStorage.setItem("MAisLogin",true);
  localStorage.setItem("MAuserData",JSON.stringify(data));
  localStorage.setItem("MAid",data.id);
  localStorage.setItem("MAtoken",data.token);
  localStorage.setItem("MAname",data.name);
  localStorage.setItem("MAemail",data.email);
  localStorage.setItem("MAimage",data.profile_image);
  homeRedirectCall()
}


  