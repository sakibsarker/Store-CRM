import React,{useEffect,useState} from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Button,Row,Col,Table} from 'react-bootstrap';
import {FaTimes} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {useGetAllOrdersQuery} from '../../slices/orderApiSlice';
import {Link,useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux/';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const OrderListScreen = () => {

  const {data:orders,isLoading,error}=useGetAllOrdersQuery();
  console.log(orders)


  return <>
  <h1>Orders</h1>
  {isLoading?<Loader/>
  :error?<Message variant="Danger">{error?.data?.message||error.message}</Message>
  :(
  <Table striped hover responsive className='table-sm'>
     <thead>
        <tr>
           <th>ID</th>
           <th>Username</th>
           <th>DATE</th>
           <th>TOTAL</th>
           <th>PAID</th>
           <th>DELIVERED</th>
           <th></th>
           
        </tr>
    </thead>
    <tbody>
        {orders.map((order)=>(
            <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0,10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid?(
                    order.paidAt.substring(0,10)
                ):(<FaTimes color='red'/>)}</td>
                <td>{order.isDelivered?(order.deliveredAt.substring(0,10)):(<FaTimes color='red'/>)}</td>
                <td>
                    <LinkContainer to={`/order/${order._id}`}>
                        <Button style={{ backgroundColor: "#1967D2"}} className='btn-sm ' variant='light'>Details</Button>         
                    </LinkContainer>
                </td>
            </tr>
        ))}
    </tbody>
  </Table>
 )}
  </>
}

export default OrderListScreen