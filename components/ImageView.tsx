'use client'
import { generateImageUrl } from '@/lib/utils';
import { PRODUCT_BY_SLUG_QUERY_RESULT } from '@/sanity.types';
import Image from 'next/image'
import { useState } from 'react';

type imagesType = NonNullable<NonNullable<PRODUCT_BY_SLUG_QUERY_RESULT>['images']>

const ImageView = ({ images = [] }: { images: imagesType }) => {
    const [active, setActive] = useState(images[0]);

    return (
      <div className='flex flex-col gap-4'>
          <div className='aspect-w-1 aspect-h-1 overflow-hidden bg-secondary/50 border-2 border-accent-foreground/20 rounded-lg group'>
            {active.url && active.lqip && (
              <Image 
                priority
                src={generateImageUrl(active.url, 700)} 
                alt="Product Image"
                width={700}
                height={700}
                placeholder="blur"
                blurDataURL={active.lqip}
                className='w-full h-full object-cover group-hover:scale-110 hoverEffect' />
            )}
          </div>
          <div className='w-full flex gap-4'>
              {images?.map((image) => (
                <div
                    key={image._key}
                    onClick={() => setActive(image)}
                    className={`aspect-w-1 aspect-h-1 w-24 overflow-hidden bg-secondary/50 border-2 ${active == image && "border-accent-foreground/50"} border-accent-foreground/20 rounded-lg hover:cursor-pointer hover:border-accent-foreground/50 hoverEffect group`}>
                    {image.url && image.lqip && (
                        <Image 
                            src={generateImageUrl(image.url, 100)} 
                            alt="product image" 
                            width={100}
                            height={100}
                            placeholder="blur"
                            blurDataURL={image.lqip}
                            className={`w-full h-full ${active == image && "opacity-100"} opacity-70 group-hover:opacity-100 hoverEffect`} />
                    )}
                </div>
              ))}
          </div>
      </div>
    )
}

export default ImageView