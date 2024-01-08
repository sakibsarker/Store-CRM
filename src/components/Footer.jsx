import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #000', }}>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-center text-md-start py-3">
            {/* Social Icons */}
            <a href="#" className="social-icon">
              <FaFacebook size={25} />
            </a>
            <a href="#" className="social-icon">
              <FaTwitter size={25}/>
            </a>
            <a href="#" className="social-icon">
              <FaInstagram size={25}/>
            </a>
            <a href="#" className="social-icon">
              <FaLinkedin size={25} />
            </a>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end py-3">
            <p>Store CRM &copy; {currentYear} Powered by Sakib Sarker</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
