import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedAdminRoute from '../components/ProtectedAdminRoute';
const Home          = lazy(() => import('../pages/Home'));
const About         = lazy(() => import('../pages/About'));
const Overview      = lazy(() => import('../pages/Overview'));
const Gallery       = lazy(() => import('../pages/Gallery'));
const Services      = lazy(() => import('../pages/Services'));
const Architectural = lazy(() => import('../pages/Architectural'));
const Residential   = lazy(() => import('../pages/Residential'));
const Commercial    = lazy(() => import('../pages/Commercial'));
const Hospitality   = lazy(() => import('../pages/Hospitality'));
const Bespoke       = lazy(() => import('../pages/Bespoke'));
const Shop          = lazy(() => import('../pages/Shop'));
const Contact       = lazy(() => import('../pages/Contact'));
const Projects      = lazy(() => import('../pages/Projects'));
const AdminPanel    = lazy(() => import('../pages/AdminPanel'));
const MyOrders      = lazy(() => import('../pages/MyOrders'));

const Loader = () => (
  <div style={{
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    height: '100vh', fontFamily: "'Georgia', serif",
    fontSize: '0.8rem', letterSpacing: '4px', color: '#c9a96e',
    textTransform: 'uppercase',
  }}>Loading...</div>
);

const AppRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {/* MAIN */}
      <Route path="/"                        element={<Home />}         />

      {/* ABOUT */}
      <Route path="/about"                   element={<About />}        />
      <Route path="/about/overview"          element={<Overview />}     />
      <Route path="/about/gallery"           element={<Gallery />}      />

      {/* SERVICES */}
      <Route path="/services"                element={<Services />}     />
      <Route path="/services/architectural"  element={<Architectural />}/>
      <Route path="/services/residential"    element={<Residential />}  />
      <Route path="/services/commercial"     element={<Commercial />}   />
      <Route path="/services/hospitality"    element={<Hospitality />}  />
      <Route path="/services/:type"          element={<Services />}     />

      {/* BESPOKE */}
      <Route path="/bespoke"                 element={<Bespoke />}      />

      {/* REST */}
      <Route path="/shop"                    element={<Shop />}         />
      <Route path="/contact"                 element={<Contact />}      />
      <Route path="/projects"               element={<Projects />}     />
      <Route 
  path="/admin" 
  element={
    <ProtectedAdminRoute>
      <AdminPanel />
    </ProtectedAdminRoute>
  } 
/>
      <Route path="/my-orders"              element={<MyOrders />}     />
    </Routes>
  </Suspense>
);

export default AppRoutes;