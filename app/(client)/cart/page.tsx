import Container from '@/components/Container'
import Image from 'next/image'
import productImage from '@/images/product/product_1.png'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IoTrashOutline } from 'react-icons/io5'
import Counter from '@/components/Counter'
import PriceFormatter from '@/components/PriceFormatter'
import Separator from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Field, FieldContent, FieldDescription, FieldLabel } from '@/components/ui/field'

const CartPage = () => {
  return (
    <main className='w-full min-h-screen my-24'>
        <Container>
            <h1 className='text-3xl font-bold'>Shopping Cart</h1>
            <div className='w-full grid grid-cols-3 gap-8'>
                <div className='col-span-2 bg-secondary/30 flex flex-col h-fit border-2 border-secondary-foreground/30 rounded-xl'>
                    <div className='w-full flex gap-4 p-4 border-b-2 border-secondary-foreground/30'>
                        <Link
                            href="/"
                            className='aspect-w-1 aspect-h-1 w-1/4 bg-secondary/50 border-2 border-secondary-foreground/30 rounded-lg group'>
                            <Image src={productImage} alt="product" className='w-full h-full object-cover group-hover:scale-115 hoverEffect' />
                        </Link>
                        <div className='w-3/4 flex flex-col gap-8'>
                            <div className='w-full flex justify-between'>
                                <div>
                                     <p className='text-sm text-secondary-foreground'>GADGET ACCESSORY</p>
                                     <h3 className='text-2xl font-semibold'>Macbook Pro 13 Inch</h3>
                                </div>
                                <button>
                                    <IoTrashOutline className='text-2xl hover:cursor-pointer hover:text-red-500 hoverEffect' />
                                </button>
                            </div>
                            <div className='w-full flex items-baseline justify-between'>
                                <Counter />
                                <PriceFormatter amount={32000000} className='font-bold text-xl' />
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex gap-4 p-4 border-b-2 border-secondary-foreground/30'>
                        <Link
                            href="/"
                            className='aspect-w-1 aspect-h-1 w-1/4 bg-secondary/50 border-2 border-secondary-foreground/30 rounded-lg group'>
                            <Image src={productImage} alt="product" className='w-full h-full object-cover group-hover:scale-115 hoverEffect' />
                        </Link>
                        <div className='w-3/4 flex flex-col gap-8'>
                            <div className='w-full flex justify-between'>
                                <div>
                                     <p className='text-sm text-secondary-foreground'>GADGET ACCESSORY</p>
                                     <h3 className='text-2xl font-semibold'>Macbook Pro 13 Inch</h3>
                                </div>
                                <button>
                                    <IoTrashOutline className='text-2xl hover:cursor-pointer hover:text-red-500 hoverEffect' />
                                </button>
                            </div>
                            <div className='w-full flex items-baseline justify-between'>
                                <Counter />
                                <PriceFormatter amount={32000000} className='font-bold text-xl' />
                            </div>
                        </div>
                    </div>
                    <div className='w-full p-6'>
                        <Button variant="destructive">Reset Cart</Button>
                    </div>
                </div>
                <div className='flex flex-col h-fit gap-8'>
                    <div className='bg-secondary/30 flex flex-col h-fit border-2 border-secondary-foreground/30 p-4 pt-6 gap-4 rounded-xl'>
                        <h2 className='text-2xl font-semibold'>Order Summary</h2>
                        <div className='w-full flex justify-between'>
                            <p>SubTotal</p>
                            <PriceFormatter amount={32000000} className='font-semibold' />
                        </div>
                        <div className='w-full flex justify-between'>
                            <p>Discount</p>
                            <PriceFormatter amount={3200000} className='font-semibold' />
                        </div>
                        <Separator />
                        <div className='w-full text-xl font-semibold flex justify-between'>
                            <p>Discount</p>
                            <PriceFormatter amount={3200000} className='font-semibold' />
                        </div>
                        <Button className="rounded-2xl" size="lg">Proceed to Checkout</Button>
                    </div>
                    <div className='bg-secondary/30 flex flex-col h-fit border-2 border-secondary-foreground/30 p-4 pt-6 gap-4 rounded-xl'>
                        <h2 className='font-semibold'>Delivery Addresses</h2>
                        <RadioGroup>
                            <Field orientation="horizontal">
                              <RadioGroupItem value="default" id="desc-r1" />
                              <FieldContent>
                                <FieldLabel htmlFor="desc-r1">My Address</FieldLabel>
                                <FieldDescription>
                                  Jakarta, ID. Lorem ipsum dolor sit amet consectetur.
                                </FieldDescription>
                              </FieldContent>
                            </Field>
                            <Field orientation="horizontal">
                              <RadioGroupItem value="default" id="desc-r1" />
                              <FieldContent>
                                <FieldLabel htmlFor="desc-r1">My Address</FieldLabel>
                                <FieldDescription>
                                  Jakarta, ID. Lorem ipsum dolor sit amet consectetur.
                                </FieldDescription>
                              </FieldContent>
                            </Field>
                            <Field orientation="horizontal">
                              <RadioGroupItem value="default" id="desc-r1" />
                              <FieldContent>
                                <FieldLabel htmlFor="desc-r1">My Address</FieldLabel>
                                <FieldDescription>
                                  Jakarta, ID. Lorem ipsum dolor sit amet consectetur.
                                </FieldDescription>
                              </FieldContent>
                            </Field>
                        </RadioGroup>
                        <Button variant="outline">Add new address</Button>
                    </div>
                </div>
            </div>
        </Container>
    </main>
  )
}

export default CartPage