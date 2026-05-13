import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Separator } from './ui/separator'
import categoryImage from '@/images/product/product_1.png'
import Image from 'next/image'

const HomeCategories = () => {
  return (
    <div className='flex flex-col w-full border-2 border-accent-foreground/20 p-8 gap-4 rounded-xl'>
        <h2 className='text-2xl font-semibold'>Popular Categories</h2>
        <span className='shrink-0 border-b-2 bg-accent-foreground/20'></span>
        <div className='w-full p-4 gap-2 grid grid-cols-3'>
            <div className='w-full p-4 gap-4 flex items-center bg-secondary'>
                <div className='aspect-w-2 aspect-h-3 w-3/12 border-2 border-destructive/30 hover:border-destructive/70 hoverEffect rounded-md group'>
                    <Link href="/">
                        <Image src={categoryImage} alt='categories' className='w-full h-full object-cover group-hover:scale-115 transition-transform hoverEffect' />
                    </Link>
                </div>
                <div>
                    <h3 className='font-semibold'>Laptops</h3>
                    <div className='flex gap-2 text-sm font-medium'>
                        <p className='text-chart-5'>(3)</p>
                        <p>items Available</p>
                    </div>
                </div>
            </div>
            <div className='w-full p-4 gap-4 flex items-center bg-secondary'>
                <div className='aspect-w-2 aspect-h-3 w-3/12 border-2 border-destructive/30 hover:border-destructive/70 hoverEffect rounded-md group'>
                    <Link href="/">
                        <Image src={categoryImage} alt='categories' className='w-full h-full object-cover group-hover:scale-115 transition-transform hoverEffect' />
                    </Link>
                </div>
                <div>
                    <h3 className='font-semibold'>Laptops</h3>
                    <div className='flex gap-2 text-sm font-medium'>
                        <p className='text-chart-5'>(3)</p>
                        <p>items Available</p>
                    </div>
                </div>
            </div>
            <div className='w-full p-4 gap-4 flex items-center bg-secondary'>
                <div className='aspect-w-2 aspect-h-3 w-3/12 border-2 border-destructive/30 hover:border-destructive/70 hoverEffect rounded-md group'>
                    <Link href="/">
                        <Image src={categoryImage} alt='categories' className='w-full h-full object-cover group-hover:scale-115 transition-transform hoverEffect' />
                    </Link>
                </div>
                <div>
                    <h3 className='font-semibold'>Laptops</h3>
                    <div className='flex gap-2 text-sm font-medium'>
                        <p className='text-chart-5'>(3)</p>
                        <p>items Available</p>
                    </div>
                </div>
            </div>
            <div className='w-full p-4 gap-4 flex items-center bg-secondary'>
                <div className='aspect-w-2 aspect-h-3 w-3/12 border-2 border-destructive/30 hover:border-destructive/70 hoverEffect rounded-md group'>
                    <Link href="/">
                        <Image src={categoryImage} alt='categories' className='w-full h-full object-cover group-hover:scale-115 transition-transform hoverEffect' />
                    </Link>
                </div>
                <div>
                    <h3 className='font-semibold'>Laptops</h3>
                    <div className='flex gap-2 text-sm font-medium'>
                        <p className='text-chart-5'>(3)</p>
                        <p>items Available</p>
                    </div>
                </div>
            </div>
            <div className='w-full p-4 gap-4 flex items-center bg-secondary'>
                <div className='aspect-w-2 aspect-h-3 w-3/12 border-2 border-destructive/30 hover:border-destructive/70 hoverEffect rounded-md group'>
                    <Link href="/">
                        <Image src={categoryImage} alt='categories' className='w-full h-full object-cover group-hover:scale-115 transition-transform hoverEffect' />
                    </Link>
                </div>
                <div>
                    <h3 className='font-semibold'>Laptops</h3>
                    <div className='flex gap-2 text-sm font-medium'>
                        <p className='text-chart-5'>(3)</p>
                        <p>items Available</p>
                    </div>
                </div>
            </div>
            <div className='w-full p-4 gap-4 flex items-center bg-secondary'>
                <div className='aspect-w-2 aspect-h-3 w-3/12 border-2 border-destructive/30 hover:border-destructive/70 hoverEffect rounded-md group'>
                    <Link href="/">
                        <Image src={categoryImage} alt='categories' className='w-full h-full object-cover group-hover:scale-115 transition-transform hoverEffect' />
                    </Link>
                </div>
                <div>
                    <h3 className='font-semibold'>Laptops</h3>
                    <div className='flex gap-2 text-sm font-medium'>
                        <p className='text-chart-5'>(3)</p>
                        <p>items Available</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeCategories