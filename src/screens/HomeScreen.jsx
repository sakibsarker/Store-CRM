import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import brandsData from "../assets/Brand.json";
import ProductCarousel from "../components/ProductCarousel";
const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch brands from the imported JSON file
    setBrands(brandsData.brands);
  }, []);

  // useEffect(() => {
  //   // Handle initial selection based on route
  //   if (selectedBrand) {
  //     handleBrandFilter(selectedBrand);
  //   }
  // }, [selectedBrand]);

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    brand: selectedBrands,
  });
  console.log(selectedBrands);

  console.log(brands);

  const handleBrandFilter = (brand) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(updatedBrands);
    console.log("Selected Brands:", updatedBrands);
  };

  console.log(brandsData);
  return (
    <>
      <Container fluid>
        <Row style={{ textAlign: "center",marginBottom:'50px' }}>
          <h1 style={{ fontSize: "45px" }}>
            <span style={{ color: "#3C4043", fontWeight: "700" }}>
              Welcome to
            </span>
            <br />
            <span style={{ color: "#188038", fontWeight: "700" }}>
              the Alveus RM
            </span>
          </h1>
        </Row>
        <Row>
          {/* Sidebar */}
          <Col
            md={3}
            className="d-none d-md-block"
            style={{ position: "sticky", top: 0, height: "100vh" }}
          >
            <div
              style={{
                // backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "15px",
                height: "100%",
              }}
            >
              <p style={{color:'#6D7072',fontWeight:'500'}}>Product Filter</p>
              <ul style={{ listStyle: "none", padding: "0" }}>
                {brands.map((brand) => (
                  <li key={brand}>
                    <input
                      style={{ width: "15px", height: "15px" }}
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandFilter(brand)}
                    />
                    <label style={{ marginLeft: "20px",color:'#3C4043' }}>{brand}</label>
                  </li>
                ))}
              </ul>
              {selectedBrands}
            </div>
          </Col>

          {/* Main Content */}
          <Col md={9}>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.error}
              </Message>
            ) : (
              <>
                <Row>
                  {data.product.map((product) => (
                    <Col
                      key={product._id}
                      sm={12}
                      md={6}
                      lg={4}
                      xl={4}
                      className="mb-3"
                    >
                      <Product prduct={product} />
                    </Col>
                  ))}
                </Row>
                <Paginate
                  pages={data.pages}
                  page={data.page}
                  keyword={keyword ? keyword : ""}
                />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
