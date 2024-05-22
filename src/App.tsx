import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createContext, useState } from "react"

import { Home } from "./pages/home"
import { Dashboard } from "./pages/dashboard"

import "./App.css"
import { Product } from "./types"
import api from "./api"
import { useQuery } from "@tanstack/react-query"
import ProductService from "../src/api/products"

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
  products: {
    items: Product[] | undefined
    errors: undefined | Error
  }
}

export const Context = createContext<GlobalStateContext | null>(null)

function App() {
  // Queries
  const { data, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductService.getAll
  })

  const [state, setState] = useState<GlobalState>({
    cart: [],
    products: {
      items: undefined,
      errors: undefined
    }
  })

  if (data && !state.products.items) {
    setState({
      ...state,
      products: {
        ...state.products,
        items: data
      }
    })
  }
  if (error && !state.products.errors) {
    setState({
      ...state,
      products: {
        ...state.products,
        errors: error
      }
    })
  }
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
