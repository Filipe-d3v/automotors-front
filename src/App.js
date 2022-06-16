import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Container from './components/layouts/Container';
import Footer from './components/layouts/Footer';
import Nav from './components/layouts/Nav';

import Message from './components/layouts/Message';
import Home from './components/pages/auth/Home';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Profile from './components/pages/user/Profile';
import Menu from './components/layouts/Menu'

import { UserProvider } from './context/UserContext'
import MyProducts from './components/pages/products/MyProducts';
import AddProduct from './components/pages/products/Addproduct';
import EditProduct from './components/pages/products/EditProduct';
import ProductDetails from './components/pages/products/ProductDetails';
import MyShopping from './components/pages/products/MyShopping';

function App() {
  return (
    <Router>
      <UserProvider>
        <Nav />
        <Container>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/product/myproducts" element={<MyProducts />} />
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
            <Route path="/myshopping" element={<MyShopping />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
          <Message />
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
