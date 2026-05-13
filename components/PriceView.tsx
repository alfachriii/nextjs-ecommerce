import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

const PriceView = ({ price, discount, className }: Props) => {
  return (
    <div className="flex flex-wrap items-center">
        {discount && (
            <PriceFormatter amount={discount} className="text-xs line-through text-gray-500" />
        )}
        <PriceFormatter amount={price} className="text-sm font-semibold text-chart-5" />
    </div>
  )
}

export default PriceView