import { Button } from './ui/button'
import Link from 'next/link'

interface Props {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const HomeTabber = ({ selectedTab, setSelectedTab}: Props) => {
  return (
    <div className='flex w-full justify-between'>
        <div className='flex gap-4'>
            <Button
              variant={`${selectedTab === "gadget" ? "default" : "outline"}`}
              className="px-6 text-md font-semibold rounded-full"
              onClick={() => setSelectedTab('gadget')}
            >
              Gadget
            </Button>
            <Button 
              variant={`${selectedTab === "electronics" ? "default" : "outline"}`}
              className="px-6 text-md font-semibold rounded-full"
              onClick={() => setSelectedTab('electronics')}
            >
              Electronics
            </Button>
            <Button
            variant={`${selectedTab === "appliances" ? "default" : "outline"}`}
              onClick={() => setSelectedTab('gadget')} 
              className="px-6 text-md font-semibold rounded-full">Appliances</Button>
        </div>
        <Button className="px-6 text-md font-semibold rounded-full">
            <Link href="/shop">See All</Link>
        </Button>
    </div>
  )
}

export default HomeTabber