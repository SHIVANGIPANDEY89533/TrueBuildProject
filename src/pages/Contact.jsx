import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';


// ── EMAILJS CONFIG
const EMAILJS_SERVICE_ID  = 'service_w5hfs3l';
const EMAILJS_TEMPLATE_ID = 'template_is1fhjo';
const EMAILJS_PUBLIC_KEY  = 'BTPoxY7CRPMliPHZj';
const ADMIN_EMAIL         = 'truebuildproject@gmail.com';


// ── Contact categories
const CONTACT_TYPES = [
  {
    icon:  '◈',
    title: 'Interiors Project Enquiries',
    desc:  'For residential, commercial, hospitality and architectural design projects.',
    email: 'truebuildproject@gmail.com',
    phone: '+91 7217310020',
    color: '#c9a96e',
  },
  {
    icon:  '◉',
    title: 'Construction Enquiries',
    desc:  'For new building projects, structural work, excavation, masonry and complete construction consultations.',
    email: 'truebuildproject@gmail.com',
    phone: '+91 72173 10020',
    color: '#1a1a1a',
  },
  {
    icon:  '◇',
    title: 'Other Enquiries & Customer Care',
    desc:  'For shop orders, bespoke furniture, general questions and after-sale support.',
    email: 'truebuildproject@gmail.com',
    phone: '+91 70551 85315',
    color: '#888',
  },
];


const ENQUIRY_TYPES = [
  'Interiors Project',
  'Bespoke Furniture',
  'Construction',
  'Shop / Product',
  'General Enquiry',
];


const fieldStyle = {
  width: '100%', padding: '13px 16px',
  border: '1px solid #e8e3db', outline: 'none',
  fontSize: '0.88rem', fontFamily: 'sans-serif',
  color: '#333', background: '#fdfcfb',
  boxSizing: 'border-box', transition: 'border 0.2s',
};


const Contact = () => {
  const [isMobile,  setIsMobile]  = useState(window.innerWidth < 768);
  const [form,      setForm]      = useState({
    name: '', email: '', phone: '',
    enquiryType: 'Interiors Project', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
  const [focused,   setFocused]   = useState(null);
  const [activeTab, setActiveTab] = useState(0);


  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);


  const handleChange = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const templateParams = {
      to_email:         ADMIN_EMAIL,
      customer_name:    form.name,
      customer_email:   form.email,
      customer_phone:   form.phone || 'Not provided',
      customer_address: form.enquiryType,
      order_items:      form.message,
      order_total:      'Contact Form Enquiry',
      order_date:       new Date().toLocaleString('en-IN', {
                          dateStyle: 'medium', timeStyle: 'short',
                        }),
      item_count:       form.enquiryType,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );
      setSending(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setSending(false);
      alert('Message sent! We will contact you shortly.');
      setSubmitted(true);
    }
  };


  return (
    <main style={{ paddingTop: '80px', minHeight: '100vh', background: '#faf8f5' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: isMobile ? '44vh' : '52vh', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
          alt="Contact Us"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.72))',
        }} />
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center', padding: '0 24px',
        }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif', marginBottom: '14px' }}>
            Get in Touch
          </p>
          <h1 style={{ fontFamily: "'Georgia', serif", color: '#fff',
            fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300', letterSpacing: '6px',
            textTransform: 'uppercase', margin: '0 0 16px' }}>
            Contact Us
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#c9a96e', margin: '0 auto 18px' }} />
          <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Georgia', serif",
            fontSize: isMobile ? '0.88rem' : '1rem', fontWeight: '300',
            maxWidth: '480px', lineHeight: '1.9' }}>
            If you need help before, during or after your purchase — this is the place to be.
          </p>
        </div>
      </div>

      {/* ── CONTACT TYPE TABS ── */}
      <section style={{
        background: '#1a1a1a',
        padding: isMobile ? '48px 24px' : '72px 80px',
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center',
          gap: '2px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {CONTACT_TYPES.map((ct, idx) => (
            <button key={idx} onClick={() => setActiveTab(idx)} style={{
              padding: isMobile ? '10px 14px' : '12px 24px',
              background: activeTab === idx ? '#c9a96e' : 'transparent',
              color: activeTab === idx ? '#fff' : 'rgba(255,255,255,0.45)',
              border: `1px solid ${activeTab === idx ? '#c9a96e' : 'rgba(255,255,255,0.15)'}`,
              cursor: 'pointer', fontFamily: 'sans-serif',
              fontSize: isMobile ? '0.58rem' : '0.62rem',
              letterSpacing: '2px', textTransform: 'uppercase',
              transition: 'all 0.3s',
            }}>
              {isMobile ? ct.title.split(' ')[0] : ct.title}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '2.2rem', color: '#c9a96e', marginBottom: '20px' }}>
            {CONTACT_TYPES[activeTab].icon}
          </div>
          <h2 style={{ fontFamily: "'Georgia', serif", color: '#fff',
            fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '300',
            margin: '0 0 14px', letterSpacing: '1px' }}>
            {CONTACT_TYPES[activeTab].title}
          </h2>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.5)', lineHeight: '1.8',
            margin: '0 0 36px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            {CONTACT_TYPES[activeTab].desc}
          </p>
          <div style={{ display: 'flex', gap: isMobile ? '12px' : '24px',
            justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`mailto:${CONTACT_TYPES[activeTab].email}`} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', gap: '12px', alignItems: 'center',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '16px 24px', transition: 'all 0.3s', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(201,169,110,0.12)'; e.currentTarget.style.borderColor='rgba(201,169,110,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}>
                <span style={{ fontSize: '1.2rem' }}>✉</span>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.55rem',
                    letterSpacing: '2px', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)', margin: '0 0 3px' }}>Email</p>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.82rem', color: '#fff', margin: 0 }}>
                    {CONTACT_TYPES[activeTab].email}
                  </p>
                </div>
              </div>
            </a>
            <a href={`tel:${CONTACT_TYPES[activeTab].phone.replace(/\s/g, '')}`} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', gap: '12px', alignItems: 'center',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '16px 24px', transition: 'all 0.3s', cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(201,169,110,0.12)'; e.currentTarget.style.borderColor='rgba(201,169,110,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; }}>
                <span style={{ fontSize: '1.2rem' }}>☎</span>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.55rem',
                    letterSpacing: '2px', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)', margin: '0 0 3px' }}>Call</p>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.82rem', color: '#fff', margin: 0 }}>
                    {CONTACT_TYPES[activeTab].phone}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── FORM + STUDIO INFO ── */}
      <section style={{
        padding: isMobile ? '52px 24px 60px' : '80px 80px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '3fr 2fr',
        gap: isMobile ? '48px' : '72px',
        maxWidth: '1200px', margin: '0 auto',
        boxSizing: 'border-box',
      }}>

        {/* ── FORM ── */}
        <div>
          {!submitted ? (
            <>
              <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
                color: '#c9a96e', marginBottom: '12px', fontFamily: 'sans-serif' }}>
                Send a Message
              </p>
              <h2 style={{ fontFamily: "'Georgia', serif",
                fontSize: isMobile ? '1.7rem' : '2.2rem',
                fontWeight: '300', color: '#1a1a1a', margin: '0 0 10px' }}>
                We'd love to hear from you
              </h2>
              <div style={{ width: '36px', height: '1px', background: '#c9a96e', marginBottom: '32px' }} />

              <form onSubmit={handleSubmit}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '14px', marginBottom: '14px',
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.58rem',
                      letterSpacing: '2px', textTransform: 'uppercase',
                      color: '#999', fontFamily: 'sans-serif', marginBottom: '7px' }}>
                      Full Name *
                    </label>
                    <input type="text" placeholder="Your full name"
                      value={form.name} required
                      onChange={e => handleChange('name', e.target.value)}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      style={{ ...fieldStyle, borderColor: focused === 'name' ? '#c9a96e' : '#e8e3db' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.58rem',
                      letterSpacing: '2px', textTransform: 'uppercase',
                      color: '#999', fontFamily: 'sans-serif', marginBottom: '7px' }}>
                      Email Address *
                    </label>
                    <input type="email" placeholder="your@email.com"
                      value={form.email} required
                      onChange={e => handleChange('email', e.target.value)}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      style={{ ...fieldStyle, borderColor: focused === 'email' ? '#c9a96e' : '#e8e3db' }}
                    />
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '14px', marginBottom: '14px',
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.58rem',
                      letterSpacing: '2px', textTransform: 'uppercase',
                      color: '#999', fontFamily: 'sans-serif', marginBottom: '7px' }}>
                      Phone Number
                    </label>
                    <input type="tel" placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      style={{ ...fieldStyle, borderColor: focused === 'phone' ? '#c9a96e' : '#e8e3db' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.58rem',
                      letterSpacing: '2px', textTransform: 'uppercase',
                      color: '#999', fontFamily: 'sans-serif', marginBottom: '7px' }}>
                      Enquiry Type *
                    </label>
                    <select value={form.enquiryType} required
                      onChange={e => handleChange('enquiryType', e.target.value)}
                      onFocus={() => setFocused('type')}
                      onBlur={() => setFocused(null)}
                      style={{ ...fieldStyle, cursor: 'pointer', borderColor: focused === 'type' ? '#c9a96e' : '#e8e3db' }}>
                      {ENQUIRY_TYPES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontSize: '0.58rem',
                    letterSpacing: '2px', textTransform: 'uppercase',
                    color: '#999', fontFamily: 'sans-serif', marginBottom: '7px' }}>
                    Your Message *
                  </label>
                  <textarea
                    placeholder="Tell us about your project, space size, timeline, or any specific requirements..."
                    value={form.message} required rows={5}
                    onChange={e => handleChange('message', e.target.value)}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    style={{ ...fieldStyle, resize: 'vertical', minHeight: '120px',
                      lineHeight: '1.7', borderColor: focused === 'message' ? '#c9a96e' : '#e8e3db' }}
                  />
                </div>

                <button type="submit" disabled={sending} style={{
                  width: '100%', padding: '15px',
                  background: sending ? '#aaa' : '#1a1a1a',
                  color: '#fff', border: 'none',
                  cursor: sending ? 'not-allowed' : 'pointer',
                  fontSize: '0.65rem', letterSpacing: '4px',
                  textTransform: 'uppercase', fontFamily: 'sans-serif',
                  transition: 'background 0.3s',
                }}
                  onMouseEnter={e => { if (!sending) e.target.style.background = '#c9a96e'; }}
                  onMouseLeave={e => { if (!sending) e.target.style.background = '#1a1a1a'; }}>
                  {sending ? '⏳ Sending...' : 'Send Message →'}
                </button>

                <p style={{ fontFamily: 'sans-serif', fontSize: '0.68rem',
                  color: '#bbb', marginTop: '14px', lineHeight: '1.7' }}>
                  By submitting this form, you agree to be contacted by our team. We typically respond within 24 hours.
                </p>
              </form>
            </>
          ) : (
            <div style={{
              background: '#fff', padding: isMobile ? '48px 28px' : '60px 48px',
              textAlign: 'center', boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px', color: '#c9a96e' }}>✓</div>
              <p style={{ fontSize: '0.6rem', letterSpacing: '4px', textTransform: 'uppercase',
                color: '#c9a96e', marginBottom: '12px', fontFamily: 'sans-serif' }}>
                Message Sent
              </p>
              <h2 style={{ fontFamily: "'Georgia', serif", fontSize: '1.8rem',
                fontWeight: '300', color: '#1a1a1a', margin: '0 0 16px' }}>
                Thank you, {form.name.split(' ')[0]}!
              </h2>
              <div style={{ width: '36px', height: '1px', background: '#c9a96e', margin: '0 auto 20px' }} />
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.82rem', color: '#888',
                lineHeight: '1.9', margin: '0 0 12px', maxWidth: '400px',
                marginLeft: 'auto', marginRight: 'auto' }}>
                We've received your <strong>{form.enquiryType}</strong> enquiry and will get back to you at <strong>{form.email}</strong> within 24 hours.
              </p>
              <p style={{ fontFamily: "'Georgia', serif", fontSize: '0.9rem', color: '#aaa',
                lineHeight: '1.8', margin: '0 0 36px', fontStyle: 'italic' }}>
                "Great spaces begin with great conversations."
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', email: '', phone: '', enquiryType: 'Interiors Project', message: '' });
                }} style={{
                  padding: '12px 28px', background: '#1a1a1a', color: '#fff',
                  border: 'none', cursor: 'pointer', fontSize: '0.62rem',
                  letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'sans-serif',
                }}>
                  Send Another
                </button>
                <Link to="/" style={{
                  padding: '12px 28px', background: 'transparent', color: '#1a1a1a',
                  textDecoration: 'none', border: '1px solid #ddd', fontSize: '0.62rem',
                  letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'sans-serif',
                }}>
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── STUDIO INFO SIDEBAR ── */}
        <div>

          {/* ✅ ADDRESS 1 — Ghaziabad */}
          <div style={{ background: '#fff', padding: '32px',
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
            <p style={{ fontSize: '0.55rem', letterSpacing: '3px', textTransform: 'uppercase',
              color: '#c9a96e', marginBottom: '6px', fontFamily: 'sans-serif' }}>
              Address 1
            </p>
            <p style={{ fontSize: '0.58rem', letterSpacing: '4px', textTransform: 'uppercase',
              color: '#999', marginBottom: '14px', fontFamily: 'sans-serif' }}>
              Visit us 
            </p>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '1.1rem',
              fontWeight: '300', color: '#1a1a1a', margin: '0 0 10px' }}>
              Ghaziabad 
            </h3>
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#666',
              lineHeight: '1.9', margin: '0 0 16px' }}>
              KH-576M, Durga Enclave,<br />
              GB Nagar, Ghaziabad,<br />
              Uttar Pradesh — 201009
            </p>
            <div style={{ marginBottom: '16px', paddingBottom: '16px',
              borderBottom: '1px solid #f5f0ea' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.55rem',
                letterSpacing: '2px', textTransform: 'uppercase',
                color: '#bbb', margin: '0 0 8px' }}>Contact Numbers</p>
              <a href="tel:+917055185315" style={{ textDecoration: 'none', display: 'block', marginBottom: '5px' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#333',
                  margin: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#c9a96e'}
                  onMouseLeave={e => e.target.style.color = '#333'}>
                  📞 +91 70551 85315
                </p>
              </a>
              <a href="tel:+917217310020" style={{ textDecoration: 'none', display: 'block' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#333',
                  margin: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#c9a96e'}
                  onMouseLeave={e => e.target.style.color = '#333'}>
                  📞 +91 72173 10020
                </p>
              </a>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              {[
                { day: 'Mon – Sat', time: '10:00 AM – 7:00 PM' },
                { day: 'Sunday',    time: 'By Appointment Only' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                  paddingBottom: '8px',
                  borderBottom: i === 0 ? '1px solid #f5f0ea' : 'none' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '0.72rem', color: '#999' }}>{row.day}</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '0.72rem', color: '#1a1a1a' }}>{row.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ ADDRESS 2 — Amroha */}
          <div style={{ background: '#fff', padding: '32px',
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
            <p style={{ fontSize: '0.55rem', letterSpacing: '3px', textTransform: 'uppercase',
              color: '#c9a96e', marginBottom: '6px', fontFamily: 'sans-serif' }}>
              Address 2
            </p>
            <p style={{ fontSize: '0.58rem', letterSpacing: '4px', textTransform: 'uppercase',
              color: '#999', marginBottom: '14px', fontFamily: 'sans-serif' }}>
              Visit us 
            </p>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: '1.1rem',
              fontWeight: '300', color: '#1a1a1a', margin: '0 0 10px' }}>
              Amroha
            </h3>
            <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#666',
              lineHeight: '1.9', margin: '0 0 16px' }}>
              Village Agraula Kalan,<br />
              Near Chhoti Masjid, Hasanpur,<br />
              Amroha, Uttar Pradesh — 244241
            </p>
            <div style={{ marginBottom: '16px', paddingBottom: '16px',
              borderBottom: '1px solid #f5f0ea' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.55rem',
                letterSpacing: '2px', textTransform: 'uppercase',
                color: '#bbb', margin: '0 0 8px' }}>Contact Numbers</p>
              <a href="tel:+917055185315" style={{ textDecoration: 'none', display: 'block', marginBottom: '5px' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#333',
                  margin: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#c9a96e'}
                  onMouseLeave={e => e.target.style.color = '#333'}>
                  📞 +91 70551 85315
                </p>
              </a>
              <a href="tel:+917217310020" style={{ textDecoration: 'none', display: 'block' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#333',
                  margin: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#c9a96e'}
                  onMouseLeave={e => e.target.style.color = '#333'}>
                  📞 +91 72173 10020
                </p>
              </a>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              {[
                { day: 'Mon – Sat', time: '10:00 AM – 7:00 PM' },
                { day: 'Sunday',    time: 'By Appointment Only' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
                  paddingBottom: '8px',
                  borderBottom: i === 0 ? '1px solid #f5f0ea' : 'none' }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '0.72rem', color: '#999' }}>{row.day}</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '0.72rem', color: '#1a1a1a' }}>{row.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Quick Contact ── */}
          <div style={{ background: '#fff', padding: '32px',
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
            <p style={{ fontSize: '0.58rem', letterSpacing: '4px', textTransform: 'uppercase',
              color: '#c9a96e', marginBottom: '18px', fontFamily: 'sans-serif' }}>
              Quick Contact
            </p>
            {[
              { icon: '✉', label: 'Email', value: 'truebuildproject@gmail.com', href: 'mailto:truebuildproject@gmail.com' },
              { icon: '☎', label: 'Call',  value: '+91 70551 85315',            href: 'tel:+917055185315' },
              { icon: '☎', label: 'Call',  value: '+91 72173 10020',            href: 'tel:+917217310020' },
            ].map((item, i) => (
              <a key={i} href={item.href} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  display: 'flex', gap: '14px', alignItems: 'center',
                  padding: '14px 0',
                  borderBottom: i < 2 ? '1px solid #f5f0ea' : 'none',
                }}
                  onMouseEnter={e => e.currentTarget.querySelector('p:last-child').style.color = '#c9a96e'}
                  onMouseLeave={e => e.currentTarget.querySelector('p:last-child').style.color = '#333'}>
                  <div style={{ width: '40px', height: '40px', background: '#faf8f5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', color: '#c9a96e', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: 'sans-serif', fontSize: '0.55rem',
                      letterSpacing: '2px', textTransform: 'uppercase',
                      color: '#bbb', margin: '0 0 3px' }}>
                      {item.label}
                    </p>
                    <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem',
                      color: '#333', margin: 0, transition: 'color 0.2s', wordBreak: 'break-all' }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* ── Follow The Studio ── */}
<div style={{ background: '#1a1a1a', padding: '28px 32px' }}>
  <p style={{ fontSize: '0.58rem', letterSpacing: '4px', textTransform: 'uppercase',
    color: '#c9a96e', marginBottom: '18px', fontFamily: 'sans-serif' }}>
    Follow us 
  </p>
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    {[
      { label: 'Instagram', href: 'https://www.instagram.com/truebuild_project?utm_source=qr&igsh=ZmpjM2hteXl5NGxt' },
      { label: 'Facebook',  href: 'https://www.facebook.com/people/TrueBuild-Projects/61583582405966/' },
      { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/truebuild-projects/' },
    ].map((s, i) => (
      <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}>
        <span style={{
          display: 'inline-block', padding: '7px 16px',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif',
          fontSize: '0.6rem', letterSpacing: '2px',
          textTransform: 'uppercase', transition: 'all 0.3s', cursor: 'pointer',
        }}
          onMouseEnter={e => { e.target.style.borderColor='#c9a96e'; e.target.style.color='#c9a96e'; }}
          onMouseLeave={e => { e.target.style.borderColor='rgba(255,255,255,0.15)'; e.target.style.color='rgba(255,255,255,0.6)'; }}>
          {s.label}
        </span>
      </a>
    ))}
  </div>
</div>

        </div>
      </section>

      {/* ── MAP — DONO LOCATIONS ── */}
      <section style={{ boxSizing: 'border-box' }}>

        {/* ✅ MAP 1 — Ghaziabad */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          marginBottom: '2px' }}>
          <div style={{ height: isMobile ? '280px' : '400px' }}>
            <iframe
              title="TrueBuild Projects —At Ghaziabad"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5!2d77.4538!3d28.6692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1b7c0a0a3b5%3A0x7c0b1fc3d8abad9!2sDurga%20Enclave%2C%20GB%20Nagar%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201009!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="100%"
              style={{ border: 'none', display: 'block' }}
              allowFullScreen loading="lazy"
            />
          </div>
          <div style={{
            background: '#f5f0ea',
            padding: isMobile ? '40px 24px' : '60px 60px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            boxSizing: 'border-box',
          }}>
            <p style={{ fontSize: '0.55rem', letterSpacing: '3px', textTransform: 'uppercase',
              color: '#c9a96e', marginBottom: '4px', fontFamily: 'sans-serif' }}>Address 1</p>
            <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
              color: '#c9a96e', marginBottom: '14px', fontFamily: 'sans-serif' }}>Find Us</p>
            <h2 style={{ fontFamily: "'Georgia', serif",
              fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '300',
              color: '#1a1a1a', margin: '0 0 20px' }}>Ghaziabad</h2>
            <div style={{ width: '36px', height: '1px', background: '#c9a96e', marginBottom: '20px' }} />
            <p style={{ fontFamily: "'Georgia', serif", fontSize: '1rem',
              color: '#555', lineHeight: '2', fontWeight: '300', marginBottom: '16px' }}>
              KH-576M, Durga Enclave,<br />
              GB Nagar, Ghaziabad,<br />
              <strong style={{ color: '#1a1a1a' }}>Uttar Pradesh — 201009</strong>
            </p>
            <div style={{ marginBottom: '24px' }}>
              <a href="tel:+917055185315" style={{ textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#555',
                  margin: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#c9a96e'}
                  onMouseLeave={e => e.target.style.color = '#555'}>
                  📞 +91 70551 85315
                </p>
              </a>
              <a href="tel:+917217310020" style={{ textDecoration: 'none', display: 'block' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#555',
                  margin: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#c9a96e'}
                  onMouseLeave={e => e.target.style.color = '#555'}>
                  📞 +91 72173 10020
                </p>
              </a>
            </div>
            <a href="https://maps.google.com/?q=KH-576M+Durga+Enclave+GB+Nagar+Ghaziabad+UP+201009"
              target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '11px 24px', background: '#1a1a1a', color: '#fff',
                fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase',
                fontFamily: 'sans-serif', cursor: 'pointer',
                transition: 'background 0.3s', display: 'inline-block',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
                onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
                Get Directions →
              </div>
            </a>
          </div>
        </div>

        {/* ✅ MAP 2 — Amroha */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
          <div style={{ height: isMobile ? '280px' : '400px' }}>
            <iframe
              title="TrueBuild Projects — Amroha"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5!2d78.4678!3d28.9041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390af5e5e5e5e5e5%3A0x0!2sAgraula+Kalan%2C+Hasanpur%2C+Amroha%2C+Uttar+Pradesh+244241!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="100%"
              style={{ border: 'none', display: 'block' }}
              allowFullScreen loading="lazy"
            />
          </div>
          <div style={{
            background: '#ede8e0',
            padding: isMobile ? '40px 24px' : '60px 60px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            boxSizing: 'border-box',
          }}>
            <p style={{ fontSize: '0.55rem', letterSpacing: '3px', textTransform: 'uppercase',
              color: '#c9a96e', marginBottom: '4px', fontFamily: 'sans-serif' }}>Address 2</p>
            <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
              color: '#c9a96e', marginBottom: '14px', fontFamily: 'sans-serif' }}>Find Us</p>
            <h2 style={{ fontFamily: "'Georgia', serif",
              fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '300',
              color: '#1a1a1a', margin: '0 0 20px' }}>Amroha</h2>
            <div style={{ width: '36px', height: '1px', background: '#c9a96e', marginBottom: '20px' }} />
            <p style={{ fontFamily: "'Georgia', serif", fontSize: '1rem',
              color: '#555', lineHeight: '2', fontWeight: '300', marginBottom: '16px' }}>
              Village Agraula Kalan,<br />
              Near Chhoti Masjid, Hasanpur,<br />
              <strong style={{ color: '#1a1a1a' }}>Amroha, Uttar Pradesh — 244241</strong>
            </p>
            <div style={{ marginBottom: '24px' }}>
              <a href="tel:+917055185315" style={{ textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#555',
                  margin: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#c9a96e'}
                  onMouseLeave={e => e.target.style.color = '#555'}>
                  📞 +91 70551 85315
                </p>
              </a>
              <a href="tel:+917217310020" style={{ textDecoration: 'none', display: 'block' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: '#555',
                  margin: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#c9a96e'}
                  onMouseLeave={e => e.target.style.color = '#555'}>
                  📞 +91 72173 10020
                </p>
              </a>
            </div>
            <a href="https://maps.google.com/?q=Agraula+Kalan,Hasanpur,Amroha,Uttar+Pradesh+244241"
              target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{
                padding: '11px 24px', background: '#1a1a1a', color: '#fff',
                fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase',
                fontFamily: 'sans-serif', cursor: 'pointer',
                transition: 'background 0.3s', display: 'inline-block',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
                onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
                Get Directions →
              </div>
            </a>
          </div>
        </div>

      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{
        background: '#1a1a1a',
        padding: isMobile ? '60px 24px' : '80px 60px',
        textAlign: 'center', boxSizing: 'border-box',
      }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '5px', textTransform: 'uppercase',
          color: '#c9a96e', marginBottom: '14px', fontFamily: 'sans-serif' }}>
          Let's Create Together
        </p>
        <h2 style={{ fontFamily: "'Georgia', serif", color: '#fff',
          fontSize: isMobile ? '1.6rem' : '2rem',
          fontWeight: '300', margin: '0 0 16px', letterSpacing: '1px' }}>
          Ready to start your project?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif',
          fontSize: '0.85rem', lineHeight: '1.9',
          margin: '0 auto 32px', maxWidth: '480px' }}>
          From a single room to an entire residence — every great space begins with a conversation.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/services" style={{
            padding: '13px 36px', background: '#c9a96e', color: '#fff',
            textDecoration: 'none', fontSize: '0.62rem',
            letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'sans-serif',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#b8935a'}
            onMouseLeave={e => e.currentTarget.style.background = '#c9a96e'}>
            Explore Services
          </Link>
          <Link to="/bespoke" style={{
            padding: '13px 36px', background: 'transparent',
            color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.3)', fontSize: '0.62rem',
            letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'sans-serif',
          }}>
            Bespoke Furniture →
          </Link>
        </div>
      </section>

    </main>
  );
};

export default Contact;