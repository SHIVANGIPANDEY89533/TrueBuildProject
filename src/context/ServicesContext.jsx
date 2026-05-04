import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { ref, onValue, set, remove, push } from 'firebase/database';

// ── Default seed services ──
export const DEFAULT_SERVICES = [
  {
    id: 'svc_1',
    order: 1,
    title: 'Construction Services',
    subtitle: 'Complete Build',
    tag: 'Structural',
    desc: 'From groundbreaking to final finish — structurally sound, beautifully executed buildings across all residential and commercial project types.',
    img: '',
    points: [
      'RCC Framed Structure & Foundation',
      'Brick Masonry & Plastering',
      'Roof Slab & Beam Construction',
      'Site Management & Supervision',
      'Turnkey Project Delivery',
    ],
    isDefault: true,
  },
  {
    id: 'svc_2',
    order: 2,
    title: 'MEP Services',
    subtitle: 'Veins & Nerves',
    tag: 'Electrical & Plumbing',
    desc: 'We integrate complete electrical and plumbing systems with a focus on safety and long-term durability — wiring, panels, smart home, leak-proof piping, and drainage.',
    img: '',
    points: [
      'Complete Electrical Wiring & Panels',
      'Smart Home & Automation',
      'Plumbing & Sanitation Systems',
      'Water Supply & Drainage',
      'HVAC & Ventilation',
    ],
    isDefault: true,
  },
  {
    id: 'svc_3',
    order: 3,
    title: 'Finishing & Aesthetics',
    subtitle: 'Where House Meets Home',
    tag: 'Finishing',
    desc: 'Premium textures, weather-proof coatings, marble & granite flooring, and modern POP false ceilings — every finish is a statement of craftsmanship.',
    img: '',
    points: [
      'Marble, Granite & Tile Flooring',
      'Premium Exterior & Interior Paint',
      'POP False Ceilings & Gypsum Work',
      'Weather-Proof Coatings',
      'Doors, Windows & Hardware Fitting',
    ],
    isDefault: true,
  },
  {
    id: 'svc_4',
    order: 4,
    title: 'Interior Design & Furniture',
    subtitle: 'Made to Measure',
    tag: 'Interiors',
    desc: 'Full space planning, 3D visualization, modular kitchens, custom wardrobes, and bespoke handcrafted furniture — designed exclusively for your space.',
    img: '',
    points: [
      'Space Planning & 3D Visualization',
      'Modular Kitchen Design',
      'Custom Wardrobes & Storage',
      'Bespoke Handcrafted Furniture',
      'Lighting Design & Décor',
    ],
    isDefault: true,
  },
];

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const servicesRef = ref(db, 'services');
    const unsub = onValue(servicesRef, (snapshot) => {
      const raw = snapshot.val();
      if (raw) {
        const arr = Object.entries(raw).map(([id, data]) => ({ ...data, id }));
        arr.sort((a, b) => (a.order || 0) - (b.order || 0));
        setServices(arr);
      } else {
        setServices(DEFAULT_SERVICES);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const addService = (data) => {
    const servicesRef = ref(db, 'services');
    const newRef = push(servicesRef);
    set(newRef, {
      ...data,
      id: newRef.key,
      order: services.length + 1,
      isDefault: false,
      createdAt: Date.now(),
    });
  };

  const updateService = (id, data) => {
    set(ref(db, `services/${id}`), { ...data, id });
  };

  const deleteService = (id) => {
    remove(ref(db, `services/${id}`));
  };

  // Seed defaults into Firebase
  const seedDefaults = () => {
    DEFAULT_SERVICES.forEach((s, i) => {
      set(ref(db, `services/${s.id}`), { ...s, order: i + 1 });
    });
  };

  return (
    <ServicesContext.Provider value={{
      services, loading,
      addService, updateService, deleteService, seedDefaults,
    }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => useContext(ServicesContext);
export default ServicesContext;
