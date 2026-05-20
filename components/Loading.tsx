import { Spinner } from "./ui/spinner"


const Loading = () => {
  return (
    <div className='fixed top-0 right-0 w-screen h-screen bg-foreground/30 backdrop-blur-xs z-50 flex items-center justify-center'>
        <Spinner className="size-8" />
    </div>
  )
}

export default Loading