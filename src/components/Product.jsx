import React from 'react'
import { Card } from 'react-bootstrap'
import {Link}  from 'react-router-dom'
import Rating from './Rating'
import {useSelector} from 'react-redux';
const Product = ({prduct}) => {
  const {userInfo}=useSelector((state)=>state.auth);
  return (
    <>
        <Link to={`/product/${prduct._id}`}>
            <Card.Img  style={{
                      height: "250px",
                      width: "250px",
                      objectFit: "cover",
                    }} src={`http://localhost:5000${prduct.image}`} variant="top"/>
        </Link>
        <Card.Body>
            <Link to={`/product/${prduct._id}`} style={{ textDecoration: 'none' }}>
                <Card.Title as="h6" className='product-title' style={{marginTop:'10px'}}>
                    {prduct.name}
                </Card.Title>
            </Link>
            <Card.Text as="h6" style={{marginTop:'5px'}}>

                {userInfo && `$ ${prduct.price}`}
            </Card.Text>
         </Card.Body>
    </>
  )
}

export default Product


  {/* <Card.Text as="div">
                <Rating value={prduct.rating} text={`${prduct.numReviews} reviews`}/>
            </Card.Text> */}