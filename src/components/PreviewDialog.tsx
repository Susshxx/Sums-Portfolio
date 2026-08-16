import { useState, useEffect, useRef } from 'react';
import { MonitorIcon, SmartphoneIcon } from 'lucide-react';
import { DeviceFrame } from './DeviceFrame';
import { DesignGallery } from './DesignGallery';

type DeviceType = 'mac' | 'phone' | 'full';
type ContentType = 'live' | 'static';

interface Design {
  title: string;
  image: string;
  thumbnail?: string;
  liveUrl?: string;
  deviceType?: 'desktop' | 'mobile';
  customHeight?: string;
  disableMacPreview?: boolean;
}

interface PreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialDevice: DeviceType;
  contentType: ContentType;
  content: string;
  designs?: Design[];
  disablePhonePreview?: boolean;
}

export function PreviewDialog({ isOpen, onClose, initialDevice, contentType, content, designs, disablePhonePreview }: PreviewDialogProps) {
  const [device, setDevice] = useState<DeviceType>(initialDevice);
  const [selectedDesign, setSelectedDesign] = useState<Design | undefined>(designs?.[0]);
  const [isMobile, setIsMobile] = useState(false);
  const scrollPosition = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 500);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setDevice(initialDevice);
  }, [initialDevice]);

  useEffect(() => {
    if (designs && designs.length > 0) {
      setSelectedDesign(designs[0]);
    }
  }, [designs]);

  const handleDesignSelect = (design: Design) => {
    setSelectedDesign(design);
    if (design.deviceType === 'mobile') {
      setDevice('phone');
    } else {
      setDevice('mac');
    }
  };

  const currentContent = selectedDesign?.liveUrl || selectedDesign?.image || content;
  const currentContentType = selectedDesign?.liveUrl ? 'live' : contentType;

  useEffect(() => {
    if (isOpen) {
      // Save scroll position and prevent scrolling
      scrollPosition.current = window.scrollY;
      document.body.style.overflow = 'hidden';
    } else {
      // Simply restore overflow, don't mess with position
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      {/* Desktop layout */}
      <div className="relative w-full h-full max-w-7xl max-h-[90vh]" style={{ display: !isMobile ? 'block' : 'none' }}>
        {device !== 'full' && (
          <div className="absolute right-20 top-1/2 -translate-y-1/2 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
            {!selectedDesign?.disableMacPreview && (!selectedDesign?.deviceType || selectedDesign.deviceType === 'desktop') ? (
              <button
                onClick={() => setDevice('mac')}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  device === 'mac' ? 'bg-accent text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <MonitorIcon className="h-4 w-4" />
                Mac
              </button>
            ) : null}
            {!disablePhonePreview && (
              <button
                onClick={() => setDevice('phone')}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  device === 'phone' ? 'bg-accent text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <SmartphoneIcon className="h-4 w-4" />
                Phone
              </button>
            )}
          </div>
        )}
        <div className="h-full w-full overflow-auto flex items-center justify-center">
          <div className="flex items-center gap-6 w-full max-w-7xl">
            {designs && designs.length > 0 && (
              <div className="w-1/4 max-w-xs">
                <DesignGallery 
                  designs={designs} 
                  onDesignSelect={handleDesignSelect} 
                  selectedDesign={selectedDesign} 
                />
              </div>
            )}
            <div className="flex-1 flex items-center justify-center">
              <DeviceFrame 
                key={`${isOpen}-${currentContent}`} 
                device={device} 
                contentType={currentContentType} 
                content={currentContent} 
                onClose={onClose} 
                onDeviceChange={setDevice} 
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile layout for screens < 500px */}
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col" style={{ display: isMobile ? 'flex' : 'none' }} onClick={(e) => e.stopPropagation()}>
        
        <div className="flex-1 overflow-auto flex items-center justify-center p-4">
          <div className="w-full h-full flex items-center justify-center">
            <DeviceFrame 
              key={`${isOpen}-${currentContent}`} 
              device={device} 
              contentType={currentContentType} 
              content={currentContent} 
              onClose={onClose} 
              onDeviceChange={setDevice} 
            />
          </div>
        </div>

        {/* Mobile device toggle buttons */}
        {!designs && (
          <div className="flex justify-center gap-2 p-4 border-t border-white/10">
            {!selectedDesign?.disableMacPreview && (!selectedDesign?.deviceType || selectedDesign.deviceType === 'desktop') ? (
              <button
                onClick={() => setDevice('mac')}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  device === 'mac' ? 'bg-accent text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <MonitorIcon className="h-4 w-4" />
                Mac
              </button>
            ) : null}
            {!disablePhonePreview && (
              <button
                onClick={() => setDevice('phone')}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  device === 'phone' ? 'bg-accent text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <SmartphoneIcon className="h-4 w-4" />
                Phone
              </button>
            )}
          </div>
        )}

        {designs && designs.length > 0 && (
          <div className="w-full border-t border-white/10 bg-black/50">
            <div className="max-h-[140px] overflow-x-auto overflow-y-hidden p-3">
              <div className="flex gap-3">
                {designs.map((design, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDesignSelect(design);
                    }}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105 flex-shrink-0 ${
                      selectedDesign === design ? 'border-accent shadow-lg' : 'border-transparent hover:border-gray-300'
                    }`}
                    style={{ 
                      height: '100px',
                      width: '160px'
                    }}
                  >
                    <img
                      src={design.thumbnail || design.image}
                      alt={design.title}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-1 left-1 right-1">
                      <p className="text-[10px] font-medium text-white truncate">{design.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
