'use client'

import { categoriesData } from "@/constants/data"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { useState } from "react"
import { Button } from "../ui/button"

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100 - $200", value: "100-200" },
  { title: "$200 - $300", value: "200-300" },
  { title: "$300 - $500", value: "300-500" },
  { title: "Over $500", value: "500-10000" },
];

const PriceList = () => {
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null)
  return (
    <div className="w-full flex flex-col">
      <h2 className='font-semibold'>Product Categories</h2>
      <RadioGroup value={selectedPrice} className="mt-4">
        {priceArray.map((price, index) => (
          <div className="flex items-center gap-3 hover:cursor-pointer hover:text-primary" key={index} onClick={() => setSelectedPrice(price.value)}>
            <RadioGroupItem value={price?.value} id={price.value} />
            <Label htmlFor={price.value} className={`hover:cursor-pointer ${selectedPrice == price.value as string && "text-primary"}`}>{price.title}</Label>
          </div>
        ))}
      </RadioGroup>
      {selectedPrice && (
        <Button variant="ghost" onClick={() => setSelectedPrice(null)} className="underline w-fit hover:cursor-pointer hover:text-red-500">Reset selection</Button>
      )}
    </div>
  )
}

export default PriceList