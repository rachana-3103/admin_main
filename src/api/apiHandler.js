import { axiosClient } from "./apiClient";

export function signInAdmin(data){
    return axiosClient.post('/api/v1/admin/adminlogin', data);
}
export function dashBoard(){
    return axiosClient.post('/api/v1/admin/dashboard');
}
export function manageCustomer(data){
    return axiosClient.post('/api/v1/admin/managecustomer', data);
}
export function createCustomer(data){
    return axiosClient.post('/api/v1/admin/createuser', data);
}
export function statusCustomer(data){
    return axiosClient.post('/api/v1/admin/customerstatus', data);
}
export function deleteCustomer(data){
    return axiosClient.post('/api/v1/admin/customerdelete', data);
}
export function updateCustomer(data){
    return axiosClient.post('/api/v1/admin/customerupdate', data);
}


export function faqsList(data){
    return axiosClient.post('/api/v1/admin/faqslist',data);
}
export function faqsAdd(data){
    return axiosClient.post('/api/v1/admin/addfaqs',data);
}
export function faqsUpdate(data){
    return axiosClient.post('/api/v1/admin/editfaqs',data);
}
export function faqsDelete(data){
    return axiosClient.post('/api/v1/admin/deletefaqs',data);
}
export function getAboutUs(){
    return axiosClient.post('/api/v1/admin/getaboutus');
}
export function updateAboutUs(data){
    return axiosClient.post('/api/v1/admin/updateabout',data);
}
export function contactUs(data){
    return axiosClient.post('/api/v1/admin/contactlist',data);
}
export function sendReplayMail(data){
    return axiosClient.post('/api/v1/admin/replycontact',data);
}
export function getPolicy(){
    return axiosClient.post('/api/v1/admin/getpolicy');
}
export function updatePolicy(data){
    return axiosClient.post('/api/v1/admin/updatepolicy',data);
}
export function getTerms(){
    return axiosClient.post('/api/v1/admin/getterms');
}
export function updateTerms(data){
    return axiosClient.post('/api/v1/admin/updateterms',data);
}

export function vendorRequestList(data){
    return axiosClient.post('/api/v1/admin/vendorrequestlist',data);
}
export function vendorRequestAccept(data){
    return axiosClient.post('/api/v1/admin/vendorreqaccept',data);
}
export function vendorRequestReject(data){
    return axiosClient.post('/api/v1/admin/vendorreqreject',data);
}
export function sendPush(data){
    return axiosClient.post('/api/v1/admin/sendnotification',data);
}

export function customerReports(data){
    return axiosClient.post('/api/v1/admin/customerreport',data);
}
export function vendorReports(data){
    return axiosClient.post('/api/v1/admin/vendorreport',data);
}
export function flyperReports(data){
    return axiosClient.post('/api/v1/admin/flyperreport',data);
}
export function passwordChange(data){
    return axiosClient.post('/api/v1/admin/changepassword',data);
}

export function getCategoryList(data){
    return axiosClient.post('/api/v1/admin/categorylist',data);
}
export function createCategory(data){
    return axiosClient.post('/api/v1/admin/createcategory',data);
}
export function editCategory(data){
    return axiosClient.post('/api/v1/admin/editcategory',data);
}
export function deleteCategory(data){
    return axiosClient.post('/api/v1/admin/deletecategory',data);
}

export function getProductList(data){
    return axiosClient.post('/api/v1/admin/productlist',data);
}
export function productCreate(data){
    return axiosClient.post('/api/v1/admin/createproduct',data);
}
export function editProduct(data){
    return axiosClient.post('/api/v1/admin/editproduct',data);
}
export function deleteProduct(data){
    return axiosClient.post('/api/v1/admin/deleteproduct',data);
}

export function productAvaily(data){
    return axiosClient.post('/api/v1/admin/issellableornot',data);
}

export function accpRejOrder(data){
    return axiosClient.post('/api/v1/admin/accepptrejectorder',data);
}
export function acceptorderrejecet(data){
    return axiosClient.post('/api/v1/admin/accpetrejectorder',data);
}
export function ManageOrders(data){
    return axiosClient.post('/api/v1/admin/manageorder',data);
}
export function ManageProducts(data){
    return axiosClient.post('/api/v1/admin/manageproduct',data);
}
export function orderItemDetails(data){
    return axiosClient.post('/api/v1/admin/orderitemdata',data);
}
export function ManageOrdersforInvoice(data){
    return axiosClient.post('/api/v1/admin/manageorderforinvoice',data);
}
export function manageOrderOntheway(data){
    return axiosClient.post('/api/v1/admin/manageorderstatus',data);
}
export function manageOrderDelvivers(data){
    return axiosClient.post('/api/v1/admin/manageorderdeliver',data);
}
export function customerGraphs(data){
    return axiosClient.post('/api/v1/admin/customergraph',data);
}
export function monthOrderSale(data){
    return axiosClient.post('/api/v1/admin/monthordersale',data);
}
export function dateOrderSales(data){
    return axiosClient.post('/api/v1/admin/dateordersale',data);
}