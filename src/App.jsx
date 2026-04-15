import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar, Footer, CartDrawer, CartProvider, AuthProvider } from './components';
import AppRoutes from './routes/AppRoutes';
import { SiteImagesProvider } from './context/SiteImagesContext';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

const App = () => (
  <BrowserRouter>
    <SiteImagesProvider>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <div style={{
            fontFamily:  "'Georgia', serif",
            background:  '#faf8f5',
            minHeight:   '100vh',
            overflowX:   'hidden',
          }}>
            <Navbar />
            <AppRoutes />
            <Footer />
            <CartDrawer />
            {/* ✅ WhatsApp Floating Button — puri website par */}
            <WhatsAppButton />
          </div>
        </CartProvider>
      </AuthProvider>
    </SiteImagesProvider>
  </BrowserRouter>
);

export default App;