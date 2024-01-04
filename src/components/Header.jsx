import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar,Nav,Container, Badge, NavDropdown, Form } from 'react-bootstrap';
import {FaShoppingCart,FaUser} from 'react-icons/fa';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import {useSelector,useDispatch} from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout} from '../slices/authSlice'
import SearchBox from './SearchBox';

const Header = () => {
  const {cartItems}=useSelector((state)=>state.cart);
  const {userInfo}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [logoutApiCall]=useLogoutMutation();

  const logoutHandler=async()=>{
   try{

    await logoutApiCall().unwrap();
    dispatch(logout());
    navigate('/login');

   }catch(error){
    console.log(error)
   }

  }

  return (
    <header>
       
      <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
        <Container style={{marginRight:'60px',marginLeft:'60px'}}>
          <LinkContainer to='/'>
          <Navbar.Brand>Store CRM</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
           <Nav className="ms-auto">
            <SearchBox/>
            <LinkContainer to="/cart">
            <Nav.Link><FaShoppingCart size={20} style={{marginRight:'10px'}}/>
            Cart
            {
              cartItems.length>0 &&(
                <Badge pill bg='danger' style={{marginLeft:'10px'}}>
                  {cartItems.reduce((a,c)=>a+c.qty,0)}
                </Badge>
              )
            }
            </Nav.Link></LinkContainer>
            {userInfo && !userInfo.isAdmin && (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>

              </NavDropdown>
            )}
            {!userInfo && (
               <LinkContainer to="/login">
               <Nav.Link><FaUser size={20} style={{marginRight:'10px'}}/>Sign In</Nav.Link>
              </LinkContainer>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                 <NavDropdown.Item>Products List</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                 <NavDropdown.Item>Order List</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/userlist'>
                 <NavDropdown.Item>User List</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )

            }
           
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

  )
}

export default Header