import React from 'react'
import banner from "@/images/banner/banner_1.png"
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'

const HomeBanner = () => {
  return (
    <div className='w-full h-72 flex justify-between items-center px-32 bg-primary/10 rounded-xl mt-24'>
        <div className='flex flex-col'>
            <h2 className='text-3xl font-bold text-chart-5'>
                Grab Upto 50% Off on <br />
                Selected headphones
            </h2>
            <Button className='mt-4 px-8 w-max bg-chart-4 rounded-xl hover:bg-chart-5 hover:cursor-pointer text-primary-foreground'>
                <Link href="/shop">Buy Now</Link>
            </Button>
        </div>
        <div className='w-1/2 h-full'>
            <Image src={banner} alt="Home Banner" className='w-full h-full object-cover' />
        </div>
    </div>
  )
}

export default HomeBanner