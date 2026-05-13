import Link from 'next/link'
import { FiTruck } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { RiRecycleLine } from "react-icons/ri";
import { AiOutlineFileProtect } from "react-icons/ai";
import { Button } from './ui/button'
import Image from 'next/image'
import brandLogo from "@/images/brands/brand_1.png"

const ShopByBrands = () => {
  return (
    <section className='w-full flex flex-col bg-secondary rounded-xl p-8 gap-12 mb-8'>
      <div className='flex w-full justify-between'>
        <h2 className='text-2xl font-semibold'>Shop by brands</h2>
        <Link href="/">
          <Button variant="ghost" className="text-lg hover:cursor-pointer">View All</Button>
        </Link>
      </div>
      <div className='grid grid-cols-8 w-full gap-4'>
        <Link href="/">
          <div className='w-full aspect-w-4 aspect-h-3 bg-background py-2 rounded-md hover:shadow-2xl shadow-muted hoverEffect'>
            <Image src={brandLogo} alt='brand logo' />
          </div>
        </Link>
        <Link href="/">
          <div className='w-full aspect-w-4 aspect-h-3 bg-background py-2 rounded-md hover:shadow-2xl shadow-muted hoverEffect'>
            <Image src={brandLogo} alt='brand logo' />
          </div>
        </Link>
        <Link href="/">
          <div className='w-full aspect-w-4 aspect-h-3 bg-background py-2 rounded-md hover:shadow-2xl shadow-muted hoverEffect'>
            <Image src={brandLogo} alt='brand logo' />
          </div>
        </Link>
        <Link href="/">
          <div className='w-full aspect-w-4 aspect-h-3 bg-background py-2 rounded-md hover:shadow-2xl shadow-muted hoverEffect'>
            <Image src={brandLogo} alt='brand logo' />
          </div>
        </Link>
        <Link href="/">
          <div className='w-full aspect-w-4 aspect-h-3 bg-background py-2 rounded-md hover:shadow-2xl shadow-muted hoverEffect'>
            <Image src={brandLogo} alt='brand logo' />
          </div>
        </Link>
        <Link href="/">
          <div className='w-full aspect-w-4 aspect-h-3 bg-background py-2 rounded-md hover:shadow-2xl shadow-muted hoverEffect'>
            <Image src={brandLogo} alt='brand logo' />
          </div>
        </Link>
        <Link href="/">
          <div className='w-full aspect-w-4 aspect-h-3 bg-background py-2 rounded-md hover:shadow-2xl shadow-muted hoverEffect'>
            <Image src={brandLogo} alt='brand logo' />
          </div>
        </Link>
        <Link href="/">
          <div className='w-full aspect-w-4 aspect-h-3 bg-background py-2 rounded-md hover:shadow-2xl shadow-muted hoverEffect'>
            <Image src={brandLogo} alt='brand logo' />
          </div>
        </Link>
      </div>
      <div className='grid grid-cols-4 p-4 shadow-lg shadow-muted'>
        <div className='w-full flex justify-center gap-4 group hover:cursor-pointer'>
          <FiTruck className='text-5xl group-hover:scale-90 group-hover:text-chart-1 hoverEffect'/>
          <div>
            <p className='text-md font-medium'>Free Delivery</p>
            <p className='text-sm text-secondary-foreground'>Free shipping over 50rb</p>
          </div>
        </div>
        <div className='w-full flex justify-center gap-4 group hover:cursor-pointer'>
          <BiSupport className='text-5xl group-hover:scale-90 group-hover:text-chart-1 hoverEffect'/>
          <div>
            <p className='text-md font-medium'>Customer Support</p>
            <p className='text-sm text-secondary-foreground'>Friendly 27/7 customer support</p>
          </div>
        </div>
        <div className='w-full flex justify-center gap-4 group hover:cursor-pointer'>
          <RiRecycleLine className='text-5xl group-hover:scale-90 group-hover:text-chart-1 hoverEffect'/>
          <div>
            <p className='text-md font-medium'>Free Return</p>
            <p className='text-sm text-secondary-foreground'>Free shipping over 50rb</p>
          </div>
        </div>
        <div className='w-full flex justify-center gap-4 group hover:cursor-pointer'>
          <AiOutlineFileProtect className='text-5xl group-hover:scale-90 group-hover:text-chart-1 hoverEffect'/>
          <div>
            <p className='text-md font-medium'>Money Back guarantee</p>
            <p className='text-sm text-secondary-foreground'>Quality checked by our team</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShopByBrands