import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { ref, onValue, set, remove, push } from 'firebase/database';

import img7  from '../assets/images/img7.jpeg';
import img8  from '../assets/images/img8.jpeg';
import img11 from '../assets/images/img11.jpeg';
import img12 from '../assets/images/img12.jpeg';

// ── Default (seed) projects that appear when DB is empty ──
export const DEFAULT_PROJECTS = [
  {
    id: 'default_1',
    title: 'Modern Living',
    category: 'Residential',
    description: 'A contemporary residential interior featuring warm tones, custom furniture and seamless open-plan living spaces.',
    location: 'Amroha, UP',
    year: '2024',
    img: img7,
    isDefault: true,
  },
  {
    id: 'default_2',
    title: 'Modular Kitchen',
    category: 'Kitchen',
    description: 'Full modular kitchen design with premium finishes, integrated appliances and optimal storage solutions.',
    location: 'Hasanpur, UP',
    year: '2024',
    img: img8,
    isDefault: true,
  },
  {
    id: 'default_3',
    title: 'Villa Build',
    category: 'Construction',
    description: 'End-to-end construction of a luxury villa — foundation to finishing — delivered within schedule and budget.',
    location: 'Moradabad, UP',
    year: '2023',
    img: img11,
    isDefault: true,
  },
  {
    id: 'default_4',
    title: 'Commercial Site',
    category: 'Commercial',
    description: 'Large-scale commercial construction project including structural work, MEP services and interior finishing.',
    location: 'Delhi NCR',
    year: '2023',
    img: img12,
    isDefault: true,
  },
];

export const PROJECT_CATEGORIES = [
  'All',
  'Residential',
  'Commercial',
  'Construction',
  'Interior',
  'Kitchen',
  'Hospitality',
  'Bespoke',
];

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Load from Firebase ──
  useEffect(() => {
    const projectsRef = ref(db, 'projects');
    const unsub = onValue(projectsRef, (snapshot) => {
      const raw = snapshot.val();
      if (raw) {
        // Convert Firebase object → array, preserve insertion order via createdAt
        const arr = Object.entries(raw).map(([fbId, data]) => ({
          ...data,
          id: fbId,
        }));
        arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setProjects(arr);
      } else {
        // No projects in DB → show defaults (read-only)
        setProjects(DEFAULT_PROJECTS);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // ── Add a new project ──
  const addProject = (projectData) => {
    const projectsRef = ref(db, 'projects');
    const newRef = push(projectsRef);
    const id = newRef.key;
    set(newRef, {
      ...projectData,
      id,
      createdAt: Date.now(),
      isDefault: false,
    });
    return id;
  };

  // ── Update an existing project ──
  const updateProject = (id, projectData) => {
    set(ref(db, `projects/${id}`), {
      ...projectData,
      id,
      updatedAt: Date.now(),
    });
  };

  // ── Delete a project ──
  const deleteProject = (id) => {
    remove(ref(db, `projects/${id}`));
  };

  // ── Seed defaults into Firebase (called once manually) ──
  const seedDefaults = () => {
    DEFAULT_PROJECTS.forEach((p) => {
      set(ref(db, `projects/${p.id}`), {
        ...p,
        createdAt: Date.now() - (DEFAULT_PROJECTS.indexOf(p) * 1000),
      });
    });
  };

  return (
    <ProjectsContext.Provider value={{
      projects,
      loading,
      addProject,
      updateProject,
      deleteProject,
      seedDefaults,
    }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);
export default ProjectsContext;
