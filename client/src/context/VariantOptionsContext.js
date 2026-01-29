import { createContext, useState } from "react"
export const VariantContext = createContext(null)

function VariantOptionsContext(props) {
  const [selectedVariantOptions, setSelectedVariantOptions] = useState({name:'Color',options:["Phantom Gray","Phantom White","Phantom Pink"]});

  return (
    <VariantContext.Provider value={{ selectedVariantOptions, setSelectedVariantOptions }}>
      {props.children}
    </VariantContext.Provider>
  )
}

export default VariantOptionsContext