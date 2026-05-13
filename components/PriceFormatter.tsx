interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const formattedPrice = new Number(amount).toLocaleString("id-ID", {
    currency: "IDR",
    style: "currency",
    minimumFractionDigits: 2,
  });

  return (
    <span className={className}>
      {formattedPrice}
    </span>
  )
}

export default PriceFormatter