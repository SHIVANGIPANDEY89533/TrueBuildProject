import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { ref, onValue, set, remove } from 'firebase/database';

// ── Asset Imports ─────────────────────────────────────────────────────────────
import img1  from '../assets/images/img1.jpeg';
import img2  from '../assets/images/img2.jpeg';
import img3  from '../assets/images/img3.jpeg';
import img4  from '../assets/images/img4.jpeg';
import img5  from '../assets/images/img5.jpeg';
import img6  from '../assets/images/img6.jpeg';
import img7  from '../assets/images/img7.jpeg';
import img8  from '../assets/images/img8.jpeg';
import img9  from '../assets/images/img9.jpeg';
import img10 from '../assets/images/img10.jpeg';
import img11 from '../assets/images/img11.jpeg';
import img12 from '../assets/images/img12.jpeg';
import img13 from '../assets/images/img13.jpeg';
import img14 from '../assets/images/img 14.jpeg';
import img15 from '../assets/images/img15.jpeg';

// ── DEFAULT IMAGES ─────────────────────────────────────────────────────────────
// Keys are named exactly as used in page components via images['key'] or useSiteImages()
export const DEFAULT_IMAGES = {

  // ── HOME PAGE ──────────────────────────────────────────────────────────────
  // Used in: Home.jsx
  'home.hero.slide1':       img9,   // Hero fullscreen background (Section 1)
  'home.hero.slide2':       img5,   // Full-width image strip (Section 3)
  'home.hero.slide3':       img6,   // Signature/CTA background (Section 8)

  // Used in: constants/data.js → SERVICES array → rendered by <ServiceCard> in Home.jsx
  'home.services.card1':    img2,   // Construction & Foundation card
  'home.services.card2':    img3,   // MEP Services card
  'home.services.card3':    img4,   // Finishing & Aesthetics card
  'home.services.card4':    img10,  // Interior Design card

  // Used in: constants/data.js → PROJECTS array → "Our Work" section in Home.jsx
  'home.projects.card1':    img7,   // Modern Living (Residential)
  'home.projects.card2':    img8,   // Modular Kitchen (Kitchen)
  'home.projects.card3':    img11,  // Villa Build (Construction)
  'home.projects.card4':    img12,  // Commercial Site (Commercial)

  // ── ABOUT PAGE ────────────────────────────────────────────────────────────
  // Used in: About.jsx → Navigation cards section
  'about.card.overview':    img1,   // Overview nav card thumbnail
  'about.card.gallery':     img4,   // Gallery nav card thumbnail

  // ── OVERVIEW PAGE ─────────────────────────────────────────────────────────
  // Used in: Overview.jsx
  'overview.hero':          img2,   // Hero banner at top of Overview page
  'overview.cta':           img8,   // CTA/call-to-action background (Section 5)

  // ── GALLERY PAGE ──────────────────────────────────────────────────────────
  // Used in: Gallery.jsx
  'gallery.hero':           img10,  // Gallery hero banner
  'gallery.item1':          img1,   // Interiors — Living Room, Juhu Residence
  'gallery.item2':          img4,   // Furniture — Bespoke Sofa Collection
  'gallery.item3':          img13,  // Decor — Curated Artefacts
  'gallery.item4':          img5,   // Interiors — Master Bedroom, Bandra
  'gallery.item5':          img12,  // Studio — Studio Flagship, Raghuvanshi
  'gallery.item6':          img6,   // Furniture — Custom Dining Table
  'gallery.item7':          img7,   // Studio — Juhu Showroom, Main Hall
  'gallery.item8':          img14,  // Decor — Art Wall, Private Residence
  'gallery.item9':          img9,   // Interiors — Home Office, Khar
  'gallery.item10':         img3,   // Furniture — Statement Chair, Gold Edition
  'gallery.item11':         img11,  // Studio — Design Consultation Room
  'gallery.item12':         img15,  // Decor — Signature Lamp Collection

  // ── SERVICES PAGE ─────────────────────────────────────────────────────────
  // Used in: Services.jsx
  'services.hero':          img8,   // Services page hero banner

  // Fallback images for dynamically loaded service cards (from Firebase/ServicesContext)
  // These appear when a service card added via admin has no image uploaded yet
  'services.card.construction': img2,  // Construction & Foundation fallback
  'services.card.mep':          img3,  // MEP Services fallback
  'services.card.finishing':    img4,  // Finishing & Aesthetics fallback
  'services.card.interior':     img10, // Interior Design fallback

  // ── CONTACT PAGE ──────────────────────────────────────────────────────────
  // Used in: Contact.jsx → Hero section (currently hardcoded, moved here for admin control)
  'contact.hero':           img6,   // Contact page hero banner

  // ── BESPOKE PAGE ──────────────────────────────────────────────────────────
  // Used in: Bespoke.jsx (if images context is used there)
  'bespoke.hero':           img13,  // Bespoke page hero
  'bespoke.craft1':         img4,   // Craft showcase image 1
  'bespoke.craft2':         img5,   // Craft showcase image 2
  'bespoke.craft3':         img6,   // Craft showcase image 3
  'bespoke.craft4':         img7,   // Craft showcase image 4

  // ── SHOP PAGE ─────────────────────────────────────────────────────────────
  // Used in: Shop.jsx
  'shop.hero':              img13,  // Shop page hero banner
  'shop.banner1':           img6,   // Promo banner 1
  'shop.banner2':           img7,   // Promo banner 2
};

// ── IMAGE SECTIONS (sidebar nav in Image Manager) ─────────────────────────────
export const IMAGE_SECTIONS = [
  { key: 'home',     label: '🏠 Home Page'      },
  { key: 'about',    label: '👤 About Page'      },
  { key: 'overview', label: '📖 Overview Page'   },
  { key: 'gallery',  label: '🖼️ Gallery Page'    },
  { key: 'services', label: '🛠️ Services Page'   },
  { key: 'contact',  label: '✉️ Contact Page'    },
  { key: 'bespoke',  label: '🪑 Bespoke Page'    },
  { key: 'shop',     label: '🛍️ Shop Page'       },
];

// ── HUMAN-READABLE LABELS (shown in Image Manager cards) ──────────────────────
export const IMAGE_LABELS = {

  // HOME
  'home.hero.slide1':       '🏠 Hero Background (img9)',
  'home.hero.slide2':       '📷 Full-Width Strip Image (img5)',
  'home.hero.slide3':       '✨ Signature / CTA Background (img6)',
  'home.services.card1':    '🔨 Services Card — Construction & Foundation (img2)',
  'home.services.card2':    '⚡ Services Card — MEP Services (img3)',
  'home.services.card3':    '🎨 Services Card — Finishing & Aesthetics (img4)',
  'home.services.card4':    '🛋️ Services Card — Interior Design (img10)',
  'home.projects.card1':    '🏡 Our Work — Modern Living, Residential (img7)',
  'home.projects.card2':    '🍳 Our Work — Modular Kitchen (img8)',
  'home.projects.card3':    '🏗️ Our Work — Villa Build, Construction (img11)',
  'home.projects.card4':    '🏢 Our Work — Commercial Site (img12)',

  // ABOUT
  'about.card.overview':    '📖 About → Overview Card Thumbnail (img1)',
  'about.card.gallery':     '🖼️ About → Gallery Card Thumbnail (img4)',

  // OVERVIEW
  'overview.hero':          '🏔️ Overview Hero Banner (img2)',
  'overview.cta':           '📞 Overview CTA Section Background (img8)',

  // GALLERY
  'gallery.hero':           '🖼️ Gallery Hero Banner (img10)',
  'gallery.item1':          'Interiors — Living Room, Juhu Residence (img1)',
  'gallery.item2':          'Furniture — Bespoke Sofa Collection (img4)',
  'gallery.item3':          'Decor — Curated Artefacts (img13)',
  'gallery.item4':          'Interiors — Master Bedroom, Bandra (img5)',
  'gallery.item5':          'Studio — Studio Flagship, Raghuvanshi (img12)',
  'gallery.item6':          'Furniture — Custom Dining Table (img6)',
  'gallery.item7':          'Studio — Juhu Showroom, Main Hall (img7)',
  'gallery.item8':          'Decor — Art Wall, Private Residence (img14)',
  'gallery.item9':          'Interiors — Home Office, Khar (img9)',
  'gallery.item10':         'Furniture — Statement Chair, Gold Edition (img3)',
  'gallery.item11':         'Studio — Design Consultation Room (img11)',
  'gallery.item12':         'Decor — Signature Lamp Collection (img15)',

  // SERVICES
  'services.hero':              '🏛️ Services Hero Banner (img8)',
  'services.card.construction': '🔨 Service Card Fallback — Construction (img2)',
  'services.card.mep':          '⚡ Service Card Fallback — MEP (img3)',
  'services.card.finishing':    '🎨 Service Card Fallback — Finishing (img4)',
  'services.card.interior':     '🛋️ Service Card Fallback — Interior Design (img10)',

  // CONTACT
  'contact.hero':           '✉️ Contact Hero Banner (img6)',

  // BESPOKE
  'bespoke.hero':           '🪑 Bespoke Hero Banner (img13)',
  'bespoke.craft1':         'Bespoke Craft Image 1 (img4)',
  'bespoke.craft2':         'Bespoke Craft Image 2 (img5)',
  'bespoke.craft3':         'Bespoke Craft Image 3 (img6)',
  'bespoke.craft4':         'Bespoke Craft Image 4 (img7)',

  // SHOP
  'shop.hero':              '🛍️ Shop Hero Banner (img13)',
  'shop.banner1':           'Shop Promo Banner 1 (img6)',
  'shop.banner2':           'Shop Promo Banner 2 (img7)',
};

// ── Firebase key helpers (dots → underscores for Firebase paths) ───────────────
const toFirebaseKey   = (key) => key.replace(/\./g, '_');
const fromFirebaseKey = (key) => key.replace(/_/g, '.');

// ── Context ───────────────────────────────────────────────────────────────────
const SiteImagesContext = createContext();

export const SiteImagesProvider = ({ children }) => {
  const [images,    setImages]    = useState({ ...DEFAULT_IMAGES });
  const [extraKeys, setExtraKeys] = useState([]);
  const [loading,   setLoading]   = useState(true);

  // ── Load from Firebase ──────────────────────────────────────────────────────
  useEffect(() => {
    let overridesDone = false;
    let extraDone     = false;

    const checkDone = () => {
      if (overridesDone && extraDone) setLoading(false);
    };

    // Overrides (admin-changed images)
    const overridesRef = ref(db, 'site_images/overrides');
    const unsubOverrides = onValue(overridesRef, (snapshot) => {
      const raw = snapshot.val() || {};
      const restored = {};
      Object.entries(raw).forEach(([fbKey, url]) => {
        restored[fromFirebaseKey(fbKey)] = url;
      });
      setImages({ ...DEFAULT_IMAGES, ...restored });
      overridesDone = true;
      checkDone();
    });

    // Extra admin-added image keys
    const extraRef = ref(db, 'site_images/extraKeys');
    const unsubExtra = onValue(extraRef, (snapshot) => {
      const raw = snapshot.val();
      setExtraKeys(raw ? Object.values(raw) : []);
      extraDone = true;
      checkDone();
    });

    return () => {
      unsubOverrides();
      unsubExtra();
    };
  }, []);

  // ── Update a single image ───────────────────────────────────────────────────
  const updateImage = (key, url) => {
    const fbKey = toFirebaseKey(key);
    if (url !== DEFAULT_IMAGES[key]) {
      set(ref(db, `site_images/overrides/${fbKey}`), url);
    } else {
      remove(ref(db, `site_images/overrides/${fbKey}`));
    }
  };

  // ── Add a new custom image key ──────────────────────────────────────────────
  const addImage = (key, url, label = '') => {
    if (!key || !url) return;
    const fbKey = toFirebaseKey(key);
    set(ref(db, `site_images/overrides/${fbKey}`), url);
    set(ref(db, `site_images/extraKeys/${fbKey}`), { key, label: label || key });
  };

  // ── Remove an admin-added image ─────────────────────────────────────────────
  const removeExtraImage = (key) => {
    const fbKey = toFirebaseKey(key);
    remove(ref(db, `site_images/overrides/${fbKey}`));
    remove(ref(db, `site_images/extraKeys/${fbKey}`));
  };

  // ── Reset single image to default ──────────────────────────────────────────
  const resetImage = (key) => {
    remove(ref(db, `site_images/overrides/${toFirebaseKey(key)}`));
  };

  // ── Reset ALL images to defaults ────────────────────────────────────────────
  const resetAll = () => {
    set(ref(db, 'site_images/overrides'), null);
    set(ref(db, 'site_images/extraKeys'), null);
  };

  // ── Get all images for a section (default + admin-added) ───────────────────
  const getSectionImages = (sectionKey) => {
    const defaultKeys = Object.keys(DEFAULT_IMAGES).filter(k =>
      k.startsWith(sectionKey + '.')
    );
    const extraSectionKeys = extraKeys
      .filter(e => e.key.startsWith(sectionKey + '.'))
      .map(e => e.key);
    const allKeys = [...new Set([...defaultKeys, ...extraSectionKeys])];
    return allKeys.map(key => ({
      key,
      url:   images[key],
      label: IMAGE_LABELS[key] || key,
    }));
  };

  const overrideCount = Object.keys(images).filter(
    k => images[k] !== DEFAULT_IMAGES[k]
  ).length;

  // ── Loading spinner ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        background: '#faf8f5', zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '42px', height: '42px',
            border: '2px solid #e8e3db',
            borderTop: '2px solid #c9a96e',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{
            fontFamily: 'sans-serif', fontSize: '0.6rem',
            letterSpacing: '3px', textTransform: 'uppercase', color: '#bbb',
            margin: 0,
          }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <SiteImagesContext.Provider value={{
      images,
      updateImage,
      resetImage,
      resetAll,
      overrideCount,
      addImage,
      removeExtraImage,
      extraKeys,
      getSectionImages,
    }}>
      {children}
    </SiteImagesContext.Provider>
  );
};

export const useSiteImages = () => useContext(SiteImagesContext);
export default SiteImagesContext;