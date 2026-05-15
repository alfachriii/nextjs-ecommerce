'use client'

import { categoriesData } from "@/constants/data"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { useState } from "react"
import { Button } from "../ui/button"

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  return (
    <div className="w-full flex flex-col">
      <h2 className='font-semibold'>Product Categories</h2>
      <RadioGroup value={selectedCategory} className="mt-4">
        {categoriesData.map((category, index) => (
          <div className="flex items-center gap-3 hover:cursor-pointer hover:text-primary" key={index} onClick={() => setSelectedCategory(category.href as string)}>
            <RadioGroupItem value={category.href as string} id={category.href} />
            <Label htmlFor={category.href} className={`hover:cursor-pointer ${selectedCategory == category.href as string && "text-primary"}`}>{category.title}</Label>
          </div>
        ))}
      </RadioGroup>
      {selectedCategory && (
        <Button variant="ghost" onClick={() => setSelectedCategory(null)} className="underline w-fit hover:cursor-pointer hover:text-red-500">Reset selection</Button>
      )}
    </div>
  )
}

export default CategoryList