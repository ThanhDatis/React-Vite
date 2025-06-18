import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

import './assets/styles/index.css'
import './assets/styles/HomePage.css'
import './assets/styles/UserShow.css'

import Header from './components/layouts/Header/index.jsx'
import SlideShow from './components/product/SlideShow'
import Footer from './components/layouts/Footer/index.jsx'
import ProductDetail from './components/product/ProductDetail'
import Cart from './pages/Cart/CartContent'
import Checkout from './components/Checkout/CheckoutContent'
import HomePage from './pages/HomePage'
import Registration from './pages/Registration'
import UserAccount from './pages/Account/UserAccountContent'

import CategoryFactory from './pages/CategoryPage/CategoryFactory'

function AppContent() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <SlideShow currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
            <HomePage />
          </>
        } />
        <Route path="/registration" element={<Registration />} />
        
        {/* User Account routes */}
        <Route path="/user-account/*" element={<UserAccount />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* Product detail route */}
        <Route path="/product/:id" element={<ProductDetail />} />
        
        {/* Dynamic category route must be last */}
        <Route path="/:categoryId" element={<CategoryFactory />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App
