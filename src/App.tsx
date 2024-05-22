import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createContext, useState } from "react"

import { Home } from "./pages/home"
import { Dashboard } from "./pages/dashboard"

import "./App.css"
import { Product } from "./types"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])
type GlobalStateContext = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
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
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }
  return (
    <div className="App">
      <Context.Provider value={{ state, handleAddToCart }}>
        <RouterProvider router={router} />
      </Context.Provider>
    </div>
  )
}

export default App
