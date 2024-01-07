import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #000', padding: '5px 0' }}>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} className="text-center text-md-start py-3">
            {/* Social Icons */}
            <a href="#" className="social-icon">
              <FaFacebook />
            </a>
            <a href="#" className="social-icon">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon">
              <FaLinkedin />
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
