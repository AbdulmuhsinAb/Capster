import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createContext, useState } from "react"

import { Home } from "./pages/home"
import { Dashboard } from "./pages/dashboard"

import "./App.css"
import { Product } from "./types"
import { ProductDetails } from "./pages/productDetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />
  }
])
type GlobalStateContext = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
}
type GlobalState = {
  cart: Product[]
}

export const Context = createContext<GlobalStateContext | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })

  const handleAddToCart = (product: Product) => {
    const isDuplicated = state.cart.find((cartItem) => cartItem.id == product.id)
    if (isDuplicated) return
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }

  const handleDeleteFromCart = (id: string) => {
    const filteredCart = state.cart.filter((item) => item.id !== id)
    setState({
      ...state,
      cart: filteredCart
    })
  }

  return (
    <div className="App">
      <Context.Provider value={{ state, handleAddToCart, handleDeleteFromCart }}>
        <RouterProvider router={router} />
      </Context.Provider>
    </div>
  )
}

export default App
