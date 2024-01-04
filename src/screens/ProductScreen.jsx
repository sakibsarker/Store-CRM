import React, { useState } from "react";
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
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
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

  return (
    <>
      <Link className="btn btn-white my-2" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={products.name} />
          <Row>
            <Col md={5}>
              <Image
                src={`http://localhost:5000${products.image}`}
                alt={products.name}
                fluid
              />
              {/* <Image src={products.image} alt={products.image} fluid/> */}
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{products.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={products.rating}
                    text={`${products.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>${products.price}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Description: {products.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${products.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          $
                          {products.countInStock > 0
                            ? "In Stock"
                            : "Out Of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {products.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(products.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      style={{ width: "100%" }}
                      className="btn-block"
                      type="button"
                      disabled={products.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
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
                  src={`http://localhost:5000${products.bannerimg}`}
                  alt={products.bannerimgthree}
                  fluid
                />
              </Row>
            </Col>
          </Row>

          <Row>
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
                    src={`http://localhost:5000${products.bannerimgtwo}`}
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
                    src={`http://localhost:5000${products.bannerimgthree}`}
                    alt={products.bannerimgthree}
                    fluid
                  />
                </Row>
              </div>
            </Col>
          </Row>

          <Row>
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

          <Row className="review">
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
