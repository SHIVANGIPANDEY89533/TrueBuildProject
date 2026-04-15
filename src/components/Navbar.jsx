import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import logo from '../assets/images/logo.jpeg';

const ADMIN_PASSWORD = 'truebuild@123';

const NAV_LINKS = [
  { label: 'Home',     path: '/'         },
  { label: 'About',    path: '/about'    },
  {
    label: 'Services', path: '/services',
    sub: [
      { label: 'Architectural', path: '/services/architectural' },
      { label: 'Residential',   path: '/services/residential'   },
      { label: 'Commercial',    path: '/services/commercial'    },
      { label: 'Hospitality',   path: '/services/hospitality'   },
    ],
  },
  { label: 'Bespoke',  path: '/bespoke'  },
  { label: 'Shop',     path: '/shop'     },
  { label: 'Contact',  path: '/contact'  },
];

const Navbar = () => {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [openSub,      setOpenSub]      = useState(null);
  const [isMobile,     setIsMobile]     = useState(window.innerWidth < 1024);

  const [modalOpen,    setModalOpen]    = useState(false);
  const [loginTab,     setLoginTab]     = useState('user');
  const [userName,     setUserName]     = useState('');
  const [userEmail,    setUserEmail]    = useState('');
  const [adminPass,    setAdminPass]    = useState('');
  const [adminError,   setAdminError]   = useState(false);
  const [userError,    setUserError]    = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, admin, isLoggedIn, loginUser, loginAdmin, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => { setMenuOpen(false); setOpenSub(null); }, [location]);

  const closeModal = () => {
    setModalOpen(false);
    setUserName(''); setUserEmail('');
    setAdminPass(''); setAdminError(false);
    setUserError('');
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    if (!userName.trim())         { setUserError('Please enter your name');     return; }
    if (!userEmail.includes('@')) { setUserError('Please enter a valid email'); return; }
    loginUser(userName.trim(), userEmail.trim());
    closeModal();
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPass === ADMIN_PASSWORD) {
      loginAdmin(); closeModal(); navigate('/admin');
    } else {
      setAdminError(true);
    }
  };

  const displayName  = admin ? 'Admin' : user?.name || '';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const linkColor = (path) =>
    location.pathname === path ? '#c9a96e' : scrolled ? '#1a1a1a' : '#fff';

  return (
    <>
      {/* ══════════════════════════════════════
          MAIN NAVBAR
      ══════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
        padding: isMobile ? '14px 24px' : '12px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxSizing: 'border-box',
        background: scrolled || menuOpen
          ? 'rgba(255,255,255,0.97)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)',
        boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.07)' : 'none',
        transition: 'all 0.4s ease',
      }}>

        {/* ── LOGO ── */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center',
          textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%',
            overflow: 'hidden', border: '2px solid rgba(201,169,110,0.4)',
          }}>
            <img src={logo} alt="Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </Link>

        {/* ══════════════════════════════════════
            DESKTOP NAV LINKS
        ══════════════════════════════════════ */}
        {!isMobile && (
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '22px', flexWrap: 'nowrap',
          }}>
            {NAV_LINKS.map((link, idx) => (
              <div
                key={link.path}
                style={{ position: 'relative' }}
                onMouseEnter={() => link.sub && setOpenSub(idx)}
                onMouseLeave={() => link.sub && setOpenSub(null)}
              >
                {/* ✅ hover listeners moved to parent div — no gap issue */}
                <Link
                  to={link.path}
                  style={{
                    textDecoration: 'none',
                    color: linkColor(link.path),
                    fontSize: '0.6rem', letterSpacing: '1.8px',
                    textTransform: 'uppercase', fontWeight: '400',
                    whiteSpace: 'nowrap', transition: 'color 0.3s',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '8px 0',
                  }}>
                  {link.label}
                  {link.sub && (
                    <span style={{ fontSize: '0.5rem', opacity: 0.7 }}>▾</span>
                  )}
                </Link>

                {/* ── Services Dropdown ── */}
                {link.sub && openSub === idx && (
                  <div
                    onMouseEnter={() => setOpenSub(idx)}
                    onMouseLeave={() => setOpenSub(null)}
                    style={{
                      position: 'absolute',
                      top: '100%',         // ✅ flush — no gap
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#fff',
                      minWidth: '190px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      zIndex: 1100,
                      paddingTop: '8px',
                      paddingBottom: '8px',
                    }}>
                    {link.sub.map(sub => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        style={{
                          display: 'block',
                          padding: '11px 20px',
                          textDecoration: 'none',
                          color: location.pathname === sub.path ? '#c9a96e' : '#444',
                          fontSize: '0.68rem',
                          letterSpacing: '1.5px',
                          textTransform: 'uppercase',
                          fontFamily: 'sans-serif',
                          transition: 'all 0.2s',
                          borderLeft: location.pathname === sub.path
                            ? '2px solid #c9a96e' : '2px solid transparent',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#faf8f5';
                          e.currentTarget.style.color = '#c9a96e';
                          e.currentTarget.style.borderLeftColor = '#c9a96e';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color =
                            location.pathname === sub.path ? '#c9a96e' : '#444';
                          e.currentTarget.style.borderLeftColor =
                            location.pathname === sub.path ? '#c9a96e' : 'transparent';
                        }}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* ── LOGIN / AVATAR ── */}
            {!isLoggedIn ? (
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  padding: '8px 18px', background: 'transparent',
                  border: `1px solid ${scrolled ? '#1a1a1a' : '#fff'}`,
                  color: scrolled ? '#1a1a1a' : '#fff',
                  cursor: 'pointer', fontSize: '0.6rem',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  fontFamily: 'sans-serif', transition: 'all 0.3s',
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = '#c9a96e';
                  e.currentTarget.style.borderColor = '#c9a96e';
                  e.currentTarget.style.color       = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'transparent';
                  e.currentTarget.style.borderColor = scrolled ? '#1a1a1a' : '#fff';
                  e.currentTarget.style.color       = scrolled ? '#1a1a1a' : '#fff';
                }}>
                Login
              </button>
            ) : (
              <div ref={dropdownRef} style={{ position: 'relative', flexShrink: 0 }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'none', border: 'none',
                    cursor: 'pointer', padding: '4px',
                  }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: admin ? '#c9a96e' : '#1a1a1a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: '0.82rem', fontWeight: '600',
                    fontFamily: 'sans-serif',
                  }}>
                    {avatarLetter}
                  </div>
                  <span style={{
                    fontSize: '0.6rem', letterSpacing: '1px',
                    color: scrolled ? '#1a1a1a' : '#fff',
                    fontFamily: 'sans-serif', textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}>
                    {displayName} {admin && '🔐'}
                  </span>
                  <span style={{ color: scrolled ? '#888' : '#ccc', fontSize: '0.6rem' }}>▾</span>
                </button>

                {dropdownOpen && (
                  <div style={{
                    position: 'absolute', top: '48px', right: 0,
                    background: '#fff', minWidth: '200px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    zIndex: 1100, padding: '8px 0',
                  }}>
                    <div style={{ padding: '12px 18px 10px',
                      borderBottom: '1px solid #f0ebe3' }}>
                      <p style={{ margin: 0, fontFamily: "'Georgia', serif",
                        fontSize: '0.88rem', color: '#1a1a1a' }}>
                        {displayName}
                      </p>
                      <p style={{ margin: '3px 0 0', fontFamily: 'sans-serif',
                        fontSize: '0.65rem', color: '#bbb', letterSpacing: '1px' }}>
                        {admin ? 'Administrator' : user?.email}
                      </p>
                    </div>

                    {admin && (
                      <button
                        onClick={() => { navigate('/admin'); setDropdownOpen(false); }}
                        style={dropdownItemStyle}>
                        🔐 Admin Panel
                      </button>
                    )}

                    {!admin && (
                      <button
                        onClick={() => setDropdownOpen(false)}
                        style={dropdownItemStyle}>
                        👤 My Profile
                      </button>
                    )}

                    {!admin && (
                      <button
                        onClick={() => { navigate('/my-orders'); setDropdownOpen(false); }}
                        style={dropdownItemStyle}>
                        📦 My Orders
                      </button>
                    )}

                    <button
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      style={{
                        ...dropdownItemStyle,
                        color: '#e74c3c',
                        borderTop: '1px solid #f0ebe3',
                        marginTop: '4px',
                      }}>
                      → Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════
            MOBILE: Hamburger + Login icon
        ══════════════════════════════════════ */}
        {isMobile && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {!isLoggedIn ? (
              <button onClick={() => setModalOpen(true)} style={{
                background: 'none',
                border: `1px solid ${scrolled ? '#1a1a1a' : '#fff'}`,
                color: scrolled ? '#1a1a1a' : '#fff',
                padding: '7px 14px', cursor: 'pointer',
                fontSize: '0.6rem', letterSpacing: '2px',
                textTransform: 'uppercase', fontFamily: 'sans-serif',
              }}>
                Login
              </button>
            ) : (
              <div style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: admin ? '#c9a96e' : '#1a1a1a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '0.82rem', fontWeight: '600',
                cursor: 'pointer',
              }} onClick={() => setMenuOpen(true)}>
                {avatarLetter}
              </div>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px', display: 'flex', flexDirection: 'column',
                gap: '5px', zIndex: 1100,
              }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: '24px', height: '1.5px',
                  background: scrolled || menuOpen ? '#1a1a1a' : '#fff',
                  transition: 'all 0.3s ease',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                    : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                    : 'scaleX(0)'
                    : 'none',
                }} />
              ))}
            </button>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════
          FULL SCREEN MOBILE MENU
      ══════════════════════════════════════ */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(10,8,6,0.96)',
          display: 'flex', flexDirection: 'column',
          padding: '100px 40px 40px', overflowY: 'auto',
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: 'absolute', top: '28px', right: '28px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#fff', fontSize: '0.8rem', letterSpacing: '2px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            Close <span style={{ fontSize: '1.2rem' }}>✕</span>
          </button>

          {NAV_LINKS.map((link, idx) => (
            <div key={idx}>
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                padding: '16px 0',
              }}>
                <Link to={link.path} style={{
                  color: location.pathname === link.path ? '#c9a96e' : '#fff',
                  textDecoration: 'none',
                  fontSize: 'clamp(1.4rem, 5vw, 2.2rem)',
                  fontFamily: "'Georgia', serif", fontWeight: '300',
                  letterSpacing: '1px',
                }}>
                  {link.label}
                </Link>
                {link.sub && (
                  <button
                    onClick={() => setOpenSub(openSub === idx ? null : idx)}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#fff', width: '36px', height: '36px',
                      borderRadius: '50%', cursor: 'pointer',
                      fontSize: '1rem', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                    {openSub === idx ? '−' : '+'}
                  </button>
                )}
              </div>
              {link.sub && openSub === idx && (
                <div style={{ paddingLeft: '16px', paddingBottom: '8px' }}>
                  {link.sub.map((sub, si) => (
                    <Link key={si} to={sub.path} style={{
                      display: 'block',
                      color: location.pathname === sub.path
                        ? '#c9a96e' : 'rgba(255,255,255,0.55)',
                      textDecoration: 'none', fontSize: '0.9rem',
                      padding: '10px 0', letterSpacing: '1px',
                      fontFamily: 'sans-serif',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* ── MOBILE MENU — Login / User Section ── */}
          <div style={{ marginTop: '24px', paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {!isLoggedIn ? (
              <button onClick={() => { setMenuOpen(false); setModalOpen(true); }} style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff', padding: '12px 28px', cursor: 'pointer',
                fontSize: '0.68rem', letterSpacing: '3px',
                textTransform: 'uppercase', fontFamily: 'sans-serif',
              }}>
                Login
              </button>
            ) : (
              <div>
                <p style={{ color: '#c9a96e', fontFamily: "'Georgia', serif",
                  fontSize: '1rem', margin: '0 0 16px' }}>
                  Hello, {displayName} {admin && '🔐'}
                </p>

                {admin && (
                  <button onClick={() => { navigate('/admin'); setMenuOpen(false); }} style={{
                    display: 'block', background: 'none', border: 'none',
                    color: '#fff', fontSize: '0.88rem', cursor: 'pointer',
                    fontFamily: 'sans-serif', padding: '10px 0', letterSpacing: '1px',
                  }}>
                    🔐 Admin Panel
                  </button>
                )}

                {!admin && (
                  <button onClick={() => { navigate('/my-orders'); setMenuOpen(false); }} style={{
                    display: 'block', background: 'none', border: 'none',
                    color: '#fff', fontSize: '0.88rem', cursor: 'pointer',
                    fontFamily: 'sans-serif', padding: '10px 0', letterSpacing: '1px',
                  }}>
                    📦 My Orders
                  </button>
                )}

                <button onClick={() => { logout(); setMenuOpen(false); }} style={{
                  display: 'block', background: 'none', border: 'none',
                  color: '#e74c3c', fontSize: '0.88rem', cursor: 'pointer',
                  fontFamily: 'sans-serif', padding: '10px 0', marginTop: '8px',
                }}>
                  → Logout
                </button>
              </div>
            )}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '40px',
            display: 'flex', gap: '24px' }}>
            {['IG', 'FB', 'IN'].map((s, i) => (
              <span key={i} style={{ color: 'rgba(255,255,255,0.5)',
                fontSize: '0.75rem', letterSpacing: '1px', cursor: 'pointer' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          LOGIN MODAL
      ══════════════════════════════════════ */}
      {modalOpen && (
        <>
          <div onClick={closeModal} style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 2000, backdropFilter: 'blur(4px)',
          }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff', zIndex: 2001,
            width: '100%', maxWidth: '440px',
            padding: '40px 36px', boxSizing: 'border-box',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            margin: '0 16px',
          }}>
            <button onClick={closeModal} style={{
              position: 'absolute', top: '16px', right: '20px',
              background: 'none', border: 'none',
              fontSize: '1.3rem', cursor: 'pointer', color: '#bbb',
            }}>✕</button>

            <p style={{ fontSize: '0.6rem', letterSpacing: '4px',
              textTransform: 'uppercase', color: '#c9a96e',
              marginBottom: '8px', fontFamily: 'sans-serif' }}>
              Welcome
            </p>
            <h2 style={{ fontFamily: "'Georgia', serif", fontWeight: '300',
              fontSize: '1.6rem', color: '#1a1a1a',
              margin: '0 0 28px', letterSpacing: '2px' }}>
              Sign In
            </h2>

            <div style={{ display: 'flex', gap: '2px', marginBottom: '28px' }}>
              {[
                { key: 'user',  label: '👤 Customer' },
                { key: 'admin', label: '🔐 Admin'    },
              ].map(t => (
                <button key={t.key} type="button"
                  onClick={() => { setLoginTab(t.key); setAdminError(false); setUserError(''); }}
                  style={{
                    flex: 1, padding: '11px',
                    background: loginTab === t.key ? '#1a1a1a' : '#f5f0ea',
                    color:      loginTab === t.key ? '#fff'    : '#888',
                    border: 'none', cursor: 'pointer',
                    fontSize: '0.68rem', letterSpacing: '1.5px',
                    textTransform: 'uppercase', fontFamily: 'sans-serif',
                    transition: 'all 0.2s',
                  }}>
                  {t.label}
                </button>
              ))}
            </div>

            {loginTab === 'user' && (
              <form onSubmit={handleUserLogin}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={modalLabelStyle}>Your Name</label>
                  <input value={userName}
                    onChange={e => { setUserName(e.target.value); setUserError(''); }}
                    placeholder="e.g. Priya Sharma"
                    style={modalInputStyle} autoFocus />
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <label style={modalLabelStyle}>Email Address</label>
                  <input type="email" value={userEmail}
                    onChange={e => { setUserEmail(e.target.value); setUserError(''); }}
                    placeholder="priya@email.com"
                    style={modalInputStyle} />
                </div>
                {userError && (
                  <p style={{ color: '#e74c3c', fontSize: '0.72rem',
                    fontFamily: 'sans-serif', margin: '4px 0 16px' }}>
                    {userError}
                  </p>
                )}
                <button type="submit" style={modalBtnStyle}>
                  Continue as Customer
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.68rem',
                  color: '#bbb', fontFamily: 'sans-serif',
                  marginTop: '16px', lineHeight: '1.6' }}>
                  No password needed — enter your name &amp; email to track orders.
                </p>
              </form>
            )}

            {loginTab === 'admin' && (
              <form onSubmit={handleAdminLogin}>
                <div style={{ marginBottom: '8px' }}>
                  <label style={modalLabelStyle}>Admin Password</label>
                  <input type="password" value={adminPass}
                    onChange={e => { setAdminPass(e.target.value); setAdminError(false); }}
                    placeholder="Enter admin password"
                    style={{ ...modalInputStyle,
                      borderColor: adminError ? '#e74c3c' : '#e8e3db' }}
                    autoFocus />
                </div>
                {adminError && (
                  <p style={{ color: '#e74c3c', fontSize: '0.72rem',
                    fontFamily: 'sans-serif', margin: '4px 0 16px' }}>
                    ✕ Incorrect password. Try again.
                  </p>
                )}
                <button type="submit"
                  style={{ ...modalBtnStyle, background: '#c9a96e' }}>
                  Login as Admin →
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.68rem',
                  color: '#bbb', fontFamily: 'sans-serif', marginTop: '16px' }}>
                  Admin access only. Redirects to dashboard.
                </p>
              </form>
            )}
          </div>
        </>
      )}
    </>
  );
};

// ── Shared styles
const dropdownItemStyle = {
  display: 'block', width: '100%', padding: '11px 18px',
  background: 'none', border: 'none', cursor: 'pointer',
  textAlign: 'left', fontSize: '0.78rem', color: '#444',
  fontFamily: 'sans-serif', letterSpacing: '0.5px',
  transition: 'background 0.2s',
};

const modalLabelStyle = {
  display: 'block', fontSize: '0.6rem',
  letterSpacing: '2px', textTransform: 'uppercase',
  color: '#999', fontFamily: 'sans-serif', marginBottom: '8px',
};

const modalInputStyle = {
  width: '100%', padding: '13px 14px',
  border: '1px solid #e8e3db', outline: 'none',
  fontSize: '0.9rem', fontFamily: 'sans-serif',
  color: '#333', background: '#fdfcfb',
  boxSizing: 'border-box', marginBottom: '16px',
  transition: 'border 0.2s',
};

const modalBtnStyle = {
  width: '100%', padding: '14px',
  background: '#1a1a1a', color: '#fff',
  border: 'none', cursor: 'pointer',
  fontSize: '0.68rem', letterSpacing: '3px',
  textTransform: 'uppercase', fontFamily: 'sans-serif',
  transition: 'background 0.3s', marginTop: '8px',
};

export default Navbar;