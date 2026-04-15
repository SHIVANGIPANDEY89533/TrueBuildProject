import React, { createContext, useContext, useState, useEffect } from 'react';

// ─────────────────────────────────────────────
// DEFAULT IMAGES — every section of the site
// Admin can override any of these
// ─────────────────────────────────────────────
export const DEFAULT_IMAGES = {

  // ── HOME PAGE
  'home.hero.slide1':        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80',
  'home.hero.slide2':        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80',
  'home.hero.slide3':        'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1600&q=80',
  'home.about.image':        'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
  'home.featured.project1':  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  'home.featured.project2':  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
  'home.featured.project3':  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',

  // ── ABOUT PAGE
  'about.hero':              'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
  'about.gauri.portrait':    'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&q=80',
  'about.studio.image':      'https://images.unsplash.com/photo-1600607687939-ce8a6c349c4a?w=800&q=80',
  'about.gallery.image1':    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  'about.gallery.image2':    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
  'about.gallery.image3':    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80',
  'about.gallery.image4':    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',

  // ── SERVICES
  'services.hero':           'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
  'services.architectural':  'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80',
  'services.residential':    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  'services.commercial':     'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  'services.hospitality':    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',

  // ── ARCHITECTURAL PAGE
  'architectural.hero':      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=80',
  'architectural.intro':     'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'architectural.project1':  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
  'architectural.project2':  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  'architectural.project3':  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  'architectural.project4':  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',

  // ── RESIDENTIAL PAGE
  'residential.hero':        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80',
  'residential.intro':       'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
  'residential.project1':    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  'residential.project2':    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
  'residential.project3':    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  'residential.project4':    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  'residential.project5':    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80',
  'residential.project6':    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',

  // ── COMMERCIAL PAGE
  'commercial.hero':         'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
  'commercial.project1':     'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  'commercial.project2':     'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
  'commercial.project3':     'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',

  // ── HOSPITALITY PAGE
  'hospitality.hero':        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80',
  'hospitality.project1':    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  'hospitality.project2':    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  'hospitality.project3':    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',

  // ── BESPOKE PAGE
  'bespoke.hero':            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80',
  'bespoke.craft1':          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80',
  'bespoke.craft2':          'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80',
  'bespoke.craft3':          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  'bespoke.craft4':          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',

  // ── WALKTHROUGHS
  'walkthroughs.hero':       'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=1600&q=80',
  'walkthroughs.thumb1':     'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800&q=80',
  'walkthroughs.thumb2':     'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  'walkthroughs.thumb3':     'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
  'walkthroughs.thumb4':     'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  'walkthroughs.thumb5':     'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',

  // ── SHOP PAGE
  'shop.hero':               'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80',
  'shop.banner1':            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
  'shop.banner2':            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',

  // ── CONTACT PAGE
  'contact.hero':            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
};

// ─────────────────────────────────────────────
// SECTION LABELS for Admin UI grouping
// ─────────────────────────────────────────────
export const IMAGE_SECTIONS = [
  { key: 'home',           label: '🏠 Home Page'      },
  { key: 'about',          label: '👤 About Page'      },
  { key: 'services',       label: '🛠️ Services Hub'   },
  { key: 'architectural',  label: '🏛️ Architectural'  },
  { key: 'residential',    label: '🏡 Residential'    },
  { key: 'commercial',     label: '🏢 Commercial'     },
  { key: 'hospitality',    label: '🏨 Hospitality'    },
  { key: 'bespoke',        label: '🪑 Bespoke'        },
  { key: 'walkthroughs',   label: '⬡ Walkthroughs'   },
  { key: 'shop',           label: '🛍️ Shop'           },
  { key: 'contact',        label: '✉ Contact'         },
];

// ─────────────────────────────────────────────
// FRIENDLY LABEL MAP
// ─────────────────────────────────────────────
export const IMAGE_LABELS = {
  'home.hero.slide1':        'Hero Slide 1',
  'home.hero.slide2':        'Hero Slide 2',
  'home.hero.slide3':        'Hero Slide 3',
  'home.about.image':        'About Section Image',
  'home.featured.project1':  'Featured Project 1',
  'home.featured.project2':  'Featured Project 2',
  'home.featured.project3':  'Featured Project 3',
  'about.hero':              'Hero Banner',
  'about.gauri.portrait':    'Gauri Khan Portrait',
  'about.studio.image':      'Studio Image',
  'about.gallery.image1':    'Gallery Image 1',
  'about.gallery.image2':    'Gallery Image 2',
  'about.gallery.image3':    'Gallery Image 3',
  'about.gallery.image4':    'Gallery Image 4',
  'services.hero':           'Hero Banner',
  'services.architectural':  'Architectural Card',
  'services.residential':    'Residential Card',
  'services.commercial':     'Commercial Card',
  'services.hospitality':    'Hospitality Card',
  'architectural.hero':      'Hero Banner',
  'architectural.intro':     'Intro Section Image',
  'architectural.project1':  'Project 1',
  'architectural.project2':  'Project 2',
  'architectural.project3':  'Project 3',
  'architectural.project4':  'Project 4',
  'residential.hero':        'Hero Banner',
  'residential.intro':       'Intro Section Image',
  'residential.project1':    'Project 1',
  'residential.project2':    'Project 2',
  'residential.project3':    'Project 3',
  'residential.project4':    'Project 4',
  'residential.project5':    'Project 5',
  'residential.project6':    'Project 6',
  'commercial.hero':         'Hero Banner',
  'commercial.project1':     'Project 1',
  'commercial.project2':     'Project 2',
  'commercial.project3':     'Project 3',
  'hospitality.hero':        'Hero Banner',
  'hospitality.project1':    'Project 1',
  'hospitality.project2':    'Project 2',
  'hospitality.project3':    'Project 3',
  'bespoke.hero':            'Hero Banner',
  'bespoke.craft1':          'Craft Image 1',
  'bespoke.craft2':          'Craft Image 2',
  'bespoke.craft3':          'Craft Image 3',
  'bespoke.craft4':          'Craft Image 4',
  'walkthroughs.hero':       'Hero Banner',
  'walkthroughs.thumb1':     'Lodha Trump Tower Thumb',
  'walkthroughs.thumb2':     'Karan Johar Thumb',
  'walkthroughs.thumb3':     'Manish Malhotra Thumb',
  'walkthroughs.thumb4':     'Manish Store Thumb',
  'walkthroughs.thumb5':     'Art Cafe Thumb',
  'shop.hero':               'Hero Banner',
  'shop.banner1':            'Promo Banner 1',
  'shop.banner2':            'Promo Banner 2',
  'contact.hero':            'Hero Banner',
};

// ─────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────
const SiteImagesContext = createContext();

export const SiteImagesProvider = ({ children }) => {
  const [images, setImages] = useState(() => {
    try {
      const saved = localStorage.getItem('gkd_site_images');
      return saved ? { ...DEFAULT_IMAGES, ...JSON.parse(saved) } : { ...DEFAULT_IMAGES };
    } catch {
      return { ...DEFAULT_IMAGES };
    }
  });

  // Update a single image key
  const updateImage = (key, url) => {
    setImages(prev => {
      const updated = { ...prev, [key]: url };
      // Save only overrides (not defaults) to localStorage
      const overrides = {};
      Object.keys(updated).forEach(k => {
        if (updated[k] !== DEFAULT_IMAGES[k]) overrides[k] = updated[k];
      });
      localStorage.setItem('gkd_site_images', JSON.stringify(overrides));
      return updated;
    });
  };

  // Reset a single image to default
  const resetImage = (key) => {
    setImages(prev => {
      const updated = { ...prev, [key]: DEFAULT_IMAGES[key] };
      const overrides = {};
      Object.keys(updated).forEach(k => {
        if (updated[k] !== DEFAULT_IMAGES[k]) overrides[k] = updated[k];
      });
      localStorage.setItem('gkd_site_images', JSON.stringify(overrides));
      return updated;
    });
  };

  // Reset ALL images to defaults
  const resetAll = () => {
    setImages({ ...DEFAULT_IMAGES });
    localStorage.removeItem('gkd_site_images');
  };

  // Count overridden images
  const overrideCount = Object.keys(images).filter(
    k => images[k] !== DEFAULT_IMAGES[k]
  ).length;

  return (
    <SiteImagesContext.Provider value={{ images, updateImage, resetImage, resetAll, overrideCount }}>
      {children}
    </SiteImagesContext.Provider>
  );
};

export const useSiteImages = () => useContext(SiteImagesContext);
export default SiteImagesContext;