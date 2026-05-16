'use client'
import { internalGroqTypeReferenceTo, SanityImageCrop, SanityImageHotspot } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image'
import { useState } from 'react';

interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  isStock?: number | undefined;
}

const ImageView = ({ images = [] }: Props) => {
    const [active, setActive] = useState(images[0]);

    return (
      <div className='flex flex-col gap-4'>
          <div className='aspect-w-1 aspect-h-1 overflow-hidden bg-secondary/50 border-2 border-accent-foreground/20 rounded-lg group'>
              <Image 
                src={urlFor(active).url()} 
                alt="photo product"
                width={700}
                height={700}
                className='w-full h-full object-cover group-hover:scale-110 hoverEffect' />
          </div>
          <div className='w-full flex gap-4'>
              {images?.map((image) => (
                <div
                    key={image._key}
                    onClick={() => setActive(image)}
                    className={`aspect-w-1 aspect-h-1 w-24 overflow-hidden bg-secondary/50 border-2 ${active == image && "border-accent-foreground/50"} border-accent-foreground/20 rounded-lg hover:cursor-pointer hover:border-accent-foreground/50 hoverEffect group`}>
                    <Image 
                        src={urlFor(image).url()} 
                        alt="product image" 
                        width={300}
                        height={300}
                        className={`w-full h-full ${active == image && "opacity-100"} opacity-70 group-hover:opacity-100 hoverEffect`} />
                </div>
              ))}
          </div>
      </div>
    )
}

export default ImageView