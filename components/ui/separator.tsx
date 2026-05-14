import { cn } from "@/lib/utils"

const Separator = ({ className }: { className?: string}) => {
  return (
    <span className={cn("w-full border-t-2 border-accent-foreground/20", className)}></span>
  )
}

export default Separator