import { toast } from "sonner"
import { limitString } from "./utils"

export const myToast = {
   success: (messages: string, descriptions?: string) => {
      if(descriptions) {
         return toast.success(messages, { duration: 3000, position: "bottom-right", description: limitString(`${descriptions}`, 30) });
      }

      return toast.success(messages, { duration: 3000, position: "bottom-right" });
   },
   error: (messages: string, descriptions?: string) => {
      if (descriptions) {
         return toast.error(messages, { duration: 3000, position: "bottom-right", description: limitString(`${descriptions}`, 30) })
      }

      return toast.error(messages, { duration: 3000, position: "bottom-right" })
   }
}