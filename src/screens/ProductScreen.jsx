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
                    style={{width:'100%'}}
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
                  height: "70%",
                  width: "100%", // Since md={6} means half the width
                  backgroundColor: "#F5F1EC",
                  padding: "10px", // Add padding for some spacing
                  display: "flex",
                  borderRadius: "30px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <strong>{products.titlebanner}</strong>
                <br />
                <strong>{products.desbanner}</strong>
              </div>
            </Col>
            <Col md={7}>
              <Image
                style={{
                  borderRadius: "30px",
                  height: "70%",
                  width: "100%",
                  objectFit: "cover",
                }}
                src={`http://localhost:5000${products.bannerimg}`}
                alt={products.bannerimg}
                fluid
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Col md={12}>
                <strong>{products.titlebannertwo}</strong>
              </Col>

              <Col md={12}>
                <strong>{products.desbannertwo}</strong>
              </Col>
              <Col md={12}>
                <Image
                 style={{
                  borderRadius: "30px",
                  height: "70%",
                  width: "100%",
                  objectFit: "cover",
                }}
                  src={`http://localhost:5000${products.bannerimgtwo}`}
                  alt={products.bannerimgtwo}
                  fluid
                />
              </Col>
            </Col>

            <Col md={6}>
              <Col md={12}>
                <strong>{products.titlebannerthree}</strong>
              </Col>

              <Col md={12}>
                <strong>{products.desbannerthree}</strong>
              </Col>
              <Col md={12}>
                <Image
                 style={{
                  borderRadius: "30px",
                  height: "70%",
                  width: "100%",
                  objectFit: "cover",
                }}
                  src={`http://localhost:5000${products.bannerimgthree}`}
                  alt={products.bannerimgthree}
                  fluid
                />
              </Col>
            </Col>
          </Row>
          <Row>
          <Col md={12}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{products.materialtitle}</h3>
                  <h3>{products.materialdes}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>{products.included}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>{products.compatible}</h3>
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
