import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  SHOP_PRODUCTS, SHOP_CATEGORIES,
  BLOG_POSTS, REVIEWS, SIDEBAR_MENU
} from '../constants/data';
import { useCart } from '../components';


// ── Star Rating Component
const Stars = ({ count }) => (
  <span style={{ color: '#c9a96e', fontSize: '1rem', letterSpacing: '2px' }}>
    {'★'.repeat(count)}{'☆'.repeat(5 - count)}
  </span>
);


// ── Single Review Card
const ReviewCard = ({ review }) => (
  <div style={{
    background: '#fff', padding: '32px 28px',
    boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
    minWidth: '260px', maxWidth: '340px',
    flex: '0 0 auto',
  }}>
    <p style={{
      fontFamily: "'Georgia', serif", fontSize: '0.95rem',
      color: '#333', lineHeight: '1.9', margin: '0 0 20px',
      fontWeight: '300',
    }}>
      "{review.text}"
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '0.65rem', letterSpacing: '2px', color: '#999', fontFamily: 'sans-serif' }}>
        BY <strong style={{ color: '#1a1a1a' }}>{review.name.toUpperCase()}</strong>
      </span>
      <Stars count={review.rating} />
    </div>
  </div>
);


// ── Social Links
const SOCIAL_LINKS = [
  { icon: '📸', label: 'Instagram', href: 'https://www.instagram.com/truebuild_project?utm_source=qr&igsh=ZmpjM2hteXl5NGxt' },
  { icon: '💼', label: 'LinkedIn',  href: 'https://www.linkedin.com/company/truebuild-projects/' },
  { icon: '👤', label: 'Facebook',  href: 'https://www.facebook.com/people/TrueBuild-Projects/61583582405966/' },
];


const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId,      setHoveredId]      = useState(null);
  const [addedId,        setAddedId]        = useState(null);
  const [reviewIndex,    setReviewIndex]    = useState(0);
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [openSideItem,   setOpenSideItem]   = useState(null);
  const [email,          setEmail]          = useState('');
  const [subscribed,     setSubscribed]     = useState(false);
  const [isMobile,       setIsMobile]       = useState(window.innerWidth < 900);
  const { addToCart, setCartOpen }          = useCart();


  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);


  // Auto-rotate reviews
  useEffect(() => {
    const t = setInterval(() => setReviewIndex(p => (p + 1) % REVIEWS.length), 4000);
    return () => clearInterval(t);
  }, []);


  // ✅ Reads admin-added products from localStorage, merges with data.js products
  const getProducts = () => {
    try {
      const stored = localStorage.getItem('gkd_products');
      const adminProducts = stored ? JSON.parse(stored) : [];
      return [...SHOP_PRODUCTS, ...adminProducts];
    } catch {
      return SHOP_PRODUCTS;
    }
  };
  const allProducts = getProducts();


  // ✅ Uses merged product list for filtering
  const filtered = activeCategory === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);


  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };


  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };


  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#faf8f5' }}>


      {/* ══════════════════════════════════════
          SECTION 1: PAGE HEADER + CART BUTTON
      ══════════════════════════════════════ */}
      <div style={{
        padding: isMobile ? '50px 20px 30px' : '70px 60px 30px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px',
        boxSizing: 'border-box',
      }}>
        <div>
          <p style={{ fontSize: '0.62rem', letterSpacing: '5px', textTransform: 'uppercase',
            color: '#c9a96e', marginBottom: '10px', fontFamily: 'sans-serif' }}>
            Curated Collection
          </p>
          <h1 style={{ fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '2rem' : 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: '300', letterSpacing: '5px', color: '#1a1a1a',
            textTransform: 'uppercase', margin: 0 }}>
            Shop Online
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {isMobile && (
            <button onClick={() => setSidebarOpen(true)} style={{
              background: '#1a1a1a', border: 'none', color: '#fff',
              padding: '10px 18px', cursor: 'pointer',
              fontSize: '0.65rem', letterSpacing: '2px',
              textTransform: 'uppercase', fontFamily: 'sans-serif',
            }}>
              ☰ Menu
            </button>
          )}
          <button onClick={() => setCartOpen(true)} style={{
            background: 'none', border: '1px solid #1a1a1a', cursor: 'pointer',
            padding: '10px 22px', display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase',
            fontFamily: 'sans-serif', color: '#1a1a1a', transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background='#1a1a1a'; e.currentTarget.style.color='#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.color='#1a1a1a'; }}>
            🛒 View Cart
          </button>
        </div>
      </div>


      {/* ══════════════════════════════════════
          SECTION 2: LAYOUT — SIDEBAR + PRODUCTS
      ══════════════════════════════════════ */}
      <div style={{
        display: 'flex', gap: '0',
        padding: isMobile ? '0' : '0 60px',
        boxSizing: 'border-box', alignItems: 'flex-start',
      }}>

        {/* ── DESKTOP SIDEBAR ── */}
        {!isMobile && (
          <aside style={{
            width: '240px', flexShrink: 0,
            background: '#fff', padding: '28px 24px',
            marginRight: '30px', position: 'sticky', top: '90px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          }}>
            <h4 style={{ fontFamily: 'sans-serif', fontSize: '0.65rem',
              letterSpacing: '3px', textTransform: 'uppercase',
              color: '#999', marginBottom: '20px', paddingBottom: '12px',
              borderBottom: '1px solid #f0ebe3' }}>
              Menu
            </h4>
            {SIDEBAR_MENU.map((item, idx) => (
              <div key={idx}>
                <div
                  onClick={() => {
                    setActiveCategory(item.label === 'Bedding' ? 'Bed Linen' : item.label);
                    setOpenSideItem(openSideItem === idx ? null : idx);
                  }}
                  style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', padding: '11px 0',
                    borderBottom: '1px solid #f5f0ea', cursor: 'pointer',
                  }}>
                  <span style={{
                    fontFamily: 'sans-serif', fontSize: '0.88rem',
                    color: activeCategory === item.label ? '#c9a96e' : '#1a1a1a',
                    transition: 'color 0.2s',
                  }}>
                    {item.label}
                  </span>
                  {item.sub.length > 0 && (
                    <span style={{ color: '#bbb', fontSize: '0.75rem' }}>
                      {openSideItem === idx ? '∨' : '>'}
                    </span>
                  )}
                </div>
                {item.sub.length > 0 && openSideItem === idx && (
                  <div style={{ paddingLeft: '14px', paddingBottom: '4px' }}>
                    {item.sub.map((sub, si) => (
                      <p key={si} style={{
                        fontFamily: 'sans-serif', fontSize: '0.78rem',
                        color: '#888', padding: '7px 0', margin: 0,
                        borderBottom: '1px solid #f9f6f2', cursor: 'pointer',
                      }}>{sub}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </aside>
        )}

        {/* ── MOBILE SIDEBAR OVERLAY ── */}
        {isMobile && sidebarOpen && (
          <>
            <div onClick={() => setSidebarOpen(false)} style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1500,
            }} />
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '280px', height: '100vh',
              background: '#fff', zIndex: 1600, padding: '28px 24px',
              overflowY: 'auto', boxSizing: 'border-box',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h4 style={{ fontFamily: 'sans-serif', fontSize: '0.65rem',
                  letterSpacing: '3px', textTransform: 'uppercase', color: '#999', margin: 0 }}>
                  Menu
                </h4>
                <button onClick={() => setSidebarOpen(false)} style={{
                  background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer',
                }}>✕</button>
              </div>
              {SIDEBAR_MENU.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveCategory(item.label);
                    setSidebarOpen(false);
                  }}
                  style={{
                    padding: '12px 0', borderBottom: '1px solid #f0ebe3',
                    fontFamily: 'sans-serif', fontSize: '0.95rem',
                    color: activeCategory === item.label ? '#c9a96e' : '#1a1a1a',
                    cursor: 'pointer', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center',
                  }}>
                  {item.label}
                  {item.sub.length > 0 && <span style={{ color: '#bbb' }}>›</span>}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── RIGHT SIDE: FILTERS + PRODUCT GRID ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Category filter tabs */}
          <div style={{
            display: 'flex', gap: '8px', flexWrap: 'wrap',
            marginBottom: '30px',
            padding: isMobile ? '0 20px' : '0',
          }}>
            {SHOP_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '8px 16px',
                border: '1px solid',
                borderColor: activeCategory === cat ? '#1a1a1a' : '#ddd',
                background: activeCategory === cat ? '#1a1a1a' : 'transparent',
                color: activeCategory === cat ? '#fff' : '#888',
                fontSize: '0.62rem', letterSpacing: '1.5px',
                textTransform: 'uppercase', fontFamily: 'sans-serif',
                cursor: 'pointer', transition: 'all 0.3s ease',
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? 'repeat(auto-fill, minmax(160px, 1fr))'
              : 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '2px',
            padding: isMobile ? '0 20px 40px' : '0 0 60px',
          }}>
            {filtered.map(product => (
              <div key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: '#fff', overflow: 'hidden',
                  transition: 'box-shadow 0.3s',
                  boxShadow: hoveredId === product.id ? '0 8px 32px rgba(0,0,0,0.09)' : 'none',
                }}>
                {/* Image */}
                <div style={{ position: 'relative', height: isMobile ? '180px' : '260px', overflow: 'hidden' }}>
                  <img src={product.img} alt={product.name} style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                    transform: hoveredId === product.id ? 'scale(1.06)' : 'scale(1)',
                  }} />
                  <span style={{
                    position: 'absolute', top: '10px', left: '10px',
                    background: 'rgba(255,255,255,0.92)',
                    padding: '3px 8px', fontSize: '0.55rem',
                    letterSpacing: '1.5px', textTransform: 'uppercase',
                    color: '#888', fontFamily: 'sans-serif',
                  }}>{product.category}</span>
                </div>
                {/* Info */}
                <div style={{ padding: isMobile ? '14px 14px 18px' : '18px 20px 22px' }}>
                  <h3 style={{ fontFamily: "'Georgia', serif", fontSize: isMobile ? '0.85rem' : '0.98rem',
                    fontWeight: '300', color: '#1a1a1a', margin: '0 0 6px', letterSpacing: '0.5px' }}>
                    {product.name}
                  </h3>
                  {!isMobile && (
                    <p style={{ fontSize: '0.75rem', color: '#aaa', margin: '0 0 12px',
                      lineHeight: '1.6', fontFamily: 'sans-serif' }}>
                      {product.desc}
                    </p>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontFamily: "'Georgia', serif", fontSize: '1rem', color: '#1a1a1a' }}>
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <button onClick={() => handleAdd(product)} style={{
                      padding: isMobile ? '7px 12px' : '9px 16px',
                      background: addedId === product.id ? '#c9a96e' : '#1a1a1a',
                      color: '#fff', border: 'none', cursor: 'pointer',
                      fontSize: '0.58rem', letterSpacing: '1.5px',
                      textTransform: 'uppercase', fontFamily: 'sans-serif',
                      transition: 'background 0.3s', whiteSpace: 'nowrap',
                    }}>
                      {addedId === product.id ? '✓ Added' : '+ Add'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════
          SECTION 3: BLOG POSTS
      ══════════════════════════════════════ */}
      <section style={{
        padding: isMobile ? '60px 20px' : '80px 60px',
        background: '#fff', boxSizing: 'border-box',
      }}>
        <h2 style={{
          textAlign: 'center', fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '1.6rem' : '2.2rem',
          fontWeight: '400', color: '#1a1a1a',
          marginBottom: '50px', letterSpacing: '1px',
        }}>
          Most Popular Blog Posts
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '36px',
        }}>
          {BLOG_POSTS.map(post => (
            <div key={post.id} style={{ cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}>
              <div style={{ height: '260px', overflow: 'hidden', marginBottom: '18px' }}>
                <img src={post.img} alt={post.title} style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.5s ease', display: 'block',
                }} />
              </div>
              <p style={{
                fontSize: '0.62rem', letterSpacing: '3px',
                textTransform: 'uppercase', color: '#c9a96e',
                marginBottom: '10px', fontFamily: 'sans-serif', fontWeight: '600',
              }}>{post.category}</p>
              <h3 style={{
                fontFamily: "'Georgia', serif", fontSize: '1.05rem',
                fontWeight: '400', color: '#1a1a1a', lineHeight: '1.55',
                margin: '0 0 10px',
              }}>{post.title}</h3>
              <p style={{ fontSize: '0.72rem', color: '#bbb', fontFamily: 'sans-serif' }}>
                {post.date}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════
          SECTION 4: REVIEWS CAROUSEL
      ══════════════════════════════════════ */}
      <section style={{
        padding: isMobile ? '60px 20px' : '80px 60px',
        background: '#f5f2ee', boxSizing: 'border-box',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Georgia', serif",
          fontSize: isMobile ? '1.6rem' : '2rem',
          fontWeight: '400', color: '#1a1a1a',
          marginBottom: '48px', letterSpacing: '1px',
        }}>
          Latest Reviews
        </h2>

        <div style={{
          display: 'flex', gap: '20px',
          justifyContent: 'center', flexWrap: isMobile ? 'nowrap' : 'wrap',
          overflowX: isMobile ? 'auto' : 'visible',
          paddingBottom: '10px',
        }}>
          {REVIEWS.map((review, idx) => (
            <div key={review.id} style={{
              opacity: isMobile ? (idx === reviewIndex ? 1 : 0.4) : 1,
              transform: isMobile ? `scale(${idx === reviewIndex ? 1 : 0.92})` : 'scale(1)',
              transition: 'all 0.4s ease',
              flexShrink: 0,
            }}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '32px' }}>
          {REVIEWS.map((_, idx) => (
            <button key={idx} onClick={() => setReviewIndex(idx)} style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: reviewIndex === idx ? '#c9a96e' : '#ddd',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════
          SECTION 5: NEWSLETTER
      ══════════════════════════════════════ */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: isMobile ? '70px 24px' : '90px 60px',
        boxSizing: 'border-box',
      }}>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
          alt="Newsletter bg"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover', zIndex: 0,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'rgba(0,0,0,0.5)',
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
          <h2 style={{
            fontFamily: "'Georgia', serif", color: '#fff',
            fontSize: isMobile ? '1.6rem' : '2rem',
            fontWeight: '300', marginBottom: '14px',
          }}>
            Join our newsletter and get...
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem',
            fontFamily: 'sans-serif', lineHeight: '1.8', marginBottom: '28px',
          }}>
            Join our email subscription now to get updates on promotions and coupons.
          </p>

          {subscribed ? (
            <p style={{ color: '#c9a96e', fontFamily: "'Georgia', serif", fontSize: '1.1rem', letterSpacing: '2px' }}>
              ✓ Thank you for subscribing!
            </p>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0', maxWidth: '480px' }}>
              <input
                type="email"
                placeholder="Your email here..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  flex: 1, padding: '14px 20px',
                  border: 'none', outline: 'none',
                  fontSize: '0.85rem', fontFamily: 'sans-serif',
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '30px 0 0 30px',
                  color: '#333',
                }}
              />
              <button type="submit" style={{
                padding: '14px 20px',
                background: '#1a1a1a', border: 'none',
                cursor: 'pointer', borderRadius: '0 30px 30px 0',
                color: '#fff', fontSize: '1rem',
                transition: 'background 0.3s',
              }}
                onMouseEnter={e => e.target.style.background = '#c9a96e'}
                onMouseLeave={e => e.target.style.background = '#1a1a1a'}>
                ➤
              </button>
            </form>
          )}

          {/* ✅ Social icons — real links added, YouTube removed */}
          <div style={{ display: 'flex', gap: '14px', marginTop: '28px' }}>
            {SOCIAL_LINKS.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}>
                <button style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.6)',
                  background: 'transparent', color: '#fff',
                  cursor: 'pointer', fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; }}
                  title={s.label}>
                  {s.icon}
                </button>
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Shop;