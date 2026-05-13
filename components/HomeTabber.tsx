'use client'
import { Button } from './ui/button'
import Link from 'next/link'

const HomeTabber = ({ selectedTab, onTabSelect}: { selectedTab: string; onTabSelect: (tab: string) => void }) => {
  return (
    <div className='flex w-full justify-between'>
        <div className='flex gap-4'>
            <Button 
              className="px-6 text-md font-semibold rounded-full"
              onClick={() => onTabSelect('gadget')}
            >
              Gadget
            </Button>
            <Button 
              className="px-6 text-md font-semibold rounded-full"
              onClick={() => onTabSelect('electronics')}
            >
              Electronics
            </Button>
            <Button className="px-6 text-md font-semibold rounded-full">Gadget</Button>
        </div>
        <Button className="px-6 text-md font-semibold rounded-full">
            <Link href="/shop">See All</Link>
        </Button>
    </div>
  )
}

export default HomeTabber