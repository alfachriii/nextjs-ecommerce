import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

const CartIcon = () => {
  return (
    <Link href="/cart" className="relative hoverEffect hover:text-chart-1">
        <IoCartOutline className="text-2xl" />
        <span className="absolute -top-2 -right-2 text-xs p-0.5 px-1 rounded-xl bg-chart-5 text-primary-foreground">0</span>
    </Link>
  )
}

export default CartIcon