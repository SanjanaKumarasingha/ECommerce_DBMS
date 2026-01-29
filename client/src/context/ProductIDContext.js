import { createContext, useState } from "react"
export const ProductContext = createContext(null)

function ProductIDContext(props) {
  const [selectedProductID, setSelectedProductID] = useState('0');

  return (
    <ProductContext.Provider value={{ selectedProductID, setSelectedProductID }}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductIDContext