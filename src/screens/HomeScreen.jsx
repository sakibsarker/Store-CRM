import React,{useState,useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import brandsData from '../assets/Brand.json'
import ProductCarousel from '../components/ProductCarousel';
const HomeScreen = () => {

  const {pageNumber,keyword}=useParams();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brand, setBrands] = useState([]);

  useEffect(() => {
    // Fetch brands from the imported JSON file
    setBrands(brandsData.brands);
  }, []);
  
  const {data,isLoading,error}=useGetProductsQuery({keyword,pageNumber,brand: selectedBrands });
  console.log(selectedBrands); 

console.log(brand)

const handleBrandFilter = (brand) => {
  const updatedBrands = selectedBrands.includes(brand)
    ? selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
    : [...selectedBrands, brand];

  setSelectedBrands(updatedBrands);
  console.log('Selected Brands:', updatedBrands);
};

console.log(brandsData)
  return (
    <>
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} className="d-none d-md-block">
            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px',height:'100%' }}>
              <h5>Product Filter</h5>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {brand.map((brand) => (
                  <li key={brand}>
                      <input
                      style={{width:'15px',height:'15px'}}
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandFilter(brand)}
                      />
                      <label style={{marginLeft:'20px'}}>
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
