'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import Separator from "../ui/separator"

interface Props {
  selectedPrice: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
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