'use client'

import { categoriesData } from "@/constants/data"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { useState } from "react"
import { Button } from "../ui/button"
import { CATEGORIES_QUERY_RESULT } from "@/sanity.types"

interface Props {
  categories: CATEGORIES_QUERY_RESULT;
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>
}

const CategoryList = ({ categories, selectedCategory, setSelectedCategory }: Props) => {
  
  return (
    <div className="w-full flex flex-col">
      <h2 className='font-semibold'>Product Categories</h2>
      <RadioGroup value={selectedCategory} className="mt-4">
        {categories.map((category, index) => (
          <div className="flex items-center gap-3 hover:cursor-pointer hover:text-primary" key={index} onClick={() => setSelectedCategory(category.slug?.current as string)}>
            <RadioGroupItem value={category.slug?.current as string} id={category.slug?.current} />
            <Label htmlFor={category.slug?.current} className={`hover:cursor-pointer ${selectedCategory == category.slug?.current as string && "text-primary"}`}>{category.title}</Label>
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