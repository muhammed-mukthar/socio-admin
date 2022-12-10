import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { useState } from "react";
import { useEffect } from "react";
import Swal from 'sweetalert2'
import { makeRequest } from "../../axios/axios";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [status,setStatus]=useState('')
  const [err, setErr] = useState(false);
  const userColumns = [ { field: "_id", headerName: "ID", width: 230 }, {
    field: "name",
    headerName: "User name",
    width: 200,
  }, {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "createdAt",
    headerName: "Joined on",
    width: 200,
  },]
  useEffect(() => {
     makeRequest.get(`users/suggestedusers`).then((res)=>{
      setData(res.data)
     }).catch((e)=>{
    localStorage.removeItem("user");
    setErr(e.response.data+" please re-login");
     })
    //  setData(['Id'])
  }, [status])
  
  function handleBlock(userId){
    makeRequest.put(`users/block/${userId}`).then(({data})=>{
        if(data === "Account blocked successfully"){
          Swal.fire({
            title: 'Blocked!',
            text: 'user blocked successfully',
            icon: 'success',
            confirmButtonText: 'ok'
          })
       setStatus(data)
      //  console.log(data.users);
      //  console.log('blocked');
   }else{
       setErr(data.err)
       Swal.fire({
        title: 'Error!',
        text: 'something went wrong',
        icon: 'error',
        confirmButtonText: 'ok'
      })
   }
   }).catch((e)=>{console.log(e); localStorage.removeItem("user");
   setErr(e.response.data+" please re-login");})
}
function handleUnblock(userId){
  makeRequest.put(`users/unblock/${userId}`).then(({data})=>{
      if(data==="Account unblocked successfully"){
        Swal.fire({
          title: 'Unblocked!',
          text: 'user unblocked successfully',
          icon: 'success',
          confirmButtonText: 'ok'
        })
     setStatus(data)
    //  console.log(data.users);
    //  console.log('blocked');
 }else{
     setErr(data.err)
     Swal.fire({
      title: 'Error!',
      text: 'something went wrong',
      icon: 'error',
      confirmButtonText: 'ok'
    })
 }
 }).catch((e)=>{localStorage.removeItem("user");
 setErr(e.response.data+" please re-login");}) 
}
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
       
        return (
          <div className="cellAction">
      {params.row.blocked?
       
           <div className="viewButton" onClick={()=>handleUnblock(params.id)}>unblock</div>:
           <div className="viewButton2" onClick={()=>handleBlock(params.id)}>Block</div>
           
          
      
          }
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
       {err && <div className="p-4 mb-4 text-sm text-center text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert" 
       onClick={()=>{window.location.replace('/login')}} style={{cursor:"pointer"}}> { err}</div>}

       {/* {errorMessage && <div className="p-4 mb-4 text-sm text-center text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMessage}</div>} */}
      <div className="datatableTitle">
        Users
       
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId ={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
