'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { PLACEHOLDER_IMAGE, FALLBACK_IMAGES } from '@/lib/constants';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string | null | undefined;
  category?: keyof typeof FALLBACK_IMAGES;
  fallback?: string;
}

export default function SafeImage({ src, category, fallback, alt, ...props }: SafeImageProps) {
  // Determine the best initial fallback
  const defaultFallback = category ? FALLBACK_IMAGES[category] : (fallback || PLACEHOLDER_IMAGE);
  
  const [imgSrc, setImgSrc] = useState<string>(src || defaultFallback);

  // Update if src changes externally
  useEffect(() => {
    if (src) setImgSrc(src);
    else setImgSrc(defaultFallback);
  }, [src, defaultFallback]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || 'Traveloop Image'}
      onError={() => {
        setImgSrc(defaultFallback);
      }}
    />
  );
}
