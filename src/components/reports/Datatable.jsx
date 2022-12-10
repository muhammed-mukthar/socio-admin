import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { makeRequest } from "../../axios/axios";

const Applications = () => {
    const [status, setStatus] = useState('')
    const [err, setErr] = useState(false);
  const [data, setData] = useState(false);
  const userColumns = [ { field: "_id", headerName: "ID", width: 220 }, 
   {
    field: "name",
    headerName: "Reported by",
    width: 150,
  },
  {
    field: "reason",
    headerName: "Reason",
    width: 105,
  },
  {
    field: "createdAt",
    headerName: "Reported on",
    width: 115,
  },
  {
    field: "type",
    headerName: "Type",
    width: 105,
  }
  ,
  {
    field: "desc",
    headerName: "Bio/Desc",
    width: 145,
  }]


  
    useEffect(() => {

      makeRequest.get(`posts/reports/1`).then((res)=>{
          setData(res.data)
          console.log(res.data);
     
     }).catch((err) => {
     
      localStorage.removeItem("user");
        setErr(err.response.data)
  
    })
    //  setData(['Id'])
  }, [status])

function handleDelete(item,postId,email){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      makeRequest.delete(`posts/${postId}/rejectReport?id=${item}&name=${email}`).then((response) => {
        //  console.log(response);
          if (response.data) {
              // console.log(response);
              setStatus(new Date())
          } else {
              setErr('Something went wrong')
          }
      }).catch((err) => {
        localStorage.removeItem("user");
          setErr(err.response.data)
    
      })
    }
  })
  
}
function handleReject(item,postId,email,type){
 
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, reject it!'
  }).then((result) => {
    if (result.isConfirmed) {
      if (type=="post") {
        makeRequest.delete(`posts/${postId}/report?id=${item}&name=${email}`).then((response) => {
          //  console.log(response);
            if (response.data) {
                // console.log(response);
                setStatus(new Date())
            } else {
                setErr('Something went wrong')
            }
        }).catch((err) => {
          localStorage.removeItem("user");
            setErr(err.response.data)
      
        })
      }else{
        makeRequest.delete(`users/${postId}/report?id=${item}&name=${email}`).then((response) => {
          //  console.log(response);
            if (response.data) {
                // console.log(response);
                setStatus(new Date())
            } else {
                setErr('Something went wrong')
            }
        }).catch((err) => {
          localStorage.removeItem("user");
            setErr(err.response.data)
      
        })
      }
      
    }
  })
  
}
  const actionColumn = [
    {
      field: "image",
      headerName: "Image",
      width: 130,
      renderCell: (params) => {

        console.log(params,"params apps");
        return (
         <img className="image" src={params.row.post} alt="no image" />
        );
      },
    }
    ,
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        // console.log(params,"params apps");
        return (
         
          <div className="cellAction">
          
            <div className="deleteButton" onClick={()=>{handleDelete(params.id,params.row.postId,params.row.userId,params.row.type)}}>{params.row.type=="post"?"Delete post":"Block user"}</div>
            <div className="deleteButton" onClick={()=>{handleReject(params.id,params.row.postId,params.row.userId,params.row.type)}} style={{color:"orange"}}>Reject report</div>
            
          </div>
        );
      },
    }
  ];
  return (
    <div className="datatable">
       {err && <div className="p-4 mb-4 text-sm text-center text-red-800 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert" 
       onClick={()=>{window.location.replace('/login')}} style={{cursor:"pointer"}}> {err} click here to re-login</div>}
      <div className="datatableTitle">
    Reports
        
      </div>
      {data&&<DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId ={(row) => row._id}
        rowHeight={65}
      />}
      
    </div>
  );
};

export default Applications;
