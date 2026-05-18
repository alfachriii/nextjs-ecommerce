import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
import ServicesBanner from './ServicesBanner'
import { getAllBrands } from '@/sanity/queries'
import { BRANDS_QUERY_RESULT } from '@/sanity.types'
import { generateImageUrl } from '@/lib/utils'

const ShopByBrands = async () => {
  const brands: BRANDS_QUERY_RESULT = await getAllBrands();

  return (
    <section className='w-full flex flex-col bg-secondary rounded-xl p-8 gap-12 mb-8'>
      <div className='flex w-full justify-between'>
        <h2 className='text-2xl font-semibold'>Shop by brands</h2>
        <Link href="/">
          <Button variant="ghost" className="text-lg hover:cursor-pointer">View All</Button>
        </Link>
      </div>
      <div className='grid grid-cols-8 w-full gap-4'>
        {brands.map((brand) => (
        <Link href={`/shop?brand=${brand.slug?.current}`} key={brand._id}>
          <div className='w-full aspect-w-4 aspect-h-3 bg-background py-2 rounded-md hover:shadow-2xl shadow-muted hoverEffect'>
            {brand.image?.url && (
              <Image
                src={generateImageUrl(brand.image?.url, 200)}
                width={200}
                height={200}
                alt='brand logo' />
            )}
          </div>
        </Link>
        ))}
      </div>
      <ServicesBanner />
    </section>
  )
}

export default ShopByBrands