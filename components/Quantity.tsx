'use client'
import { ButtonGroup } from './ui/button-group'
import { Button } from './ui/button'
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from 'react'
import { Input } from './ui/input';

const Quantity = () => {
    const [quantity, setQuantity] = useState(1);

    const isPlusButtonDisable = () => {
        // TODO: validate if quantity > available stock
    }

    const isMinusButtonDisable = () => {
        if(quantity == 1) return true
        return false;
    }
  return (
    <ButtonGroup>
        <Button variant="ghost" size="icon" disabled={isMinusButtonDisable()} onClick={() => setQuantity(quantity - 1)}><FaMinus /></Button>
        <input className='w-16 text-foreground flex items-center px-4 pl-6' value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
        <Button variant="ghost" onClick={() => setQuantity(quantity + 1)}><FaPlus /></Button>
    </ButtonGroup>
  )
}

export default Quantity