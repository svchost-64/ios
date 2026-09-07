import React, { useState, useRef } from 'react';
import { UploadCloud, X, Plus, Image as ImageIcon } from 'lucide-react';

export interface DropzoneProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  samplePresets?: string[];
  id?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  images,
  onChange,
  maxImages = 5,
  samplePresets = [],
  id = 'admin-image-dropzone',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remainingSlots = maxImages - images.length;
    if (remainingSlots <= 0) return;

    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    const newUrls: string[] = [];

    filesToProcess.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newUrls.push(e.target.result as string);
            if (newUrls.length === filesToProcess.length) {
              onChange([...images, ...newUrls].slice(0, maxImages));
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const addImageUrl = (url: string) => {
    if (!url.trim() || images.length >= maxImages) return;
    onChange([...images, url.trim()].slice(0, maxImages));
    setCustomUrlInput('');
    setShowUrlInput(false);
  };

  return (
    <div id={id} className="space-y-3">
      {/* Header and counter */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#86868B]">
          Galería de Renders Oficiales
        </label>
        <span
          id="dropzone-counter"
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            images.length >= maxImages
              ? 'bg-amber-100 text-amber-800'
              : 'bg-[#F5F5F7] text-[#1D1D1F]'
          }`}
        >
          {images.length} de {maxImages} imágenes
        </span>
      </div>

      {/* Main Drag & Drop Area */}
      {images.length < maxImages && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-[#DC2626] bg-red-50/40'
              : 'border-[#D2D2D7] hover:border-[#1D1D1F] bg-[#FBFBFD]'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFiles(e.target.files)}
            multiple
            accept="image/*"
            className="hidden"
            id="file-upload-input"
          />

          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-[#E5E5EA] flex items-center justify-center text-[#1D1D1F]">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-[#1D1D1F]">
                Arrastra las imágenes aquí o{' '}
                <span className="text-[#DC2626] underline underline-offset-2">examina tus archivos</span>
              </p>
              <p className="text-[11px] text-[#86868B]">
                PNG con transparencia o JPG en alta definición (máx. 5MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* URL or Preset Selector */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          id="toggle-url-input-btn"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-[#86868B] hover:text-[#1D1D1F] flex items-center gap-1 font-medium transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          {showUrlInput ? 'Cerrar entrada URL' : 'Agregar por enlace URL'}
        </button>

        {samplePresets.length > 0 && images.length < maxImages && (
          <button
            type="button"
            id="load-sample-renders-btn"
            onClick={() => {
              const toAdd = samplePresets.slice(0, maxImages - images.length);
              onChange([...images, ...toAdd]);
            }}
            className="text-xs text-[#1D1D1F] hover:text-[#DC2626] flex items-center gap-1 font-medium transition-colors ml-auto bg-[#F5F5F7] px-2.5 py-1 rounded-full"
          >
            <ImageIcon className="w-3 h-3" />
            Cargar renders Apple sugeridos
          </button>
        )}
      </div>

      {showUrlInput && (
        <div className="flex gap-2 animate-in fade-in duration-150">
          <input
            type="url"
            id="custom-image-url-input"
            value={customUrlInput}
            onChange={(e) => setCustomUrlInput(e.target.value)}
            placeholder="https://store.storeimages.cdn-apple.com/..."
            className="flex-1 text-xs px-3 py-2 bg-white border border-[#D2D2D7] rounded-lg focus:outline-none focus:border-[#1D1D1F]"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addImageUrl(customUrlInput);
              }
            }}
          />
          <button
            type="button"
            id="add-url-btn"
            onClick={() => addImageUrl(customUrlInput)}
            className="text-xs font-medium bg-[#1D1D1F] text-white px-3 py-2 rounded-lg hover:bg-black transition-colors"
          >
            Añadir
          </button>
        </div>
      )}

      {/* Previews with Individual Delete Buttons */}
      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-2 pt-2">
          {images.map((imgUrl, index) => (
            <div
              key={`${imgUrl}-${index}`}
              id={`image-preview-${index}`}
              className="group relative aspect-square rounded-lg border border-[#E5E5EA] bg-[#F5F5F7] overflow-hidden flex items-center justify-center p-1"
            >
              <img
                src={imgUrl}
                alt={`Vista previa ${index + 1}`}
                className="w-full h-full object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  // Fallback if image URL fails
                  (e.target as HTMLImageElement).src =
                    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-natural-titanium-select?wid=940&hei=1112&fmt=png-alpha';
                }}
              />
              <button
                type="button"
                id={`delete-image-btn-${index}`}
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/75 hover:bg-[#DC2626] text-white flex items-center justify-center transition-colors shadow-xs"
                title="Eliminar imagen"
                aria-label={`Eliminar imagen ${index + 1}`}
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1 rounded font-mono">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
