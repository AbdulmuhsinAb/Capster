import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { createContext, useEffect, useState } from "react"

import { Home } from "./pages/home"
import { Dashboard } from "./pages/dashboard"

import "./App.css"
import { DecodedUser, Product } from "./types"
import { ProductDetails } from "./pages/productDetails"

import { Signup } from "./pages/signup"
import { Login } from "./pages/login"
import { PrivateRoute } from "./components/PrivateRoute"
import { Catalog } from "./pages/catalog"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/Catalog",
    element: <Catalog />
  }
])
type GlobalStateContext = {
  state: GlobalState
  handleAddToCart: (product: Product) => void
  handleDeleteFromCart: (id: string) => void
  handleStoreUser: (user: DecodedUser) => void
  handleEmptyCart: () => void
  handleRemoveUser: () => void
}
type GlobalState = {
  cart: Product[]
  user: DecodedUser | null
}

export const Context = createContext<GlobalStateContext | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    user: null
  })
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const decodedUser = JSON.parse(user)
      setState({
        ...state,
        user: decodedUser
      })
    }
  }, [])
  const handleAddToCart = (product: Product) => {
    // const isDuplicated = state.cart.find((cartItem) => cartItem.id == product.id)
    // if (isDuplicated) return

    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }

  const handleDeleteFromCart = (id: string) => {
    const cart = state.cart
    const index = state.cart.findIndex((item) => item.id === id)
    cart.splice(index, 1)
    setState({
      ...state,
      cart: cart
    })
  }

  const handleEmptyCart = () => {
    setState({
      ...state,
      cart: []
    })
  }

  const handleStoreUser = (user: DecodedUser) => {
    setState({
      ...state,
      user
    })
  }

  const handleRemoveUser = () => {
    localStorage.removeItem("token")
    setState({
      ...state,
      user: null
    })
  }
  return (
    <div className="App">
      <Context.Provider
        value={{
          state,
          handleAddToCart,
          handleDeleteFromCart,
          handleStoreUser,
          handleEmptyCart,
          handleRemoveUser
        }}
      >
        <RouterProvider router={router} />
      </Context.Provider>
    </div>
  )
}

export default App
