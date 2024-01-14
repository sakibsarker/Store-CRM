import React, { useState,useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Carousel,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import TopProduct from "../components/TopProduct";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Meta from "../components/Meta";


const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const nagivate = useNavigate();

  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const {
    data: products,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...products, qty }));
    nagivate("/cart");
  };

  const createReviewHandaler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      // Adjust the threshold as needed
      if (offset > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        backgroundColor: '#FFFFFF',
        borderBottom: isSticky ? '.5px solid black' : 'none',
        transition: 'background-color 0.3s, border-bottom 0.3s',
      }}
    >
      <Row className="d-flex justify-content-between align-items-center">
        <Col md={6}>
          <Link
            style={{
              backgroundColor: '#F4F4F4',
              color: 'black',
              border: '1px solid #F4F4F4',
            }}
            className="btn btn-white my-2"
            to="/"
          >
            Go Back
          </Link>
        </Col>
        <Col md={6} className="text-end">
          <Button
            style={{ width: '50%', backgroundColor: '#1967D2' }}
            className="btn-block"
            type="button"
            disabled={products.countInStock === 0}
            onClick={addToCartHandler}
          >
            Add To Cart
          </Button>
        </Col>
      </Row>
    </div>

          <Meta title={products.name} />
          <Row>
            <Col md={8}>
            <Carousel style={{width:"800px",backgroundColor:"#F4F4F4",borderRadius:'30px'}}>
                <Carousel.Item >
                  <Image
                    style={{
                      height: "700px",
                      width: "800px",
                      objectFit: "cover",
                      borderRadius: "30px",
                    }}
                    src={`${products.image}`}
                    alt={products.name}
                    fluid
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <Image
                    style={{
                      height: "700px",
                      width: "800px",
                      objectFit: "cover",
                      borderRadius: "30px",
                    }}
                    src={`${products.imagetwo}`}
                    alt={products.name}
                    fluid
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <Image
                    style={{
                      height: "700px",
                      width: "800px",
                      objectFit: "cover",
                      borderRadius: "30px",
                    }}
                    src={`${products.imagethree}`}
                    alt={products.name}
                    fluid
                  />
                </Carousel.Item>
              </Carousel>

              {/* <Image
                style={{
                  height: "700px",
                  width: "800px",
                  objectFit: "cover",
                  borderRadius: "30px",
                }}
                src={` ${products.image}`}
                alt={products.name}
                fluid
              /> */}
             
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3 style={{ fontSize: "35px",color: "#3C4043" }}>{products.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p style={{color: "#3C4043" }}>{products.description}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={products.rating}
                    text={`${products.numReviews} reviews`}
                  />
                </ListGroup.Item>
                {userInfo &&
                <ListGroup.Item>
                  <strong >${products.price}</strong>
                </ListGroup.Item>
                }
                <ListGroup.Item>
                  <p>
                    Status:{" "}
                    {products.countInStock > 0 ? "In Stock" : "Out Of Stock"}{" "}
                  </p>
                </ListGroup.Item>
                {products.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col md={3}>
                        <Form.Control
                        
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(products.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={9}>
                        <Button
                          style={{ width: "100%", backgroundColor: "#1967D2" }}
                          className="btn-block"
                          type="button"
                          disabled={products.countInStock === 0}
                          onClick={addToCartHandler}
                        >
                          Add To Cart
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>

          <Row
            style={{
              marginTop: "150px",
              paddingLeft: "100px",
              marginRight: "100px",
            }}
          >
            <Col md={5}>
              <div
                style={{
                  height: "100%",
                  width: "100%", // Since md={6} means half the width
                  backgroundColor: "#F5F1EC",
                  borderRadius: "30px",
                  textAlign: "start",
                  padding: "50px",
                  paddingTop: "35%",
                }}
              >
                <Row md={12}>
                  <h2 style={{ color: "#3C4043", fontSize: "35px" }}>
                    {products.titlebanner}
                  </h2>
                  <p style={{ color: "#3C4043", fontWeight: "400" }}>
                    {products.desbanner}
                  </p>
                </Row>
              </div>
            </Col>

            {/* Second Column */}
            <Col md={7}>
              <Row md={12}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "30px",
                  }}
                  src={`${products.bannerimg}`}
                  alt={products.bannerimgthree}
                  fluid
                />
              </Row>
            </Col>
          </Row>

          <Row
            style={{
              paddingLeft: "100px",
              marginRight: "100px",
              marginTop: "50px",
            }}
          >
            {/* First Column */}
            <Col md={7}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#F5F1EC", // Gray background color
                  borderRadius: "30px",
                  flexDirection: "column",
                  textAlign: "start",
                  paddingBottom: "50px",
                  paddingTop: "50px",
                }}
              >
                <Row
                  md={12}
                  style={{
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    paddingBottom: "40px",
                  }}
                >
                  <h2 style={{ color: "#3C4043", fontSize: "35px" }}>
                    {products.titlebannertwo}
                  </h2>
                  <p style={{ color: "#3C4043", fontWeight: "400" }}>
                    {products.desbannertwo}
                  </p>
                </Row>

                <Row md={12}>
                  <Image
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={`${products.bannerimgtwo}`}
                    alt={products.bannerimgtwo}
                    fluid
                  />
                </Row>
              </div>
            </Col>

            {/* Second Column */}
            <Col md={5}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#F5F1EC", // Gray background color
                  borderRadius: "30px",
                  flexDirection: "column",
                  textAlign: "start",
                  paddingTop: "50px",
                }}
              >
                <Row
                  md={12}
                  style={{
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    paddingBottom: "40px",
                  }}
                >
                  <h1 style={{ color: "#3C4043", fontSize: "35px" }}>
                    {products.titlebannerthree}
                  </h1>
                  <h6
                    style={{
                      color: "#3C4043",
                      fontWeight: "400",
                      lineHeight: "1.7",
                    }}
                  >
                    {products.desbannerthree}
                  </h6>
                </Row>
                <Row md={12}>
                  <Image
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                      borderBottomLeftRadius: "30px",
                      borderBottomRightRadius: "30px",
                    }}
                    src={` ${products.bannerimgthree}`}
                    alt={products.bannerimgthree}
                    fluid
                  />
                </Row>
              </div>
            </Col>
          </Row>

          <Row
            style={{
              marginTop: "150px",
              paddingLeft: "100px",
              marginRight: "100px",
            }}
          >
            <Col md={12}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col md={5}>
                      <h1 style={{ color: "#3C4043", textAlign: "center" }}>
                        Technical<br></br>specifications
                      </h1>
                    </Col>
                    <Col md={6}>
                      <h6 style={{ color: "#3C4043", fontSize: "20px" }}>
                        {products.specifications}
                      </h6>
                      <p
                        style={{
                          color: "#3C4043",
                          fontWeight: "400",
                          lineHeight: "2",
                        }}
                      >
                        {products.detailspecifications}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col md={5}></Col>
                    <Col md={6}>
                      <h6 style={{ color: "#3C4043", fontSize: "20px" }}>
                        {products.materialtitle}
                      </h6>
                      <p
                        style={{
                          color: "#3C4043",
                          fontWeight: "400",
                          lineHeight: "2",
                        }}
                      >
                        {products.materialdes}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item style={{ textAlign: "center" }}>
                  <Row>
                    <Col md={5}>
                      {" "}
                      <h1 style={{ color: "#3C4043" }}>What is included</h1>
                    </Col>
                    <Col
                      md={6}
                      style={{ alignItems: "center", display: "flex" }}
                    >
                      {" "}
                      <p
                        style={{
                          color: "#3C4043",
                          fontWeight: "400",
                          lineHeight: "2",
                        }}
                      >
                        {products.included}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item style={{ textAlign: "center" }}>
                  <Row>
                    <Col md={5}>
                      {" "}
                      <h1 style={{ color: "#3C4043" }}>Compatible with</h1>
                    </Col>
                    <Col
                      md={6}
                      style={{ alignItems: "center", display: "flex" }}
                    >
                      {" "}
                      <p
                        style={{
                          color: "#3C4043",
                          fontWeight: "400",
                          lineHeight: "2",
                        }}
                      >
                        {products.compatible}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row
            style={{
              textAlign: "center",
              marginTop: "100px",
              paddingLeft: "100px",
              marginRight: "100px",
           
            }}
          >
            <h1
              style={{ color: "#3C4043", fontSize: "40px", fontWeight: "500" }}
            >
              Other useful accessories.
            </h1>
            <p style={{ color: "#196CD5", fontWeight: "500" }}>
              <Link
                to="/"
                style={{ textDecoration: "underline", color: "#196CD5" }}
              >
                Browse all accessories {">"}
              </Link>
            </p>
            <Row style={{marginTop:"30px"}}>
            
              <TopProduct />
            </Row>
          </Row>

          <Row
            style={{
              marginTop: "100px",
              marginLeft: "20px",
              marginRight: "20px",
              backgroundColor: "#F8F9FA",
              paddingBottom: "50px",
              paddingTop: "50px",
              marginBottom: "50px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <img
                src="/pinsvg.svg"
                alt="Your SVG Alt Text"
                width="50"
                height="50"
              />
              <h1
                style={{
                  color: "#3C4043",
                  fontSize: "40px",
                  fontWeight: "500",
                }}
              >
                Don't miss anything.
              </h1>
              <p style={{ color: "#3C4043", fontWeight: "400" }}>
                Keep me updated on devices, news, tips and offers from the
                Google Store.
              </p>
              <Link to="/register">
                <Button
                 style={{
                 
                  background: "white",
                  color: "#3C4043",
                  borderColor: "#3C4043",
                  borderStyle: "solid", // Add solid border style
                  borderWidth: "2px",   // Adjust border width as needed
                  fontWeight: "500",   // Add bold font weight
                }}
                
                >
                  Register
                </Button>
              </Link>
            </div>
          </Row>

          <Row
            className="review"
            style={{ paddingLeft: "100px", marginRight: "100px" }}
          >
            <Col md={6}>
              <h2>Reviews</h2>
              {products.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {products.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0.1)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {loadingReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={createReviewHandaler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="py-2">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingReview}
                        type="submit"
                        variant="primary"
                        style={{ backgroundColor: "#1967D2" }}
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="danger">
                      {" "}
                      Please <Link to="/login">Sign in</Link> to write
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
