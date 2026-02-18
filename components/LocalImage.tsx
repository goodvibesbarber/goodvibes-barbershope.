import React, { useState, useEffect } from 'react';

interface LocalImageProps {
  src: string;
  alt: string;
  className?: string;
  aos?: string;
  aosDelay?: string;
  errorLabel?: string;
  fallbackSrc?: string; // Kept for backward compatibility
  fallbacks?: string[]; // New: List of backup images to try in order
  [key: string]: any;
}

const LocalImage: React.FC<LocalImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  aos, 
  aosDelay,
  errorLabel,
  fallbackSrc,
  fallbacks = [],
  ...props 
}) => {
  // Combine all sources into one priority list
  // 1. Main src
  // 2. fallbacks array
  // 3. legacy fallbackSrc
  const allSources = [src, ...fallbacks, fallbackSrc].filter(Boolean) as string[];

  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(allSources[0]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset when the main src prop changes
  useEffect(() => {
    const newSources = [src, ...fallbacks, fallbackSrc].filter(Boolean) as string[];
    if (newSources[0] !== allSources[0]) {
        setCurrentSrcIndex(0);
        setImgSrc(newSources[0]);
        setHasError(false);
        setIsLoading(true);
    }
  }, [src, fallbacks, fallbackSrc]);

  const handleLoad = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    const nextIndex = currentSrcIndex + 1;
    
    if (nextIndex < allSources.length) {
        console.log(`Image failed: ${imgSrc}. Trying backup: ${allSources[nextIndex]}`);
        setCurrentSrcIndex(nextIndex);
        setImgSrc(allSources[nextIndex]);
        // Keep loading true while we try the next one
    } else {
        // All options failed
        console.error(`All image sources failed for alt: "${alt}"`);
        setIsLoading(false);
        setHasError(true);
    }
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
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-400 p-4 text-center border-2 border-dashed border-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <span className="text-xs font-medium text-gray-500">{errorLabel || "Image not found"}</span>
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