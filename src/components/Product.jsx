import React from 'react'
import { Card } from 'react-bootstrap'
import {Link}  from 'react-router-dom'
import Rating from './Rating'
const Product = ({prduct}) => {
  return (
    <>
        <Link to={`/product/${prduct._id}`}>
            {/* <Card.Img src={prduct.image} variant="top"/> */}
            <Card.Img  style={{
                      height: "250px",
                      width: "250px",
                      objectFit: "cover",
                    }} src={`http://localhost:5000${prduct.image}`} variant="top"/>
        </Link>
        <Card.Body>
            <Link to={`/product/${prduct._id}`} style={{ textDecoration: 'none' }}>
                <Card.Title as="h6" className='product-title'>
                    {prduct.name}
                </Card.Title>
            </Link>
            <Card.Text as="h6">
                ${prduct.price}
            </Card.Text>
           
         </Card.Body>
    </>
  )
}

export default Product


  {/* <Card.Text as="div">
                <Rating value={prduct.rating} text={`${prduct.numReviews} reviews`}/>
            </Card.Text> */}