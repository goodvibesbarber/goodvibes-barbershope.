import React, { useState, useEffect } from 'react';

interface LocalImageProps {
  src: string;
  alt: string;
  className?: string;
  aos?: string;
  aosDelay?: string;
  errorLabel?: string;
  [key: string]: any;
}

const LocalImage: React.FC<LocalImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  aos, 
  aosDelay,
  errorLabel,
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset state when src changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    // Safety timeout: If image hangs for more than 3 seconds, stop spinner
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [src]);

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
      {/* Loading Spinner - Only shows while true */}
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
              src={src} 
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