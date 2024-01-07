import React from 'react';
import { Container, Row, Col, Carousel,Image,Button,Card } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetTopProductQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';

const TopProduct = () => {

    const {data:products,isLoading,error}=useGetTopProductQuery();

  return(
    <Container>
    {isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    ) : (
      <Row>
      {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={4} className="mb-3">
          <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: '#F8F9FA', borderRadius: '25px', padding: '15px', textAlign: 'start', height: '500px' }}>
              <Image
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                fluid
                style={{
                  height: '300px',
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '5px',
                }}
              />
              <div style={{ height: '200px', marginTop: '10px' }}>
                <h6 className="product-title" style={{ marginBottom: '10px',fontSize:'26px' }}>{product.name}</h6>
                <p style={{ marginBottom: '10px' }}>${product.price}</p>
                <Button style={{ backgroundColor: '#1967D2',width:'20%' }} variant="primary">
                  Buy
                </Button>
              </div>
            </div>
          </Link>
        </Col>
      ))}
    </Row>
    )}
  </Container>
  )
}

export default TopProduct