'use client'
import { generateImageUrl } from '@/lib/utils';
import Image from 'next/image'
import { useState } from 'react';

interface Props {
  images?: Array<{
    _key: string;
    _type: "image";
    url: string;  
    lqip: string;  
  }>;
  isStock?: number | undefined;
}

const ImageView = ({ images = [] }: Props) => {
    const [active, setActive] = useState(images[0]);
    console.log(images);

    return (
      <div className='flex flex-col gap-4'>
          <div className='aspect-w-1 aspect-h-1 overflow-hidden bg-secondary/50 border-2 border-accent-foreground/20 rounded-lg group'>
              <Image 
                src={generateImageUrl(active.url, 700)} 
                alt="photo product"
                width={700}
                height={700}
                placeholder="blur"
                blurDataURL={active.lqip}
                className='w-full h-full object-cover group-hover:scale-110 hoverEffect' />
          </div>
          <div className='w-full flex gap-4'>
              {images?.map((image) => (
                <div
                    key={image._key}
                    onClick={() => setActive(image)}
                    className={`aspect-w-1 aspect-h-1 w-24 overflow-hidden bg-secondary/50 border-2 ${active == image && "border-accent-foreground/50"} border-accent-foreground/20 rounded-lg hover:cursor-pointer hover:border-accent-foreground/50 hoverEffect group`}>
                    <Image 
                        src={generateImageUrl(image.url, 300)} 
                        alt="product image" 
                        width={300}
                        height={300}
                        placeholder="blur"
                        blurDataURL={image.lqip}
                        className={`w-full h-full ${active == image && "opacity-100"} opacity-70 group-hover:opacity-100 hoverEffect`} />
                </div>
              ))}
          </div>
      </div>
    )
}

export default ImageView