import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

// import './App.css'
import './index.css'
import './assets/styles/Header.css'
import './assets/styles/HeaderMenuIcons.css'
import './assets/styles/HomePage.css'
import './assets/styles/UserShow.css'
import './assets/styles/Registration.css'
import './assets/styles/CategoryPage.css'

import Header from './components/Header/index.jsx'
import HomePage from './components/HomePage'
import SlideShow from './components/SlideShow/index.jsx'
import Registration from './components/Registration'
import Footer from './components/Footer/index.jsx'
import ProductDetail from './components/ProductDetail/index.jsx'
import Cart from './components/Cart/index.jsx'
import Checkout from './components/Checkout/index.jsx'
import UserAccount from './components/UserAccount/index.jsx'

// Import the CategoryFactory for dynamic category routing
import CategoryFactory from './pages/CategoryFactory'

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
