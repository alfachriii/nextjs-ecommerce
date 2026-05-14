import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
import brandLogo from "@/images/brands/brand_1.png"
import ServicesBanner from './ServicesBanner'

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
      <ServicesBanner />
    </section>
  )
}

export default ShopByBrands