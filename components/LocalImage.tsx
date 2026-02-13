import React, { useState, useEffect, useRef } from 'react';

interface LocalImageProps {
  src: string;
  alt: string;
  className?: string;
  aos?: string;
  aosDelay?: string;
  [key: string]: any;
}

// Curated "Mood" Images for a Barber Shop Aesthetic
// Expanded list to give user more professional choices
const MOOD_PRESETS = [
  { name: 'Classic Shop', url: 'https://images.unsplash.com/photo-1503951914875-452162b7f30a?auto=format&fit=crop&w=800&q=80' },
  { name: 'Modern Interior', url: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80' },
  { name: 'The Chair', url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80' },
  { name: 'Tools of Trade', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80' },
  { name: 'Scissor Work', url: 'https://images.unsplash.com/photo-1504609773096-104ff10cf639?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sharp Fade', url: 'https://images.unsplash.com/photo-1599351431202-6e0005a7837f?auto=format&fit=crop&w=800&q=80' },
  { name: 'Neon Atmosphere', url: 'https://images.unsplash.com/photo-1512690459411-b9245aed8ad5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Waiting Area', url: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&w=800&q=80' },
  { name: 'Grooming Products', url: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dark Texture', url: 'https://images.unsplash.com/photo-1634489176942-1b6c00e66c98?auto=format&fit=crop&w=800&q=80' },
  { name: 'Street View', url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Barber Pole', url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80' }
];

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Upload specific states
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved image from localStorage on mount
  useEffect(() => {
    const restoreImage = () => {
      try {
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

  // Reset states when source changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [imgSrc]);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const saveImage = (newSrc: string) => {
    try {
      localStorage.setItem(`custom-image-${src}`, newSrc);
      setImgSrc(newSrc);
      setIsModalOpen(false);
      setUploadError(null);
    } catch (e) {
      console.error("Storage Error:", e);
      setUploadError("Image storage limit reached. Please try a smaller image or reset others.");
    }
  };

  // Helper to compress image to avoid LocalStorage limits
  const compressImage = (base64Str: string, maxWidth = 1024): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width *= maxWidth / height;
            height = maxWidth;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Compress to JPEG with 0.7 quality
            resolve(canvas.toDataURL('image/jpeg', 0.7)); 
        } else {
            resolve(base64Str);
        }
      };
      img.onerror = () => resolve(base64Str);
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadError(null);
      setIsProcessing(true);
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
            const rawBase64 = reader.result as string;
            const compressed = await compressImage(rawBase64);
            saveImage(compressed);
        } catch (err) {
            setUploadError("Failed to process image.");
        } finally {
            setIsProcessing(false);
        }
      };
      reader.onerror = () => {
          setUploadError("Error reading file.");
          setIsProcessing(false);
      };
      reader.readAsDataURL(file);
      
      // Reset input value so same file can be selected again if needed
      e.target.value = '';
    }
  };

  const handleReset = () => {
    localStorage.removeItem(`custom-image-${src}`);
    localStorage.removeItem(src);
    setImgSrc(src);
    setIsModalOpen(false);
    setUploadError(null);
  };

  return (
    <>
      <div 
        className={`relative overflow-hidden group ${className}`}
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

        {/* Edit Button Overlay (Visible on Hover) */}
        <div className="absolute inset-0 z-30 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-vibes-gold text-vibes-black px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                Change Image
            </button>
        </div>

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
                className={`w-full h-full object-cover transition-all duration-700 ease-out ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
                onLoad={handleLoad}
                onError={handleError}
            />
        )}
      </div>

      {/* Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-vibes-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-serif font-bold text-vibes-black">Select an Image</h3>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-500 hover:text-vibes-black"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Upload Section */}
                <div className="mb-8 bg-gray-50 p-6 rounded-xl">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Upload Custom</p>
                    
                    {/* Upload Box */}
                    <div 
                        onClick={() => !isProcessing && fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all group ${
                            isProcessing 
                                ? 'bg-gray-100 border-gray-300 cursor-wait' 
                                : 'border-gray-300 bg-white cursor-pointer hover:border-vibes-gold hover:bg-vibes-gold/5'
                        }`}
                    >
                        {isProcessing ? (
                             <div className="flex flex-col items-center text-vibes-gold">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin mb-2">
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                                </svg>
                                <span className="text-sm font-medium">Compressing & Saving...</span>
                             </div>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-vibes-gold mb-2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                <span className="text-sm font-medium text-gray-600 group-hover:text-vibes-black">Click to upload from device</span>
                            </>
                        )}
                    </div>

                    {/* Hidden Input */}
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileUpload} 
                        className="hidden" 
                    />

                    {/* Error Message */}
                    {uploadError && (
                        <div className="mt-3 text-sm text-red-600 flex items-center bg-red-50 p-3 rounded-lg animate-fade-in">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 flex-shrink-0">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            {uploadError}
                        </div>
                    )}
                </div>

                {/* Mood Board Section */}
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Mood Presets</p>
                        <button 
                            onClick={handleReset}
                            className="text-xs text-red-500 hover:text-red-700 underline flex items-center gap-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                <path d="M3 3v5h5"></path>
                            </svg>
                            Reset to Default
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6">
                        {MOOD_PRESETS.map((preset, idx) => (
                            <div 
                                key={idx}
                                onClick={() => saveImage(preset.url)}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-square overflow-hidden rounded-lg shadow-sm border-2 border-transparent group-hover:border-vibes-gold group-hover:shadow-md transition-all">
                                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <p className="mt-2 text-[11px] font-bold text-gray-500 text-center uppercase tracking-widest group-hover:text-vibes-black transition-colors">
                                    {preset.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      )}
    </>
  );
};

export default LocalImage;