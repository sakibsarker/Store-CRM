import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <Spinner animation="border" role="status"
    style={{
      width:"100px",
      height:"100px",
      margin:"auto",
      display:"block",
      marginTop:"100px",
      color:'#699CE2',
      
    }}>
      
    </Spinner>
  );
}

export default Loader