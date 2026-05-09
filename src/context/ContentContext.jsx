import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { ref, onValue, set, remove } from 'firebase/database';

export const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};

// ═══ DEFAULT CONTENT ═══
export const DEFAULT_CONTENT = {
  // --- HOME PAGE ---
  'home.hero.title': 'TrueBuild Projects',
  'home.hero.subtitle': 'Building Dreams, Delivering Quality',
  'home.started.year': '2018',
  'home.story.label': 'Our Vision',
  'home.story.title': 'The TrueBuild Story',
  'home.story.text': 'At TrueBuild Projects, we handle the complexities of construction so you don\'t have to. From the first shovel in the ground to the final coat of paint, we deliver quality, integrity, and precision.\n\nWe manage every phase of the project, ensuring seamless transitions between structural work and interior finishing. One team, one vision, zero stress.',
  'home.projects.label': 'Our Work',
  'home.projects.title': 'Recent Projects',
  'home.services.label': 'Our Expertise',
  'home.services.title': 'What We Do',
  'home.interiors.title': 'Interior Design',
  'home.landscape.title': 'Landscape & Gardening',
  
  // --- ABOUT PAGE ---
  'about.hero.label': 'Our Story',
  'about.hero.title1': 'Two engineers.',
  'about.hero.title2': 'One vision.',
  'about.hero.subtitle': 'Your complete building partner.',
  'about.hero.text': 'TrueBuild Projects was founded by two experienced engineers who shared a simple belief: that clients deserve a single, trusted partner to take their project from Construction and Interior projects all the way through to the final piece of furniture.',
  'about.card1.label': 'The Company',
  'about.card1.title': 'Overview',
  'about.card1.text': 'Explore our story, how we started, the working process and what makes TrueBuild Projects truly unique.',
  'about.card1.link': 'Explore →',
  'about.card2.label': 'Photography',
  'about.card2.title': 'Gallery',
  'about.card2.text': 'A visual journey through spaces we have imagined, crafted and brought to life — interiors, furniture, and construction.',
  'about.card2.link': 'View Gallery →',
  'about.quote.label': 'The Philosophy',
  'about.quote.text': '"We don\'t just build structures. We build trust — from the first stone to the final finish."',
  'about.quote.author': '— TrueBuild Projects',

  // --- OVERVIEW PAGE ---
  'overview.hero.label': 'Overview',
  'overview.hero.title': 'Our Story',
  'overview.hero.text': 'Two engineers. One vision. Your complete building partner.',
  'overview.intro.label': 'How We Started',
  'overview.intro.title': 'Built on experience. Driven by purpose.',
  'overview.numbers.label': 'Our Numbers',
  'overview.numbers.title': 'Numbers that speak for themselves',
  'overview.stat1.label': 'Years of Engineering Excellence',
  'overview.stat2.label': 'Projects Delivered',
  'overview.stat3.label': 'Happy Clients',
  'overview.process.label': 'Working Process',
  'overview.process.title': 'How we bring your vision to life',
  'overview.cta.label': 'Get In Touch',
  'overview.cta.title': 'Ready to start your project?',
  'overview.cta.text': 'From interior design to full building construction — we handle it all under one roof.',

  // --- GALLERY PAGE ---
  'gallery.hero.label': 'Photography',
  'gallery.hero.title': 'The Gallery',
  'gallery.hero.text': 'A visual journey through spaces we have imagined, crafted, and brought to life.',

  // --- SERVICES PAGE ---
  'services.hero.label': 'One Team · One Vision · Zero Stress',
  'services.hero.title': 'Our Services',
  'services.hero.text': 'From the first shovel in the ground to the final coat of paint — quality, integrity, and precision.',
  'services.offer.label': 'What We Offer',
  'services.offer.title': 'End-to-End Project Delivery',
  'services.promise.label': 'The TrueBuild Promise',
  'services.promise.title': 'One Team. One Vision. Zero Stress.',
  'services.promise.text': 'We manage every phase of the project, ensuring seamless transitions between structural work and interior finishing.',
  'services.promise.point1': 'Complete project management — start to finish',
  'services.promise.point2': 'Seamless transition from structure to interiors',
  'services.promise.point3': 'Transparent timelines and fixed-cost contracts',
  'services.promise.point4': 'Dedicated site manager for every project',
  'services.stat1.label': 'Years of Experience',
  'services.stat2.label': 'Projects Delivered',
  'services.stat3.label': 'Client Satisfaction',
  'services.stat4.label': 'Team, Every Phase',
  'services.cta.label': 'Start a Project',
  'services.cta.title': 'Have a project in mind?',
  'services.cta.text': 'We handle everything — from architectural planning to the final finishing touch.',

  // --- CONTACT PAGE ---
  'contact.hero.label': 'Get in Touch',
  'contact.hero.title': 'Contact Us',
  'contact.hero.text': 'If you need help before, during or after your purchase — this is the place to be.',
  
  'contact.type1.title': 'Interiors Project Enquiries',
  'contact.type1.desc': 'For residential, commercial, hospitality and architectural design projects.',
  'contact.type1.phone': '+91 72173 10020',
  'contact.type1.email': 'truebuildproject@gmail.com',

  'contact.type2.title': 'Construction Enquiries',
  'contact.type2.desc': 'For new building projects, structural work, excavation, masonry and complete construction consultations.',
  'contact.type2.phone': '+91 72173 10020',
  'contact.type2.email': 'truebuildproject@gmail.com',

  'contact.type3.title': 'Other Enquiries & Customer Care',
  'contact.type3.desc': 'For shop orders, bespoke furniture, general questions and after-sale support.',
  'contact.type3.phone': '+91 70551 85315',
  'contact.type3.email': 'truebuildproject@gmail.com',

  'contact.form.label': 'Send a Message',
  'contact.form.title': "We'd love to hear from you",
  'contact.form.button': 'Send Message →',

  'contact.address1.label': 'Address 1',
  'contact.address1.city': 'Ghaziabad',
  'contact.address1.text': 'KH-576M, Durga Enclave, GB Nagar, Ghaziabad, Uttar Pradesh — 201009',
  'contact.address1.phone1': '+91 70551 85315',
  'contact.address1.phone2': '+91 72173 10020',

  'contact.address2.label': 'Address 2',
  'contact.address2.city': 'Amroha',
  'contact.address2.text': 'Village Agraula Kalan, Near Chhoti Masjid, Hasanpur, Amroha, Uttar Pradesh — 244241',
  'contact.address2.phone1': '+91 70551 85315',
  'contact.address2.phone2': '+91 72173 10020',

  // --- SOCIAL ---
  'social.instagram': 'https://www.instagram.com/truebuild_project?utm_source=qr&igsh=ZmpjM2hteXl5NGxt',
  'social.facebook': 'https://www.facebook.com/people/TrueBuild-Projects/61583582405966/',
  'social.linkedin': 'https://www.linkedin.com/company/truebuild-projects/',
  'social.email': 'truebuildproject@gmail.com',
  'social.phone1': '+91 70551 85315',
  'social.phone2': '+91 72173 10020',
};

// ═══ CONTENT SECTIONS ═══
export const CONTENT_SECTIONS = [
  { key: 'home',     label: '🏠 Home Page'      },
  { key: 'about',    label: '👤 About Page'      },
  { key: 'overview', label: '📖 Overview Page'   },
  { key: 'gallery',  label: '🖼️ Gallery Page'    },
  { key: 'services', label: '🛠️ Services Page'   },
  { key: 'contact',  label: '✉️ Contact Page'    },
  { key: 'social',   label: '🌐 Social & Global' },
];

// ═══ CONTENT LABELS ═══
export const CONTENT_LABELS = {
  // Home
  'home.hero.title': 'Hero Title',
  'home.hero.subtitle': 'Hero Subtitle',
  'home.started.year': 'Year Started',
  'home.story.label': 'Story Section Label',
  'home.story.title': 'Story Section Title',
  'home.story.text': 'Story Section Content',
  'home.projects.label': 'Projects Section Label',
  'home.projects.title': 'Projects Section Title',
  'home.services.label': 'Services Section Label',
  'home.services.title': 'Services Section Title',
  'home.interiors.title': 'Interiors Full-Width Title',
  'home.landscape.title': 'Landscape Full-Width Title',

  // About
  'about.hero.label': 'Hero Label',
  'about.hero.title1': 'Hero Title Line 1',
  'about.hero.title2': 'Hero Title Line 2',
  'about.hero.subtitle': 'Hero Subtitle',
  'about.hero.text': 'Hero Intro Text',
  'about.card1.label': 'Overview Card Label',
  'about.card1.title': 'Overview Card Title',
  'about.card1.text': 'Overview Card Text',
  'about.card1.link': 'Overview Card Link Text',
  'about.card2.label': 'Gallery Card Label',
  'about.card2.title': 'Gallery Card Title',
  'about.card2.text': 'Gallery Card Text',
  'about.card2.link': 'Gallery Card Link Text',
  'about.quote.label': 'Quote Section Label',
  'about.quote.text': 'Philosophy Quote',
  'about.quote.author': 'Quote Author',

  // Overview
  'overview.hero.label': 'Hero Label',
  'overview.hero.title': 'Hero Title',
  'overview.hero.text': 'Hero Text',
  'overview.intro.label': 'Intro Section Label',
  'overview.intro.title': 'Intro Section Title',
  'overview.numbers.label': 'Numbers Section Label',
  'overview.numbers.title': 'Numbers Section Title',
  'overview.stat1.label': 'Stat 1 Label',
  'overview.stat2.label': 'Stat 2 Label',
  'overview.stat3.label': 'Stat 3 Label',
  'overview.process.label': 'Process Section Label',
  'overview.process.title': 'Process Section Title',
  'overview.cta.label': 'CTA Label',
  'overview.cta.title': 'CTA Title',
  'overview.cta.text': 'CTA Text',

  // Gallery
  'gallery.hero.label': 'Hero Label',
  'gallery.hero.title': 'Hero Title',
  'gallery.hero.text': 'Hero Text',

  // Services
  'services.hero.label': 'Hero Label',
  'services.hero.title': 'Hero Title',
  'services.hero.text': 'Hero Text',
  'services.offer.label': 'Offer Label',
  'services.offer.title': 'Offer Title',
  'services.promise.label': 'Promise Label',
  'services.promise.title': 'Promise Title',
  'services.promise.text': 'Promise Text',
  'services.promise.point1': 'Promise Point 1',
  'services.promise.point2': 'Promise Point 2',
  'services.promise.point3': 'Promise Point 3',
  'services.promise.point4': 'Promise Point 4',
  'services.stat1.label': 'Stat 1 Label',
  'services.stat2.label': 'Stat 2 Label',
  'services.stat3.label': 'Stat 3 Label',
  'services.stat4.label': 'Stat 4 Label',
  'services.cta.label': 'CTA Label',
  'services.cta.title': 'CTA Title',
  'services.cta.text': 'CTA Text',

  // Contact
  'contact.hero.label': 'Hero Label',
  'contact.hero.title': 'Hero Title',
  'contact.hero.text': 'Hero Description',
  'contact.type1.title': 'Type 1 Title',
  'contact.type1.desc': 'Type 1 Description',
  'contact.type1.phone': 'Type 1 Phone',
  'contact.type1.email': 'Type 1 Email',
  'contact.type2.title': 'Type 2 Title',
  'contact.type2.desc': 'Type 2 Description',
  'contact.type2.phone': 'Type 2 Phone',
  'contact.type2.email': 'Type 2 Email',
  'contact.type3.title': 'Type 3 Title',
  'contact.type3.desc': 'Type 3 Description',
  'contact.type3.phone': 'Type 3 Phone',
  'contact.type3.email': 'Type 3 Email',
  'contact.form.label': 'Form Label',
  'contact.form.title': 'Form Title',
  'contact.form.button': 'Form Submit Text',
  'contact.address1.label': 'Address 1 Label',
  'contact.address1.city': 'Address 1 City',
  'contact.address1.text': 'Address 1 Full Address',
  'contact.address1.phone1': 'Address 1 Phone 1',
  'contact.address1.phone2': 'Address 1 Phone 2',
  'contact.address2.label': 'Address 2 Label',
  'contact.address2.city': 'Address 2 City',
  'contact.address2.text': 'Address 2 Full Address',
  'contact.address2.phone1': 'Address 2 Phone 1',
  'contact.address2.phone2': 'Address 2 Phone 2',

  // Social
  'social.instagram': 'Instagram URL',
  'social.facebook': 'Facebook URL',
  'social.linkedin': 'LinkedIn URL',
  'social.email': 'Public Email Address',
  'social.phone1': 'Public Phone 1',
  'social.phone2': 'Public Phone 2',
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  // Helper to convert dotted keys to firebase-safe keys
  const toFirebaseKey = (key) => key.replace(/\./g, '_');
  const fromFirebaseKey = (key) => key.replace(/_/g, '.');

  useEffect(() => {
    const contentRef = ref(db, 'site_content');
    const unsubscribe = onValue(contentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const merged = { ...DEFAULT_CONTENT };
        Object.entries(data).forEach(([key, value]) => {
          merged[fromFirebaseKey(key)] = value;
        });
        setContent(merged);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateContent = async (key, value) => {
    const firebaseKey = toFirebaseKey(key);
    const contentRef = ref(db, `site_content/${firebaseKey}`);
    
    if (value === DEFAULT_CONTENT[key]) {
      await remove(contentRef);
    } else {
      await set(contentRef, value);
    }
  };

  const resetToDefault = async (key) => {
    const firebaseKey = toFirebaseKey(key);
    await remove(ref(db, `site_content/${firebaseKey}`));
  };

  const resetAll = async () => {
    if (window.confirm('Are you sure you want to reset ALL site text to defaults? This cannot be undone.')) {
      await remove(ref(db, 'site_content'));
    }
  };

  const overrideCount = Object.keys(content).filter(
    key => content[key] !== DEFAULT_CONTENT[key]
  ).length;

  return (
    <ContentContext.Provider value={{ 
      content, updateContent, resetToDefault, resetAll, 
      loading, overrideCount, DEFAULT_CONTENT, CONTENT_SECTIONS, CONTENT_LABELS 
    }}>
      {children}
    </ContentContext.Provider>
  );
};
