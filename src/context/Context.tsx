import { createContext, useState } from "react";

export const ContextProvider = ({ children }: any) => {
  const [open, setOpen] = useState<boolean>(false)
  const stopScroll = () => {
    !open ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
  }

  const obj = {
    open,
    setOpen, stopScroll
  }
  return (
    <Context.Provider value={obj}>
      {children}
    </Context.Provider>
  )
}

export const Context = createContext<any>(1);
export default Context;




