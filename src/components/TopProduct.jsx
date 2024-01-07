import React from 'react';
import { Container, Row, Col, Carousel,Image } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetTopProductQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';

const TopProduct = () => {

    const {data:products,isLoading,error}=useGetTopProductQuery();

  return isLoading?<Loader/>:error?<Message variant='danger'>{error?.data?.message||error.error}</Message>
  :(
    <Row>
    {products.map((product) => (
      <Col key={product._id} sm={12} md={6} lg={4} xl={4} className='mb-3'>
        <Link to={`product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Image
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            fluid
            style={{
              height: '250px',
              width: '250px',
              objectFit: 'cover',
            }}
          />
          <div className='product-details'>
            <h6 className='product-title'>{product.name}</h6>
            <h6>${product.price}</h6>
          </div>
        </Link>
      </Col>
    ))}
  </Row>
  )
}

export default TopProduct