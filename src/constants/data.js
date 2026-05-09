import img2  from '../assets/images/img2.jpeg';
import img3  from '../assets/images/img3.jpeg';
import img4  from '../assets/images/img4.jpeg';
import img7  from '../assets/images/img7.jpeg';
import img8  from '../assets/images/img8.jpeg';
import img10 from '../assets/images/img10.jpeg';
import img11 from '../assets/images/img11.jpeg';
import img12 from '../assets/images/img12.jpeg';
import img16 from '../assets/images/img16.jpeg';

// ✅ Walkthroughs REMOVED from NAV_LINKS
export const NAV_LINKS = [
  { label: "Home",    path: "/" },
  { label: "About",   path: "/about", arrow: true,
    sub: [
      { label: "Overview", path: "/about"         },
      { label: "Gallery",  path: "/about/gallery" },
    ]
  },
  { label: "Services", path: "/services", arrow: true,
    sub: [
      { label: "Construction & Foundation", path: "/services/construction"  },
      { label: "MEP (Plumbing & Electrical)", path: "/services/mep"         },
      { label: "Finishing & Aesthetics",    path: "/services/finishing"     },
      { label: "Interior Design",           path: "/services/interiors"     },
    ]
  },
  { label: "Bespoke Furniture", path: "/bespoke"  },
  { label: "Shop Online",       path: "/shop"     },
  { label: "Contact",           path: "/contact"  },
];

export const SERVICES = [
  { id: 1, title: "Construction & Foundation", img: img2  },
  { id: 2, title: "MEP Services",              img: img3  },
  { id: 3, title: "Finishing & Aesthetics",    img: img4  },
  { id: 4, title: "Interior Design",           img: img10 },
  { id: 5, title: "Landscape & Gardening",     img: img16 },
];

export const PROJECTS = [
  { id: 1, title: "Modern Living",   img: img7,  category: "Residential" },
  { id: 2, title: "Modular Kitchen", img: img8,  category: "Kitchen"     },
  { id: 3, title: "Villa Build",     img: img11, category: "Construction" },
  { id: 4, title: "Commercial Site", img: img12, category: "Commercial"  },
];

export const CONSTRUCTION_PROJECTS = [
  { id: 1, img: img10, title: 'Residential Complex', category: 'Structural Construction' },
  { id: 2, img: img11, title: 'Commercial Building',  category: 'Commercial Construction' },
  { id: 3, img: img12, title: 'Villa Construction',   category: 'Luxury Build'            },
];

export const ROTATING_WORDS = ["construction", "interiors", "design", "spaces", "precision"];

export const STUDIO_STORY = `At TrueBuild Projects, we handle the complexities of construction so you don't have to. From the first shovel in the ground to the final coat of paint, we deliver quality, integrity, and precision.

We manage every phase of the project, ensuring seamless transitions between structural work and interior finishing. One team, one vision, zero stress.`;

export const CONTACT_INFO = {
  email:   'truebuildproject@gmail.com',
  phone:   '+91 9453577660',
  address: 'Village Agraula Kalan, Near Chhoti Masjid, Hasanpur, Amroha — 244241, UP',
};

export const SHOP_CATEGORIES = [
  "All", "Table Lamps", "Artefacts", "Accessories", "Candle Holders",
  "Bed Linen", "Side Tables", "Cushions & Decor", "Furniture"
];

export const SHOP_PRODUCTS = [
  {
    id: 1, name: "Amber Glow Table Lamp", category: "Table Lamps", price: 12500,
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    desc: "Hand-crafted amber glass table lamp with a warm golden glow.",
  },
  {
    id: 2, name: "Ivory Arc Lamp", category: "Table Lamps", price: 9800,
    img: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80",
    desc: "Minimalist ivory ceramic base with linen shade.",
  },
  {
    id: 3, name: "Wooden Horse Artefact", category: "Artefacts", price: 6500,
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    desc: "Handcrafted wooden horse sculpture — a signature TrueBuild piece.",
  },
  {
    id: 4, name: "Alabaster Chic Planter", category: "Artefacts", price: 4200,
    img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
    desc: "Alabaster finish planter with gold rim detailing.",
  },
  {
    id: 5, name: "Wooden Bust Artefact", category: "Artefacts", price: 7800,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    desc: "Abstract wooden bust — conversation-starting décor.",
  },
  {
    id: 6, name: "Marble Ashtray Gold Rim", category: "Accessories", price: 3200,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    desc: "White marble ashtray with 24K gold rim finish.",
  },
  {
    id: 7, name: "Wooden Tray Set", category: "Accessories", price: 5500,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    desc: "Set of 2 handcrafted wooden serving trays.",
  },
  {
    id: 8, name: "Antique Aura Candle Holder", category: "Candle Holders", price: 2800,
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    desc: "Antique brass finish candle holder — perfect centrepiece.",
  },
  {
    id: 9, name: "Crystal Column Holder", category: "Candle Holders", price: 3600,
    img: "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=600&q=80",
    desc: "Crystal clear glass column candle holder set of 3.",
  },
  {
    id: 10, name: "White & Gold Bed Linen Set", category: "Bed Linen", price: 14500,
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    desc: "400 thread count Egyptian cotton with gold border detailing.",
  },
  {
    id: 11, name: "Grey Pearl Linen Set", category: "Bed Linen", price: 12000,
    img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
    desc: "Soft pearl grey 100% cotton luxury bed linen.",
  },
  {
    id: 12, name: "Brass & Marble Side Table", category: "Side Tables", price: 28000,
    img: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80",
    desc: "Brushed brass legs with Italian marble top.",
  },
  {
    id: 13, name: "Gold Geo Side Table", category: "Side Tables", price: 22500,
    img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
    desc: "Geometric gold metal side table with glass surface.",
  },
  {
    id: 14, name: "Velvet Gold Cushion Set", category: "Cushions & Decor", price: 4800,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    desc: "Set of 2 plush gold velvet cushions with tassels.",
  },
  {
    id: 15, name: "Scented Soy Candle", category: "Cushions & Decor", price: 1800,
    img: "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=600&q=80",
    desc: "Hand-poured soy wax candle — sandalwood & amber.",
  },
  {
    id: 16, name: "Luxury Accent Chair", category: "Furniture", price: 65000,
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    desc: "Velvet upholstered accent chair with gold frame.",
  },
  {
    id: 17, name: "Console Table Brass", category: "Furniture", price: 48000,
    img: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80",
    desc: "Slim brass console table — ideal for entryways.",
  },
];

export const BLOG_POSTS = [
  {
    id: 1,
    category: "Construction",
    title: "Foundation First: Why Strong Groundwork Defines Every Great Build",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",
    date: "March 12, 2026",
  },
  {
    id: 2,
    category: "Interior Design",
    title: "From Blueprint to Beautiful: How We Transform Raw Structures into Dream Homes",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80",
    date: "February 28, 2026",
  },
  {
    id: 3,
    category: "Finishing",
    title: "The Art of Finishing: Flooring, Paint & Ceiling Work That Elevates Every Room",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80",
    date: "January 15, 2026",
  },
];

export const REVIEWS = [
  {
    id: 1,
    text: "TrueBuild handled our entire home construction from foundation to finishing. The quality of work and attention to detail was truly exceptional.",
    name: "Rajeev Sharma",
    rating: 5,
  },
  {
    id: 2,
    text: "From plumbing to interior design, they managed everything flawlessly. One team, one vision — exactly as promised. Zero stress throughout.",
    name: "Priya Mehta",
    rating: 5,
  },
  {
    id: 3,
    text: "The bespoke furniture they crafted for our home is stunning. Perfectly tailored to our space and built to last. Highly recommended.",
    name: "Ankit Verma",
    rating: 5,
  },
];

export const SIDEBAR_MENU = [
  { label: "Artefacts",             path: "/shop/artefacts",  sub: []                                },
  { label: "Accessories",           path: "/shop/accessories", sub: ["Wall Decor", "Trays", "Vases"] },
  { label: "Bedding",               path: "/shop/bedding",     sub: []                                },
  { label: "Cushions & Decor",      path: "/shop/cushions",    sub: ["Cushion Covers", "Throws"]      },
  { label: "Furniture",             path: "/shop/furniture",   sub: ["Chairs", "Tables", "Storage"]  },
  { label: "Lighting",              path: "/shop/lighting",    sub: ["Table Lamps", "Floor Lamps"]    },
  { label: "Mirrors & Art",         path: "/shop/mirrors",     sub: ["Mirrors", "Wall Art"]           },
  { label: "Planters & Botanicals", path: "/shop/planters",    sub: []                                },
];