import React, { useState } from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';

const Product = ({ prduct }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="product-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to={`/product/${prduct._id}`}>
        <Card.Img
          style={{
            height: '250px',
            width: '250px',
            objectFit: 'cover',
          }}
          src={`http://localhost:5000${prduct.image}`}
          variant="top"
        />
      </Link>
      {isHovered && (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id={`tooltip-add-to-cart`}>Add to Cart</Tooltip>}
        >
          <div style={{marginTop:'5px'}} className="add-to-cart-icon">
            {/* Use the React icon component for "Add to Cart" */}
            <FaShoppingCart color='#1967D2' size={25} />
          </div>
        </OverlayTrigger>
      )}
      <Card.Body>
        <Link to={`/product/${prduct._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title as="h6" className="product-title" style={{ marginTop: '10px' }}>
            {prduct.name}
          </Card.Title>
        </Link>
        <Card.Text as="h6" style={{ marginTop: '5px' }}>
          {userInfo && `$ ${prduct.price}`}
        </Card.Text>
      </Card.Body>

    </div>
  );
};

export default Product;
