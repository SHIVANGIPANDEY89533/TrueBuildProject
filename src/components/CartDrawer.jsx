import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useCart } from './CartContext';

const EMAILJS_SERVICE_ID  = 'service_w5hfs3l';
const EMAILJS_TEMPLATE_ID = 'template_is1fhjo';
const EMAILJS_PUBLIC_KEY  = 'BTPoxY7CRPMliPHZj';
const ADMIN_EMAIL         = 'truebuildproject@gmail.com';

// ✅ Save order to localStorage
const saveOrderToLocal = (cartItems, total, customerInfo) => {
  const existingOrders = JSON.parse(localStorage.getItem('tbp_orders') || '[]');
  const newOrder = {
    id:       'ORD-' + Date.now(),
    date:     new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    items:    cartItems,
    total:    total,
    customer: customerInfo,
    status:   'Confirmed',
  };
  existingOrders.unshift(newOrder);
  localStorage.setItem('tbp_orders', JSON.stringify(existingOrders));
};

const CartDrawer = () => {
  const { cartItems, cartOpen, setCartOpen, removeFromCart,
          updateQty, clearCart, totalAmount } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced,   setOrderPlaced]   = useState(false);
  const [sending,       setSending]       = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '',
  });
  const [formError, setFormError] = useState('');

  const handleFormChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setFormError('');
  };

  // ── COD + EMAILJS HANDLER ──
  const handleCOD = async () => {
    if (!form.name.trim())    return setFormError('Please enter your name.');
    if (!form.phone.trim())   return setFormError('Please enter your phone number.');
    if (!form.address.trim()) return setFormError('Please enter your delivery address.');

    setSending(true);

    const orderItemsText = cartItems
      .map(item => `• ${item.name} × ${item.qty}  —  ₹${(item.price * item.qty).toLocaleString('en-IN')}`)
      .join('\n');

    const templateParams = {
      to_email:         ADMIN_EMAIL,
      customer_name:    form.name,
      customer_email:   form.email || 'Not provided',
      customer_phone:   form.phone,
      customer_address: form.address,
      order_items:      orderItemsText,
      order_total:      totalAmount.toLocaleString('en-IN'),
      order_date:       new Date().toLocaleString('en-IN', {
                          dateStyle: 'medium', timeStyle: 'short',
                        }),
      item_count:       cartItems.length,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      // ✅ Save order to localStorage AFTER email success
      saveOrderToLocal(cartItems, totalAmount, {
        name:    form.name,
        email:   form.email,
        phone:   form.phone,
        address: form.address,
      });

      clearCart();
      setOrderPlaced(true);
      setForm({ name: '', email: '', phone: '', address: '' });
      setTimeout(() => {
        setOrderPlaced(false);
        setCartOpen(false);
      }, 4000);

    } catch (err) {
      console.error('EmailJS error:', err);

      // ✅ Save order even if email fails
      saveOrderToLocal(cartItems, totalAmount, {
        name:    form.name,
        email:   form.email,
        phone:   form.phone,
        address: form.address,
      });

      alert('Order placed but notification failed. Please contact us directly.');
      clearCart();
      setOrderPlaced(true);
      setTimeout(() => {
        setOrderPlaced(false);
        setCartOpen(false);
      }, 4000);
    } finally {
      setSending(false);
    }
  };

  const handleOnlinePayment = async () => {
    if (cartItems.length === 0) return alert('Your cart is empty!');
    const options = {
      key: 'rzp_test_XXXXXXXXXXXXXXXXXX',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'TrueBuild Projects',
      description: `Order of ${cartItems.length} item(s)`,
      image: '/src/assets/images/logo.png',
      handler: function (response) {
        clearCart();
        setCartOpen(false);
        alert(`✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
      },
      prefill: { name: form.name, email: form.email, contact: form.phone },
      theme: { color: '#c9a96e' },
      modal: { ondismiss: () => console.log('Payment dismissed') },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', () => alert('Payment failed. Please try again.'));
    razorpay.open();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return alert('Your cart is empty!');
    if (paymentMethod === 'cod') handleCOD();
    else handleOnlinePayment();
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px',
    border: '1px solid #e8e3db', outline: 'none',
    fontSize: '0.82rem', fontFamily: 'sans-serif',
    color: '#333', background: '#fdfcfb',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block', fontSize: '0.58rem',
    letterSpacing: '2px', textTransform: 'uppercase',
    color: '#999', fontFamily: 'sans-serif', marginBottom: '6px',
  };

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.4)', zIndex: 1998,
          }}
        />
      )}

      {/* Cart Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0,
        width: '440px', maxWidth: '100vw',
        height: '100vh', background: '#fff',
        zIndex: 1999, boxShadow: '-4px 0 40px rgba(0,0,0,0.12)',
        transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s ease',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* ── HEADER ── */}
        <div style={{
          padding: '24px 28px', borderBottom: '1px solid #f0ebe3',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexShrink: 0,
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.62rem', letterSpacing: '4px',
              textTransform: 'uppercase', color: '#c9a96e', fontFamily: 'sans-serif' }}>
              Your Cart
            </p>
            <h3 style={{ margin: '6px 0 0', fontFamily: "'Georgia', serif",
              fontWeight: '300', fontSize: '1.2rem', letterSpacing: '2px' }}>
              {cartItems.length} Item{cartItems.length !== 1 ? 's' : ''}
            </h3>
          </div>
          <button onClick={() => setCartOpen(false)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.4rem', color: '#888', padding: '4px',
          }}>✕</button>
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>

          {/* ORDER SUCCESS */}
          {orderPlaced ? (
            <div style={{
              textAlign: 'center', marginTop: '60px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '16px',
            }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: '#f0faf0', border: '2px solid #c3e6cb',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '2rem',
              }}>✓</div>
              <p style={{ fontFamily: "'Georgia', serif", fontSize: '1.2rem',
                color: '#1a1a1a', letterSpacing: '2px', fontWeight: '300', margin: 0 }}>
                Order Confirmed!
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.72rem',
                color: '#888', letterSpacing: '1px', margin: 0, lineHeight: '1.8' }}>
                Thank you, <strong>{form.name || 'valued customer'}</strong>.<br />
                Our team will call you to confirm delivery.<br />
                <span style={{ color: '#c9a96e' }}>Payment: Cash on Delivery</span>
              </p>
              {/* ✅ View Orders link */}
              <a href="/my-orders" style={{
                marginTop: '8px', padding: '10px 24px',
                background: '#1a1a1a', color: '#fff',
                textDecoration: 'none', fontSize: '0.6rem',
                letterSpacing: '3px', textTransform: 'uppercase',
                fontFamily: 'sans-serif',
              }}>
                View My Orders →
              </a>
            </div>

          ) : cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <p style={{ color: '#bbb', fontFamily: "'Georgia', serif",
                fontSize: '1rem', letterSpacing: '2px' }}>
                Your cart is empty
              </p>
            </div>

          ) : (
            <>
              {/* CART ITEMS */}
              {cartItems.map(item => (
                <div key={item.id} style={{
                  display: 'flex', gap: '16px', marginBottom: '24px',
                  paddingBottom: '24px', borderBottom: '1px solid #f5f0ea',
                }}>
                  <img src={item.img} alt={item.name} style={{
                    width: '80px', height: '80px',
                    objectFit: 'cover', flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 4px', fontFamily: "'Georgia', serif",
                      fontSize: '0.9rem', fontWeight: '300', color: '#1a1a1a' }}>
                      {item.name}
                    </p>
                    <p style={{ margin: '0 0 10px', fontSize: '0.78rem',
                      color: '#c9a96e', fontFamily: 'sans-serif' }}>
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{
                        width: '28px', height: '28px', border: '1px solid #ddd',
                        background: 'none', cursor: 'pointer', fontSize: '1rem',
                      }}>−</button>
                      <span style={{ fontSize: '0.85rem', minWidth: '20px', textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      <button onClick={() => updateQty(item.id, +1)} style={{
                        width: '28px', height: '28px', border: '1px solid #ddd',
                        background: 'none', cursor: 'pointer', fontSize: '1rem',
                      }}>+</button>
                      <button onClick={() => removeFromCart(item.id)} style={{
                        marginLeft: 'auto', background: 'none', border: 'none',
                        cursor: 'pointer', color: '#bbb', fontSize: '0.75rem',
                        letterSpacing: '1px', fontFamily: 'sans-serif',
                      }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}

              {/* CUSTOMER DETAILS FORM */}
              <div style={{
                background: '#faf8f5', padding: '20px',
                marginBottom: '8px', border: '1px solid #f0ebe3',
              }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.58rem',
                  letterSpacing: '3px', textTransform: 'uppercase',
                  color: '#c9a96e', margin: '0 0 16px' }}>
                  Delivery Details
                </p>

                <div style={{ marginBottom: '12px' }}>
                  <label style={labelStyle}>Full Name *</label>
                  <input value={form.name}
                    onChange={e => handleFormChange('name', e.target.value)}
                    placeholder="e.g. Priya Sharma" style={inputStyle} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={labelStyle}>Phone Number *</label>
                  <input value={form.phone}
                    onChange={e => handleFormChange('phone', e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    style={inputStyle} type="tel" />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={labelStyle}>Email (Optional)</label>
                  <input value={form.email}
                    onChange={e => handleFormChange('email', e.target.value)}
                    placeholder="e.g. priya@email.com"
                    style={inputStyle} type="email" />
                </div>

                <div style={{ marginBottom: '4px' }}>
                  <label style={labelStyle}>Delivery Address *</label>
                  <textarea value={form.address}
                    onChange={e => handleFormChange('address', e.target.value)}
                    placeholder="House / Flat No., Street, Area, City, PIN"
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }} />
                </div>

                {formError && (
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.68rem',
                    color: '#e74c3c', margin: '8px 0 0' }}>
                    ⚠ {formError}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── FOOTER ── */}
        {cartItems.length > 0 && !orderPlaced && (
          <div style={{ padding: '16px 28px 24px', borderTop: '1px solid #f0ebe3', flexShrink: 0 }}>

            <p style={{ fontFamily: 'sans-serif', fontSize: '0.58rem',
              letterSpacing: '3px', textTransform: 'uppercase',
              color: '#999', margin: '0 0 10px' }}>
              Payment Method
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>

              {/* COD */}
              <div onClick={() => setPaymentMethod('cod')} style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '12px 14px', cursor: 'pointer',
                border: paymentMethod === 'cod' ? '1.5px solid #c9a96e' : '1.5px solid #e8e3db',
                background: paymentMethod === 'cod' ? '#fffdf8' : '#fff',
                transition: 'all 0.2s',
              }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                  border: paymentMethod === 'cod' ? '5px solid #c9a96e' : '2px solid #ccc',
                  marginTop: '2px', transition: 'all 0.2s',
                }} />
                <div>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.75rem',
                    color: '#1a1a1a', margin: '0 0 2px', fontWeight: '500' }}>
                    Cash on Delivery
                  </p>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.63rem',
                    color: '#888', margin: 0, lineHeight: '1.5' }}>
                    Pay when your order arrives.
                  </p>
                </div>
              </div>

              {/* Online Payment */}
              <div onClick={() => setPaymentMethod('online')} style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '12px 14px', cursor: 'pointer', opacity: 0.65,
                border: paymentMethod === 'online' ? '1.5px solid #c9a96e' : '1.5px solid #e8e3db',
                background: paymentMethod === 'online' ? '#fffdf8' : '#fff',
                transition: 'all 0.2s',
              }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                  border: paymentMethod === 'online' ? '5px solid #c9a96e' : '2px solid #ccc',
                  marginTop: '2px', transition: 'all 0.2s',
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <p style={{ fontFamily: 'sans-serif', fontSize: '0.75rem',
                      color: '#1a1a1a', margin: 0, fontWeight: '500' }}>
                      Online Payment
                    </p>
                    <span style={{
                      padding: '2px 7px', background: '#fff3e0',
                      border: '1px solid #f0c070', color: '#c9841a',
                      fontSize: '0.5rem', letterSpacing: '1.5px',
                      textTransform: 'uppercase', fontFamily: 'sans-serif',
                    }}>Coming Soon</span>
                  </div>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.63rem',
                    color: '#888', margin: '0 0 6px', lineHeight: '1.5' }}>
                    UPI, Cards, Net Banking — currently unavailable.
                  </p>
                  {paymentMethod === 'online' && (
                    <div style={{
                      background: '#fff8f0', border: '1px solid #f5ddb0',
                      padding: '7px 10px', display: 'flex', gap: '7px',
                    }}>
                      <span style={{ fontSize: '0.7rem' }}>⚠️</span>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.6rem',
                        color: '#a07030', margin: 0, lineHeight: '1.7' }}>
                        Online payment is currently not available.
                        Please use <strong>Cash on Delivery</strong>.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontFamily: 'sans-serif', fontSize: '0.78rem',
                letterSpacing: '2px', textTransform: 'uppercase', color: '#888' }}>
                Total
              </span>
              <span style={{ fontFamily: "'Georgia', serif", fontSize: '1.2rem', color: '#1a1a1a' }}>
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={paymentMethod === 'online' || sending}
              style={{
                width: '100%', padding: '16px',
                background: paymentMethod === 'online' || sending ? '#ccc' : '#1a1a1a',
                color: '#fff', border: 'none',
                cursor: paymentMethod === 'online' || sending ? 'not-allowed' : 'pointer',
                fontSize: '0.7rem', letterSpacing: '3px',
                textTransform: 'uppercase', fontFamily: 'sans-serif',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => {
                if (paymentMethod !== 'online' && !sending)
                  e.target.style.background = '#c9a96e';
              }}
              onMouseLeave={e => {
                if (paymentMethod !== 'online' && !sending)
                  e.target.style.background = '#1a1a1a';
              }}>
              {sending ? '⏳ Placing Order...' : paymentMethod === 'online' ? 'Online Payment Unavailable' : '✓ Place Order (COD)'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '10px',
              fontSize: '0.65rem', color: '#bbb', fontFamily: 'sans-serif',
              letterSpacing: '1px' }}>
              Secured by Razorpay
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;