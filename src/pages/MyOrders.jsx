import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [orders,   setOrders]   = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tbp_orders') || '[]');
    setOrders(saved);
  }, []);

  return (
    <main style={{
      paddingTop: '100px', minHeight: '100vh',
      background: '#faf8f5', padding: '100px 24px 60px',
      boxSizing: 'border-box',
    }}>

      {/* ── HEADER ── */}
      <div style={{ maxWidth: '900px', margin: '0 auto 48px' }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
          color: '#c9a96e', marginBottom: '10px', fontFamily: 'sans-serif' }}>
          Your Account
        </p>
        <h1 style={{ fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '1.8rem' : '2.5rem',
          fontWeight: '300', color: '#1a1a1a',
          margin: '0 0 12px', letterSpacing: '2px' }}>
          My Orders
        </h1>
        <div style={{ width: '40px', height: '1px', background: '#c9a96e' }} />
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {orders.length === 0 ? (

          /* ── EMPTY STATE ── */
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            background: '#fff', boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛍️</div>
            <h2 style={{ fontFamily: "'Georgia', serif", fontWeight: '300',
              fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '12px' }}>
              No orders yet
            </h2>
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem',
              color: '#888', lineHeight: '1.8', marginBottom: '28px' }}>
              You haven't placed any orders yet. Start shopping!
            </p>
            <Link to="/shop" style={{
              padding: '12px 32px', background: '#1a1a1a', color: '#fff',
              textDecoration: 'none', fontSize: '0.62rem',
              letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'sans-serif',
            }}>
              Shop Now
            </Link>
          </div>

        ) : (

          /* ── ORDERS LIST ── */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map(order => (
              <div key={order.id} style={{
                background: '#fff',
                boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
                overflow: 'hidden',
              }}>

                {/* Order Header */}
                <div style={{
                  background: '#1a1a1a', padding: '16px 24px',
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', flexWrap: 'wrap', gap: '10px',
                }}>
                  <div style={{ display: 'flex', gap: isMobile ? '16px' : '32px', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontSize: '0.52rem', letterSpacing: '2px', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.45)', fontFamily: 'sans-serif', margin: '0 0 3px' }}>
                        Order ID
                      </p>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem',
                        color: '#c9a96e', margin: 0, fontWeight: '600' }}>
                        {order.id}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.52rem', letterSpacing: '2px', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.45)', fontFamily: 'sans-serif', margin: '0 0 3px' }}>
                        Date
                      </p>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#fff', margin: 0 }}>
                        {order.date}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.52rem', letterSpacing: '2px', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.45)', fontFamily: 'sans-serif', margin: '0 0 3px' }}>
                        Total
                      </p>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#fff', margin: 0 }}>
                        ₹{order.total.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div style={{
                    padding: '5px 14px',
                    background: 'rgba(201,169,110,0.2)',
                    border: '1px solid #c9a96e',
                  }}>
                    <span style={{ fontSize: '0.58rem', letterSpacing: '2px',
                      textTransform: 'uppercase', color: '#c9a96e', fontFamily: 'sans-serif' }}>
                      ✓ {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div style={{ padding: '20px 24px' }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '16px', alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: i < order.items.length - 1 ? '1px solid #f5f0ea' : 'none',
                    }}>
                      <img src={item.img} alt={item.name} style={{
                        width: '60px', height: '60px',
                        objectFit: 'cover', flexShrink: 0,
                      }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: "'Georgia', serif", fontSize: '0.95rem',
                          color: '#1a1a1a', margin: '0 0 4px' }}>
                          {item.name}
                        </p>
                        <p style={{ fontFamily: 'sans-serif', fontSize: '0.72rem',
                          color: '#999', margin: 0 }}>
                          Qty: {item.qty} × ₹{item.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.88rem',
                        color: '#1a1a1a', fontWeight: '600', margin: 0 }}>
                        ₹{(item.qty * item.price).toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Delivery Info */}
                <div style={{
                  background: '#faf8f5', padding: '14px 24px',
                  borderTop: '1px solid #f0ebe3',
                  display: 'flex', gap: '32px', flexWrap: 'wrap',
                }}>
                  <div>
                    <p style={{ fontSize: '0.52rem', letterSpacing: '2px', textTransform: 'uppercase',
                      color: '#bbb', fontFamily: 'sans-serif', margin: '0 0 3px' }}>
                      Delivered To
                    </p>
                    <p style={{ fontFamily: 'sans-serif', fontSize: '0.78rem', color: '#555', margin: 0 }}>
                      {order.customer?.name} — {order.customer?.address}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.52rem', letterSpacing: '2px', textTransform: 'uppercase',
                      color: '#bbb', fontFamily: 'sans-serif', margin: '0 0 3px' }}>
                      Phone
                    </p>
                    <p style={{ fontFamily: 'sans-serif', fontSize: '0.78rem', color: '#555', margin: 0 }}>
                      {order.customer?.phone}
                    </p>
                  </div>
                  {order.customer?.email && (
                    <div>
                      <p style={{ fontSize: '0.52rem', letterSpacing: '2px', textTransform: 'uppercase',
                        color: '#bbb', fontFamily: 'sans-serif', margin: '0 0 3px' }}>
                        Email
                      </p>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.78rem', color: '#555', margin: 0 }}>
                        {order.customer?.email}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyOrders;