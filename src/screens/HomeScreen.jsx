import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
const HomeScreen = () => {

  const {pageNumber,keyword}=useParams();
  
  const {data,isLoading,error}=useGetProductsQuery({keyword,pageNumber});


  return (
    <>
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} className="d-none d-md-block">
            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
              <h5>Categories</h5>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                <li>
                  <Link to="/category1">Category 1</Link>
                </li>
                <li>
                  <Link to="/category2">Category 2</Link>
                </li>
                {/* Add more links as needed */}
              </ul>
            </div>
          </Col>

          {/* Main Content */}
          <Col md={9}>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
              <>
                <h1 style={{ color: 'black', textAlign: 'center',fontWeight:'600',fontSize:'30px' }}>Welcome to <br></br> the Store CRM</h1>
                <Row>
                  {data.product.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                      <Product prduct={product} />
                    </Col>
                  ))}
                </Row>
                <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
