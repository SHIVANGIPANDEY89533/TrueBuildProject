import React, { createContext, useContext, useState } from 'react';

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

  const [extraKeys, setExtraKeys] = useState(() => {
    try {
      const saved = localStorage.getItem('gkd_extra_image_keys');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const saveOverrides = (updated) => {
    const overrides = {};
    Object.keys(updated).forEach(k => {
      if (updated[k] !== DEFAULT_IMAGES[k]) overrides[k] = updated[k];
    });
    localStorage.setItem('gkd_site_images', JSON.stringify(overrides));
  };

  const updateImage = (key, url) => {
    setImages(prev => {
      const updated = { ...prev, [key]: url };
      saveOverrides(updated);
      return updated;
    });
  };

  const addImage = (key, url, label = '') => {
    if (!key || !url) return;
    setImages(prev => {
      const updated = { ...prev, [key]: url };
      saveOverrides(updated);
      return updated;
    });
    setExtraKeys(prev => {
      const newExtra = prev.find(e => e.key === key)
        ? prev.map(e => e.key === key ? { key, label: label || key } : e)
        : [...prev, { key, label: label || key }];
      localStorage.setItem('gkd_extra_image_keys', JSON.stringify(newExtra));
      return newExtra;
    });
  };

  const removeExtraImage = (key) => {
    setImages(prev => {
      const updated = { ...prev };
      delete updated[key];
      saveOverrides(updated);
      return updated;
    });
    setExtraKeys(prev => {
      const newExtra = prev.filter(e => e.key !== key);
      localStorage.setItem('gkd_extra_image_keys', JSON.stringify(newExtra));
      return newExtra;
    });
  };

  const resetImage = (key) => {
    setImages(prev => {
      const updated = { ...prev, [key]: DEFAULT_IMAGES[key] };
      saveOverrides(updated);
      return updated;
    });
  };

  const resetAll = () => {
    setImages({ ...DEFAULT_IMAGES });
    localStorage.removeItem('gkd_site_images');
  };

  // ✅ KEY FUNCTION — section ki saari images (default + admin added)
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
      getSectionImages, // ✅ NEW
    }}>
      {children}
    </SiteImagesContext.Provider>
  );
};

export const useSiteImages = () => useContext(SiteImagesContext);
export default SiteImagesContext;