import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { ref, onValue, set } from 'firebase/database';

export const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};

// ═══ DEFAULT CONTENT ═══
const DEFAULT_CONTENT = {
  // Hero & Brand
  'home.title': 'TrueBuild Projects',
  'home.started.year': '2018',
  'home.story.title': 'Our Vision',
  'home.story.text': 'At TrueBuild Projects, we handle the complexities of construction so you don\'t have to. From the first shovel in the ground to the final coat of paint, we deliver quality, integrity, and precision.\n\nWe manage every phase of the project, ensuring seamless transitions between structural work and interior finishing. One team, one vision, zero stress.',
  
  // About
  'about.title.1': 'Two engineers.',
  'about.title.2': 'One vision.',
  'about.subtitle': 'Precision in every detail',
  
  // Services
  'services.service1.title': 'Construction Services',
  'services.service1.subtitle': 'Complete Build',
  'services.service1.desc': 'From groundbreaking to final finish — structurally sound, beautifully executed buildings across all residential and commercial project types.',
  'services.service1.tag': 'Structural',
  'services.service1.point1': 'Excavation',
  'services.service1.point2': 'Structure — Foundation to Roof',
  'services.service1.point3': 'Masonry Work',
  'services.service1.point4': 'Plaster Work',
  
  'services.service2.title': 'MEP Services',
  'services.service2.subtitle': 'Veins & Nerves',
  'services.service2.desc': 'We integrate complete electrical and plumbing systems with a focus on safety and long-term durability — wiring, panels, smart home, leak-proof piping, and drainage.',
  'services.service2.tag': 'Electrical & Plumbing',
  'services.service2.point1': 'Complete Electrical Wiring',
  'services.service2.point2': 'Smart Home Integration',
  'services.service2.point3': 'Plumbing & Drainage Systems',
  
  'services.service3.title': 'Finishing & Aesthetics',
  'services.service3.subtitle': 'Where House Meets Home',
  'services.service3.desc': 'Premium textures, weather-proof coatings, marble & granite flooring, and modern POP false ceilings — every finish is a statement of craftsmanship.',
  'services.service3.tag': 'Finishing',
  'services.service3.point1': 'Interior & Exterior Painting',
  'services.service3.point2': 'Marble, Granite & Tile Flooring',
  'services.service3.point3': 'False Ceiling & POP Work',
  
  'services.service4.title': 'Interior Design & Furniture',
  'services.service4.subtitle': 'Made to Measure',
  'services.service4.desc': 'Full space planning, 3D visualization, modular kitchens, custom wardrobes, and bespoke handcrafted furniture — designed exclusively for your space.',
  'services.service4.tag': 'Interiors',
  'services.service4.point1': 'Living Space',
  'services.service4.point2': 'Luxury Bedroom',
  'services.service4.point3': 'Modern Washroom',
  'services.service4.point4': 'Wall Panelling',
  'services.service4.point5': 'False Ceiling',
  
  // Contact
  'contact.email': 'truebuildproject@gmail.com',
  'contact.phone': '+91 9453577660',
  'contact.address': 'Village Agraula Kalan, Near Chhoti Masjid, Hasanpur, Amroha — 244241, UP',
  
  // Social
  'social.instagram': 'https://instagram.com',
  'social.facebook': 'https://facebook.com',
  'social.linkedin': 'https://linkedin.com',
};

// ═══ CONTENT PROVIDER ═══
export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [overrideCount, setOverrideCount] = useState(0);

  useEffect(() => {
    const contentRef = ref(db, 'site_content');
    const unsubscribe = onValue(contentRef, (snapshot) => {
      if (snapshot.exists()) {
        const firebaseContent = snapshot.val();
        setContent(prev => ({ ...prev, ...firebaseContent }));
        const overrides = Object.keys(firebaseContent).length;
        setOverrideCount(overrides);
      }
      setLoading(false);
    }, (error) => {
      console.warn('⚠️ Failed to load content from Firebase:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateContent = async (key, value) => {
    try {
      const contentRef = ref(db, `site_content/${key}`);
      await set(contentRef, value);
      setContent(prev => ({ ...prev, [key]: value }));
    } catch (error) {
      console.error('❌ Failed to update content:', error);
      throw error;
    }
  };

  const resetToDefault = async (key) => {
    try {
      const contentRef = ref(db, `site_content/${key}`);
      await set(contentRef, null);
      setContent(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    } catch (error) {
      console.error('❌ Failed to reset content:', error);
      throw error;
    }
  };

  const resetAll = async () => {
    try {
      const contentRef = ref(db, 'site_content');
      await set(contentRef, {});
      setContent(DEFAULT_CONTENT);
      setOverrideCount(0);
    } catch (error) {
      console.error('❌ Failed to reset all content:', error);
      throw error;
    }
  };

  const value = {
    content,
    loading,
    overrideCount,
    updateContent,
    resetToDefault,
    resetAll,
    DEFAULT_CONTENT,
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
