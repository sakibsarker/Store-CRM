import React from 'react';
import { Container, Row, Col, Carousel,Image } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetTopProductQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';

const ProductCarousel = () => {

    const {data:products,isLoading,error}=useGetTopProductQuery();

  return isLoading?<Loader/>:error?<Message variant='danger'>{error?.data?.message||error.error}</Message>
  :(
    <Carousel pause='hover' className='bg-primary mb-4'>
        {products.map((product)=>(
            <Carousel.Item key={product._id}>
                <Link to={`product/${product._id}`}>
                <Image src={`http://localhost:5000${product.image}`} alt={product.name} fluid/>
                    {/* <Image src={product.image} alt={product.name} fluid/> */}
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} (${product.price})</h2>
                    </Carousel.Caption>
                </Link>

            </Carousel.Item>
        ))}

    </Carousel>
  )
}

export default ProductCarousel