'use client'

import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { BrandResult } from "@/sanity/types"

interface Props {
  brands: BrandResult[];
  selectedBrand: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {

  return (
    <div className="w-full flex flex-col">
      <h2 className='font-semibold'>Brands</h2>
      <RadioGroup value={selectedBrand} className="mt-4">
        {brands.map((brand, index) => (
          <div className="flex items-center gap-3 hover:cursor-pointer hover:text-primary" key={index} onClick={() => setSelectedBrand(brand?.slug?.current as string)}>
            <RadioGroupItem value={brand.slug?.current as string} id={brand.slug?.current} />
            <Label htmlFor={brand?.slug?.current} className={`hover:cursor-pointer ${selectedBrand == brand?.slug?.current as string && "text-primary"}`}>{brand.title}</Label>
          </div>
        ))}
      </RadioGroup>
      {selectedBrand && (
        <Button variant="ghost" onClick={() => setSelectedBrand(null)} className="underline w-fit hover:cursor-pointer hover:text-red-500">Reset selection</Button>
      )}
    </div>
  )
}

export default BrandList