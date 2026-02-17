import React, { useState, useEffect } from 'react';

interface LocalImageProps {
  src: string;
  alt: string;
  className?: string;
  aos?: string;
  aosDelay?: string;
  [key: string]: any;
}

const LocalImage: React.FC<LocalImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  aos, 
  aosDelay,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved image from localStorage on mount to persist user's choices
  useEffect(() => {
    const restoreImage = () => {
      try {
        // Check various keys that might have been used to store the custom image
        const potentialKeys = [src, `uploaded-image-${src}`, `custom-image-${src}`, `image-${src}`];
        let found = false;
        for (const key of potentialKeys) {
          const saved = localStorage.getItem(key);
          if (saved) {
            setImgSrc(saved);
            found = true;
            break;
          }
        }
        if (!found) setImgSrc(src);
      } catch (e) {
        setImgSrc(src);
      }
    };
    restoreImage();
  }, [src]);

  // Reset loading state when source changes (though usually handled by restoreImage)
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [imgSrc]);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      data-aos={aos} 
      data-aos-delay={aosDelay}
      {...props}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-gray-50 text-vibes-gold">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
             <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
           </svg>
        </div>
      )}

      {/* Main Image */}
      {hasError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
          </div>
      ) : (
          <img 
              src={imgSrc} 
              alt={alt} 
              className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={handleLoad}
              onError={handleError}
          />
      )}
    </div>
  );
};

export default LocalImage;