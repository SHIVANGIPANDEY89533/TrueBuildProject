import React, { useEffect, useState, useRef } from 'react';

const AnimatedCounter = ({ target = 2018, duration = 2500 }) => {
  const [count, setCount]   = useState(0);
  const sectionRef          = useRef();

  useEffect(() => {
    // Watch when this element enters the screen
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let current = 0;
        const step  = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(current);
          }
        }, 16); // ~60fps
        observer.disconnect(); // run only once
      }
    }, { threshold: 0.3 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={sectionRef} style={{
      fontFamily: "'Georgia', serif",
      fontSize:   'clamp(4rem, 10vw, 8rem)',
      fontWeight: '300',
      color:      '#1a1a1a',
      letterSpacing: '2px',
      lineHeight:  1,
    }}>
      {count}
    </div>
  );
};

export default AnimatedCounter;