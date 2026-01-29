import { createContext, useState } from "react"
export const UserContext = createContext(null)

function UserIdContext(props) {
  const [selectedCategory, setSelectedCategory] = useState({Product_Category_Id:'1',Category_Name:'All Products'});

  return (
    <UserContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserIdContext