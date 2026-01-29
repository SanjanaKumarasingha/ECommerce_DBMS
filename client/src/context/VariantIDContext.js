import { createContext, useState } from "react"
export const  VarientItemContext = createContext(null)

function ProductIDContext(props) {
  const [selectedVariantID, setSelectedVariantID] = useState('3');

  return (
    <VarientItemContext.Provider value={{ selectedVariantID, setSelectedVariantID }}>
      {props.children}
    </VarientItemContext.Provider>
  )
}

export default ProductIDContext