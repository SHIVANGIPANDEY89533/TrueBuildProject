import { useSiteImages } from '../context/SiteImagesContext';

// Usage in any page:
// const heroImg = useSiteImage('home.hero.slide1');
const useSiteImage = (key) => {
  const { images } = useSiteImages();
  return images[key];
};

export default useSiteImage;