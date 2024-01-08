import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{borderTop:'1px solid #d9d9d9' }}>
      <Container >
        <Row style={{paddingLeft:'50px',paddingRight:'50px'}} className="align-items-center">
          <Col xs={12} md={6} className="text-center text-md-start py-2">
            {/* Social Icons */}
            <a href="#" className="social-icon">
              <FaFacebook color='#3C4043' size={20} style={{marginRight:'10px'}} />
            </a>
            <a href="#" className="social-icon">
              <FaTwitter  color='#3C4043' size={20} style={{marginRight:'10px'}}/>
            </a>
            <a href="#" className="social-icon">
              <FaInstagram  color='#3C4043' size={20} style={{marginRight:'10px'}}/>
            </a>
            <a href="#" className="social-icon">
              <FaLinkedin  color='#3C4043' size={20} style={{marginRight:'10px'}}/>
            </a>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end py-3">
            <p style={{color:'#3C4043',fontSize:'15px'}}>Alveus RM &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
