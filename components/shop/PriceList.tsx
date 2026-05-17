'use client'

import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import Separator from "../ui/separator"
import { Span } from "next/dist/trace"

const priceArray = [
  { title: "Under Rp1.000.000", value: "0-1000000" },
  { title: "Rp1.000.000 - Rp2.000.000", value: "1000000-2000000" },
  { title: "Rp2.000.000 - Rp4.000.000", value: "2000000-4000000" },
  { title: "Rp4.000.000 - Rp5.000.000", value: "4000000-5000000" },
  { title: "Over Rp5.000.000", value: "5000000-50000000" },
];

const PriceList = () => {
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const setPriceRange = () => {
    if(minPrice || maxPrice) {
      const strPrice = `${minPrice}-${maxPrice}`;
      setSelectedPrice(strPrice);
      return;
    }
    
    return setSelectedPrice(null);
  }

  const resetInput = () => {
    setSelectedPrice(null);
    setMinPrice("");
    setMaxPrice("");
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className='font-semibold'>Price</h2>
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center gap-2">
          <Input
            type="number"
            placeholder="Rp MIN"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
          <Separator className="flex-1" />
          <Input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Rp MAX"
            className="flex-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
        </div>
        <div className="w-full flex flex-col mt-4">
          <Button
            onClick={setPriceRange}>Apply</Button>
        </div>
      </div>
      {selectedPrice && (
        <Button variant="ghost" onClick={resetInput} className="underline w-fit hover:cursor-pointer hover:text-red-500">Reset selection</Button>
      )}
    </div>
  )
}

export default PriceList