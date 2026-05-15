import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

const PriceView = ({ price, discount, className = "text-md" }: Props) => {
  return (
    <div className={cn("flex flex-wrap items-center", className)}>
        {discount && (
            <PriceFormatter amount={discount} className="line-through text-gray-500" />
        )}
        <PriceFormatter amount={price} className="font-bold text-chart-5" />
    </div>
  )
}

export default PriceView