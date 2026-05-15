'use client'
import { ButtonGroup } from './ui/button-group'
import { Button } from './ui/button'
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from 'react'
import { LuMinus, LuPlus } from 'react-icons/lu';

const Counter = () => {
    const [quantity, setQuantity] = useState(1);

    const isPlusButtonDisable = () => {
        // TODO: validate if quantity > available stock
    }

    const isMinusButtonDisable = () => {
        if(quantity == 1) return true
        return false;
    }
  return (
    <ButtonGroup className='border-2 border-secondary-foreground/30 rounded-xl'>
        <Button variant="ghost" size="icon" disabled={isMinusButtonDisable()} onClick={() => setQuantity(quantity - 1)}><LuMinus /></Button>
        <input className='w-16 text-foreground font-mono flex items-center px-4 pl-6' value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
        <Button variant="ghost" onClick={() => setQuantity(quantity + 1)}><LuPlus /></Button>
    </ButtonGroup>
  )
}

export default Counter