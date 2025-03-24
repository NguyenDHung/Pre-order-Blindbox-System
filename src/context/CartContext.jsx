import { createContext, useState } from "react";
import { useContext } from "react";
import { GetAllCart } from "../api/Cart/ApiCart";

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
   const [cartData, setCartData] = useState()

   const CallGetAllCart = async () => {
      const response = await GetAllCart();
      setCartData(response)
   }

   return (
      <CartContext.Provider value={{ cartData, setCartData, CallGetAllCart }}>
         {children}
      </CartContext.Provider>
   )
}