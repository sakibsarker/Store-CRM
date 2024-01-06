import React,{useState} from 'react';
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
  const [selectedBrand, setSelectedBrand] = useState('');
  
  const {data,isLoading,error}=useGetProductsQuery({keyword,pageNumber,brand: selectedBrand });

  const uniqueBrands = data?.product
    ? Array.from(new Set(data.product.map((product) => product.brand)))
    : [];

  console.log(uniqueBrands)

  const handleBrandFilter = (brand) => {
    const updatedBrands = selectedBrand.includes(brand)
      ? selectedBrand.filter((selectedBrand) => selectedBrand !== brand)
      : [...selectedBrand, brand];

    setSelectedBrand(updatedBrands);
  };

  return (
    <>
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} className="d-none d-md-block">
            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
              <h5>Brand Filter</h5>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {uniqueBrands.map((brand) => (
                  <li key={brand}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedBrand.includes(brand)}
                        onChange={() => handleBrandFilter(brand)}
                      />
                      {brand}
                    </label>
                  </li>
                ))}
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
                    <Col key={product._id} sm={12} md={6} lg={4} xl={4} className="mb-3">
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
