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
            <Link to={`/product/${prduct._id}`}>
                <Card.Title as="div" className='product-title'>
                    <strong>{prduct.name}</strong>
                </Card.Title>
            </Link>
            {/* <Card.Text as="div">
                <Rating value={prduct.rating} text={`${prduct.numReviews} reviews`}/>
            </Card.Text> */}
            <Card.Text as="h5">
                ${prduct.price}
            </Card.Text>
           
         </Card.Body>
    </>
  )
}

export default Product