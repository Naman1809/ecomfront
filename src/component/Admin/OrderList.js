import React, { Fragment, useEffect } from 'react'
import "./ProductList.css"
import { DataGrid } from '@mui/x-data-grid'
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from './Sidebar';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import { clearErrors, deleteOrder, getAllOrders } from '../../actions/orderAction';


const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {error, orders} = useSelector((state)=>state.allOrders)
  const {error:deleteError, isDeleted} = useSelector((state)=>state.order)


  const deleteorderHandler = (id)=>{
    dispatch(deleteOrder(id));
  }


    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
       if(deleteError){
        alert.error(deleteError);
        dispatch(clearErrors());
      }
      if(isDeleted){
        alert.success("Order Deleted Successfully");
        navigate("/admin/orders");
        dispatch({type:DELETE_ORDER_RESET});
      }
      dispatch(getAllOrders());
    },[error,alert,dispatch,deleteError,navigate,isDeleted])




    const columns = [
        { field: "id", headerName: "Order Id", minwidth: 300, flex: 1 },
        {
          field: "status",
          headerName: "Status",
          minwidth: 150,
          flex: 0.5,
          getCellClassName:(params) => {
            return params.row.status === 'Processing' ? 'greenColor' : 'redColor';
          }
          // cellClass: "redColor",
          
          },
        
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minwidth: 150,
          flex: 0.4,
        },
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minwidth: 270,
          flex: 0.5,
        },
    {
      field:"actions",
      flex:0.3,
      headerName:"Actions",
      minWidth:150,
      type:"number",
      sortable:false,
      renderCell:(params) =>{
        return (
          <Fragment>
            <Link to={`/admin/order/${params.id}`}>
              <EditIcon/>
            </Link>
            <Button onClick={()=>{deleteorderHandler(params.id)}}>
              <DeleteIcon/>
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows =[];

  orders && orders.forEach((item)=>{
    rows.push({
      id:item._id,
      itemsQty:item.orderItems.length,
      amount:item.totalPrice,
      status:item.orderStatus,
    })
  })

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS -Admin`} />
    <div className="dashboard">
      <Sidebar/>
      <div className="productListContainer">
        <h1 id="productListHeading">ALL ORDERS</h1>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableRowSelectionOnClick
        className='productListTable'
        autoHeight
        />
      </div>
    </div>

    </Fragment>
  )
}



export default OrderList
