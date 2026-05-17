'use client'

import { brandData } from "@/constants/data"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { useState } from "react"
import { Button } from "../ui/button"

const BrandList = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  return (
    <div className="w-full flex flex-col">
      <h2 className='font-semibold'>Brands</h2>
      <RadioGroup value={selectedBrand} className="mt-4">
        {brandData.map((brand, index) => (
          <div className="flex items-center gap-3 hover:cursor-pointer hover:text-primary" key={index} onClick={() => setSelectedBrand(brand.href as string)}>
            <RadioGroupItem value={brand.href as string} id={brand.href} />
            <Label htmlFor={brand.href} className={`hover:cursor-pointer ${selectedBrand == brand.href as string && "text-primary"}`}>{brand.title}</Label>
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