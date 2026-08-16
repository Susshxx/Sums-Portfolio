interface Design {
  title: string;
  image: string;
  thumbnail?: string;
  liveUrl?: string;
  deviceType?: 'desktop' | 'mobile';
  customHeight?: string;
  disableMacPreview?: boolean;
}

interface DesignGalleryProps {
  designs: Design[];
  onDesignSelect: (design: Design) => void;
  selectedDesign?: Design;
}

export function DesignGallery({ designs, onDesignSelect, selectedDesign }: DesignGalleryProps) {
  const getImageSrc = (design: Design) => {
    // Always use thumbnail in gallery if available, otherwise use full image
    return design.thumbnail || design.image;
  };

  return (
    <div className="h-[350px] overflow-y-auto p-4 custom-scrollbar">
      <div className="flex flex-col gap-3">
        {designs.map((design, index) => (
          <button
            key={index}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDesignSelect(design);
            }}
            className={`relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
              selectedDesign === design ? 'border-accent shadow-lg' : 'border-transparent hover:border-gray-300'
            }`}
            style={{ 
              height: design.customHeight || (design.deviceType === 'mobile' ? '200px' : '120px'),
              width: '100%'
            }}
          >
            <img
              src={getImageSrc(design)}
              alt={design.title}
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-xs font-medium text-white truncate">{design.title}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
