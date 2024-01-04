import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import { productsApiSlice } from './slices/productsApiSlice';
import { useDispatch } from 'react-redux';
import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <>
    <Header/>
    <main className="py-3">
      <Container>
      <Outlet/>
      </Container>
      </main>
    <Footer/>
    <ToastContainer />
    </>
  )
}

export default App
