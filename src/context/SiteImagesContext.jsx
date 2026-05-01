import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { ref, onValue, set, remove } from 'firebase/database';

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

export const DEFAULT_IMAGES = {
  'home.hero.slide1':        img9,
  'home.hero.slide2':        img5,
  'home.hero.slide3':        img6,
  'home.about.image':        img7,
  'home.featured.project1':  img1,
  'home.featured.project2':  img2,
  'home.featured.project3':  img3,
  'about.hero':              img10,
  'about.gauri.portrait':    img11,
  'about.studio.image':      img12,
  'about.gallery.image1':    img1,
  'about.gallery.image2':    img2,
  'about.gallery.image3':    img3,
  'about.gallery.image4':    img4,
  'services.hero':           img8,
  'services.architectural':  img4,
  'services.residential':    img9,
  'services.commercial':     img10,
  'services.hospitality':    img11,
  'architectural.hero':      img4,
  'architectural.intro':     img5,
  'architectural.project1':  img1,
  'architectural.project2':  img2,
  'architectural.project3':  img3,
  'architectural.project4':  img6,
  'residential.hero':        img9,
  'residential.intro':       img7,
  'residential.project1':    img1,
  'residential.project2':    img2,
  'residential.project3':    img3,
  'residential.project4':    img4,
  'residential.project5':    img5,
  'residential.project6':    img6,
  'commercial.hero':         img10,
  'commercial.project1':     img8,
  'commercial.project2':     img11,
  'commercial.project3':     img12,
  'hospitality.hero':        img11,
  'hospitality.project1':    img1,
  'hospitality.project2':    img2,
  'hospitality.project3':    img3,
  'bespoke.hero':            img13,
  'bespoke.craft1':          img4,
  'bespoke.craft2':          img5,
  'bespoke.craft3':          img6,
  'bespoke.craft4':          img7,
  'walkthroughs.hero':       img8,
  'walkthroughs.thumb1':     img1,
  'walkthroughs.thumb2':     img2,
  'walkthroughs.thumb3':     img3,
  'walkthroughs.thumb4':     img4,
  'walkthroughs.thumb5':     img5,
  'shop.hero':               img13,
  'shop.banner1':            img6,
  'shop.banner2':            img7,
  'contact.hero':            img8,
};

export const IMAGE_SECTIONS = [
  { key: 'home',          label: '🏠 Home Page'     },
  { key: 'about',         label: '👤 About Page'     },
  { key: 'services',      label: '🛠️ Services Hub'  },
  { key: 'architectural', label: '🏛️ Architectural' },
  { key: 'residential',   label: '🏡 Residential'   },
  { key: 'commercial',    label: '🏢 Commercial'    },
  { key: 'hospitality',   label: '🏨 Hospitality'   },
  { key: 'bespoke',       label: '🪑 Bespoke'       },
  { key: 'walkthroughs',  label: '⬡ Walkthroughs'  },
  { key: 'shop',          label: '🛍️ Shop'          },
  { key: 'contact',       label: '✉ Contact'        },
];

export const IMAGE_LABELS = {
  'home.hero.slide1':        'Hero Background (img9)',
  'home.hero.slide2':        'Full Width Section (img5)',
  'home.hero.slide3':        'Signature Block (img6)',
  'home.about.image':        'About Section (img7)',
  'home.featured.project1':  'Featured Project 1 (img1)',
  'home.featured.project2':  'Featured Project 2 (img2)',
  'home.featured.project3':  'Featured Project 3 (img3)',
  'about.hero':              'Hero Banner (img10)',
  'about.gauri.portrait':    'Portrait (img11)',
  'about.studio.image':      'Studio Image (img12)',
  'about.gallery.image1':    'Gallery Image 1 (img1)',
  'about.gallery.image2':    'Gallery Image 2 (img2)',
  'about.gallery.image3':    'Gallery Image 3 (img3)',
  'about.gallery.image4':    'Gallery Image 4 (img4)',
  'services.hero':           'Hero Banner (img8)',
  'services.architectural':  'Architectural Card (img4)',
  'services.residential':    'Residential Card (img9)',
  'services.commercial':     'Commercial Card (img10)',
  'services.hospitality':    'Hospitality Card (img11)',
  'architectural.hero':      'Hero Banner (img4)',
  'architectural.intro':     'Intro Image (img5)',
  'architectural.project1':  'Project 1 (img1)',
  'architectural.project2':  'Project 2 (img2)',
  'architectural.project3':  'Project 3 (img3)',
  'architectural.project4':  'Project 4 (img6)',
  'residential.hero':        'Hero Banner (img9)',
  'residential.intro':       'Intro Image (img7)',
  'residential.project1':    'Project 1 (img1)',
  'residential.project2':    'Project 2 (img2)',
  'residential.project3':    'Project 3 (img3)',
  'residential.project4':    'Project 4 (img4)',
  'residential.project5':    'Project 5 (img5)',
  'residential.project6':    'Project 6 (img6)',
  'commercial.hero':         'Hero Banner (img10)',
  'commercial.project1':     'Project 1 (img8)',
  'commercial.project2':     'Project 2 (img11)',
  'commercial.project3':     'Project 3 (img12)',
  'hospitality.hero':        'Hero Banner (img11)',
  'hospitality.project1':    'Project 1 (img1)',
  'hospitality.project2':    'Project 2 (img2)',
  'hospitality.project3':    'Project 3 (img3)',
  'bespoke.hero':            'Hero Banner (img13)',
  'bespoke.craft1':          'Craft Image 1 (img4)',
  'bespoke.craft2':          'Craft Image 2 (img5)',
  'bespoke.craft3':          'Craft Image 3 (img6)',
  'bespoke.craft4':          'Craft Image 4 (img7)',
  'walkthroughs.hero':       'Hero Banner (img8)',
  'walkthroughs.thumb1':     'Thumbnail 1 (img1)',
  'walkthroughs.thumb2':     'Thumbnail 2 (img2)',
  'walkthroughs.thumb3':     'Thumbnail 3 (img3)',
  'walkthroughs.thumb4':     'Thumbnail 4 (img4)',
  'walkthroughs.thumb5':     'Thumbnail 5 (img5)',
  'shop.hero':               'Hero Banner (img13)',
  'shop.banner1':            'Promo Banner 1 (img6)',
  'shop.banner2':            'Promo Banner 2 (img7)',
  'contact.hero':            'Hero Banner (img8)',
};

// ✅ Firebase key safe format — dots ko underscore mein convert karo
const toFirebaseKey = (key) => key.replace(/\./g, '_');
const fromFirebaseKey = (key) => key.replace(/_/g, '.');

const SiteImagesContext = createContext();

export const SiteImagesProvider = ({ children }) => {
  const [images,   setImages]   = useState({ ...DEFAULT_IMAGES });
  const [extraKeys, setExtraKeys] = useState([]);
  const [loading,  setLoading]  = useState(true); // ✅ jab tak Firebase se data aaye

  // ─────────────────────────────────────────────
  // ✅ Firebase se REAL-TIME data load karo
  // ─────────────────────────────────────────────
  useEffect(() => {
    let overridesDone = false;
    let extraDone     = false;

    const checkDone = () => {
      if (overridesDone && extraDone) setLoading(false);
    };

    // Overrides (changed images)
    const overridesRef = ref(db, 'site_images/overrides');
    const unsubOverrides = onValue(overridesRef, (snapshot) => {
      const raw = snapshot.val() || {};
      // Firebase keys (underscore) → original keys (dots)
      const restored = {};
      Object.entries(raw).forEach(([fbKey, url]) => {
        restored[fromFirebaseKey(fbKey)] = url;
      });
      setImages({ ...DEFAULT_IMAGES, ...restored });
      overridesDone = true;
      checkDone();
    });

    // Extra (admin-added) keys
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

  // ─────────────────────────────────────────────
  // ✅ Image UPDATE — Firebase mein save karo
  // ─────────────────────────────────────────────
  const updateImage = (key, url) => {
    const fbKey = toFirebaseKey(key);
    if (url !== DEFAULT_IMAGES[key]) {
      set(ref(db, `site_images/overrides/${fbKey}`), url);
    } else {
      remove(ref(db, `site_images/overrides/${fbKey}`));
    }
  };

  // ─────────────────────────────────────────────
  // ✅ Naya image ADD karo
  // ─────────────────────────────────────────────
  const addImage = (key, url, label = '') => {
    if (!key || !url) return;
    const fbKey = toFirebaseKey(key);
    set(ref(db, `site_images/overrides/${fbKey}`), url);
    set(ref(db, `site_images/extraKeys/${fbKey}`), {
      key,
      label: label || key,
    });
  };

  // ─────────────────────────────────────────────
  // ✅ Extra image DELETE karo
  // ─────────────────────────────────────────────
  const removeExtraImage = (key) => {
    const fbKey = toFirebaseKey(key);
    remove(ref(db, `site_images/overrides/${fbKey}`));
    remove(ref(db, `site_images/extraKeys/${fbKey}`));
  };

  // ─────────────────────────────────────────────
  // ✅ Single image RESET — default par wapas
  // ─────────────────────────────────────────────
  const resetImage = (key) => {
    const fbKey = toFirebaseKey(key);
    remove(ref(db, `site_images/overrides/${fbKey}`));
  };

  // ─────────────────────────────────────────────
  // ✅ Sab RESET karo
  // ─────────────────────────────────────────────
  const resetAll = () => {
    set(ref(db, 'site_images/overrides'), null);
    set(ref(db, 'site_images/extraKeys'), null);
  };

  // ─────────────────────────────────────────────
  // ✅ Section ki saari images (default + admin added)
  // ─────────────────────────────────────────────
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

  // ─────────────────────────────────────────────
  // ✅ Loading screen — Firebase se data aane tak
  // ─────────────────────────────────────────────
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