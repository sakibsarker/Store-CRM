import React, { useEffect } from 'react';
import {Link,useParams} from 'react-router-dom';
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap';

import { useSelector,useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {useGetOrderDetailsQuery, usePayOrderMutation,useDeliverOrderMutation} from '../slices/orderApiSlice';

const OrderScreen = () => {
    const {id:orderId}=useParams();
    const {data:order,refetch,isLoading,error}=useGetOrderDetailsQuery(orderId);


    const [payOrder,{isLoading:loadingPay}]=usePayOrderMutation();
   
    const [deliverOrder,{isLoading:loadingDeliver,error:errorDeliver}]=useDeliverOrderMutation();
    const {userInfo}=useSelector((state)=>state.auth);

 

    function onApprove(data,actions){
      return actions.order.capture().then(async function(details){
        try{
          await payOrder({orderId,details});
          refetch();
          toast.success('Payment Sucessful');
        }catch(error){
          toast.error(error?.data?.message||error.message);
        }
      });
    };

    async function onApproveTest(){
       await payOrder({orderId,details:{payer:{}}});
          refetch();
          toast.success('Payment Sucessful');
    };
    function onError(error){
      toast.error(error.message)
    };

    function createOrder(data,actions){
      return actions.order.create({
        purchase_units:[
          {
            amount:{
              value:order.totalPrice,
            },
          },
        ],
      }).then((orderId)=>{
        return orderId;
      });
    };
    
    const deliverOrderHandler=async()=>{
      try{
        await deliverOrder(orderId);
        refetch();
        toast.success('Order delivered')

      }catch(error){
        toast.error(error?.data?.message||error.message);

      }

    }


    return isLoading?<Loader/>
    :error?<Message variant="Danger">{error?.data?.message||error.message}</Message>
    :(<>
    <Row>
      <Col>
      <ListGroup variant='flush'>
        <ListGroup.Item>
        <h2>Order ID: {order._id}</h2>
        </ListGroup.Item>
     
        </ListGroup>
      </Col>
    </Row>
    
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p><strong>Username:</strong> {order.user.name}</p>
            <p><strong>Email:</strong> {order.user.email}</p>
            <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}{''}{order.shippingAddress.postalCode},{''}{order.shippingAddress.country}</p>
            {order.isDelivered?(<Message variant="success">Delivered on {order.deliveredAt.substring(0,10)}</Message>):<Message variant="danger">Not Delivered</Message>}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method:</strong>{order.paymentMethod}
            </p>
            {order.isPaid?(<Message variant="success">Paid on {order.paidAt.substring(0,10)}</Message>):<Message variant="danger">Not Paid</Message>}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Item</h2>
            {order.orderItems.map((item,index)=>(
              <ListGroup.Item key={index}> 
              <Row>
                <Col md={2}>
                  <Image src={`http://localhost:5000${item.image}`} alt={item.name} fluid rounded/>
                </Col>
                <Col>
                <Link to={`/product/${item.product}`}>
                {item.name}
                </Link>
                </Col>
                <Col md={4}>
                  {item.qty} x $ {item.price}=$ {item.qty*item.price}
                </Col>
              </Row>
              </ListGroup.Item>
            ))}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>$ {order.itemsPrice}</Col>
              </Row>
              <Row>
                <Col>Shipping</Col>
                <Col>$ {order.shippingPrice}</Col>
              </Row>
              <Row>
                <Col>Tax</Col>
                <Col>$ {order.taxPrice}</Col>
              </Row>
              <Row>
                <Col>Total Price</Col>
                
                <Col>$ {order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && order.isDelivered && userInfo.isAdmin && (
                <ListGroup.Item>
                  {loadingPay && <Loader/>}
                
                    <div>
                  <Button onClick={onApproveTest} style={{marginBottom:'10px',backgroundColor: "#1967D2"}}>Cash on delivery</Button>
                    </div>
               
                </ListGroup.Item>
              )
            }

           {loadingDeliver && <Loader/>}
           {userInfo && userInfo.isAdmin && !order.isPaid && !order.isDelivered &&(
            <ListGroup.Item>
              <Button type='button' style={{ backgroundColor: "#1967D2"}} className='btn btn-block' onClick={deliverOrderHandler}>
                Make as Delivered
              </Button>
            </ListGroup.Item>
           ) }
          </ListGroup>/
        </Card>
      </Col>
    </Row>
    </>)
 
}

export default OrderScreen