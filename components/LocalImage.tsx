import React, { useState, useEffect } from 'react';

const LocalImage = ({ src, alt, className = "", aos = "", aosDelay = "0" }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const fallback = "https://images.unsplash.com/photo-1503951914875-452162b7f30a?w=800";

  useEffect(() => {
    const saved = localStorage.getItem(`custom-image-${src}`);
    if (saved) setImgSrc(saved);
    else setImgSrc(src);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`} data-aos={aos} data-aos-delay={aosDelay}>
      <img 
        src={imgSrc} 
        alt={alt} 
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          e.currentTarget.src = fallback;
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export default LocalImage;
