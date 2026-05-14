'use client'
import { useState } from 'react'
import { ButtonGroup } from './ui/button-group'
import { Button } from './ui/button'
import Separator from './ui/separator'

const ProductTabber = () => {
    const [tab, setTab] = useState<"description" | "additional">("description")
  return (
    <div className='w-full flex flex-col gap-4'>
        <div className='w-2/5 flex bg-secondary rounded-lg gap-1'>
            <Button variant="ghost" 
            onClick={() => setTab("description")}
            className={`shrink w-full rounded-lg font-semibold hover:text-primary ${tab == "description" && "text-primary font-bold border-2 border-primary"}`}>Description</Button>
            <Button variant="ghost" 
            onClick={() => setTab("additional")}
            className={`shrink w-full px-8  font-semibold hover:text-primary ${tab == "additional" && "text-primary font-bold border-2 border-primary"}`}>Additional Information</Button>
        </div>
        {(tab === "description") ? (
            <p className='text-sm text-secondary-foreground'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem fuga odio, molestiae voluptas a asperiores ipsam? Incidunt itaque doloribus beatae quidem, ea reiciendis. Eaque quibusdam animi temporibus deserunt recusandae! Esse.</p>
        ) : (
            <p className='text-sm text-secondary-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis itaque eum quia enim corrupti quod reiciendis cumque fugit! Rem autem fugit provident quod, eaque suscipit!</p>
        )}
        <Separator />
    </div>
  )
}

export default ProductTabber