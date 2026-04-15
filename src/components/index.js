export { default as Navbar          } from './Navbar';
export { default as Footer          } from './Footer';
export { default as AnimatedCounter } from './AnimatedCounter';
export { default as MarqueeText     } from './MarqueeText';
export { default as ServiceCard     } from './ServiceCard';
export { default as CartDrawer      } from './CartDrawer';
export { CartProvider, useCart      } from './CartContext';
export { AuthProvider, useAuth      } from './AuthContext'; // ✅ NEW
// Add this line to your components/index.js
export { default as ScrollToTop } from './ScrollToTop';