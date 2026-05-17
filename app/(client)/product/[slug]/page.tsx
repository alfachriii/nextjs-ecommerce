import Container from '@/components/Container'
import PriceView from '@/components/PriceView'
import ProductCharacteristics from '@/components/ProductCharacteristics'
import ProductTabber from '@/components/ProductTabber'
import RelatedProduct from '@/components/RelatedProduct'
import { Button } from '@/components/ui/button'
import Separator from '@/components/ui/separator'
import Link from 'next/link'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { FiTruck } from 'react-icons/fi'
import { GrReturn } from 'react-icons/gr'
import { IoShareSocialOutline } from 'react-icons/io5'
import { MdOutlineCompare } from 'react-icons/md'
import Counter from '@/components/Counter'
import { getProductBySlug } from '@/sanity/queries'
import { notFound } from 'next/navigation'
import ImageView from '@/components/ImageView'
import { Product } from '@/sanity.types'

// const ProductPage = async () => {
const ProductPage = async ({ params }: { params: Promise<{ slug: string}> }) => {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if(!product) {
        notFound();
    }
    return (
      <main className='my-8 mt-32'>
          <Container>
              <div className='grid grid-cols-2'>
                  {product?.images && (
                    <ImageView images={product.images} />
                  )}
                  <div className='flex flex-col px-8'>
                      <h1 className='text-3xl font-bold text-wrap'>{product?.name}</h1>
                      <p className='text-md text-secondary-foreground'>{product?.description}</p>
                      <Separator className='my-4' />
                      <PriceView price={product?.price} discount={product?.discount} className='flex-row-reverse text-2xl justify-end gap-4' />
                      <span className='w-fit px-3 py-2 mt-4 text-sm text-primary bg-primary/20 rounded-lg'>
                          In Stock
                      </span>
                      <Separator className='my-4' />
                      <div className='flex justify-between items-center'>
                          <p className='text-secondary-foreground'>Quantity</p>
                          <Counter />
                      </div>
                      <div className='grid grid-cols-2 gap-4 w-full my-4'>
                          <Button className="py-6">
                              <Link href="/" className='text-lg font-mono'>BUY NOW</Link>
                          </Button>
                          <Button className="py-6" variant="outline">
                              <Link href="/" className='text-lg font-mono'>ADD TO CART</Link>
                          </Button>
                      </div>
                      <ProductCharacteristics />
                      <Separator />
                      <div className='flex w-full mt-8'>
                          <span className='shrink w-full flex gap-2 items-center hover:text-red-500 hoverEffect'>
                              <MdOutlineCompare className='text-lg' />
                              <p className='text-sm'>Compare Color</p>
                          </span>
                          <span className='shrink w-full flex gap-2 items-center hover:text-red-500 hoverEffect'>
                              <AiOutlineQuestionCircle className='text-lg' />
                              <p className='text-sm'>Ask a question</p>
                          </span>
                          <span className='shrink w-full flex gap-2 items-center hover:text-red-500 hoverEffect'>
                              <FiTruck className='text-lg' />
                              <p className='text-sm'>Delivery & Return</p>
                          </span>
                          <span className='shrink flex gap-2 items-center hover:text-red-500 hoverEffect'>
                              <IoShareSocialOutline className='text-lg' />
                              <p className='text-sm'>Share</p>
                          </span>       
                      </div>
                      <Separator className='my-4' />
                      <div className='flex w-full flex-col border-2 border-secondary-foreground/30'>
                          <div className='w-full flex items-center gap-4 p-4'>
                              <FiTruck className='text-4xl text-orange-500' />
                              <div>
                                  <p className='font-semibold'>Free Delivery</p>
                                  <p className='text-secondary-foreground text-sm underline'>Enter your Postal code for Delivey Availability.</p>
                              </div>
                          </div>
                          <Separator />
                          <div className='w-full flex items-center gap-4 p-4'>
                              <GrReturn className='text-4xl text-orange-500' />
                              <div>
                                  <p className='font-semibold'>Return Delivery</p>
                                  <p className='text-secondary-foreground text-sm underline'>Free 30days Delivery Returns. <Link href="/help">Details</Link></p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <ProductTabber />
              <RelatedProduct />
          </Container>
      </main>
    )
}

export default ProductPage