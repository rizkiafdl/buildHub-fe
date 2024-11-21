import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"

import Ideas from "@/pages/Ideas"
import Dummy from "@/pages/Dummy"
import Menu from "@/pages/Menu"
import BiddingPage from "@/components/Modules/MenuPage/Bidding/BiddingPage"
import ItemsPage from "@/components/Modules/MenuPage/Bidding/ItemsPage/itemsPage"

import PaymentPage from "@/components/Modules/MenuPage/PaymentPage/PaymentPage"
import OrderPage from "@/components/Modules/MenuPage/OrderPage/OrderPage"
import CartList from "@/components/Modules/MenuPage/Cart/CartList"
import SuccPage from '@/components/Modules/MenuPage/SuccessPage/successPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dummy />
  },
  {
    path: "/ideas",
    element: <Ideas />
  },
  {
    path: "/about",
    element: <Ideas />
  },
  {
    path: "/services",
    element: <Ideas />
  },
  {
    path: "/careers",
    element: <Ideas />
  },
  {
    path: "/contact",
    element: <Ideas />
  },
  {
    path: "/menu",
    element: <Menu />,
    children: [
      {
        path: "home",
        element: <BiddingPage />,
        children: [
          {
            path: ":itemId", // Changed to use URL parameter
            element: <ItemsPage />
          }
        ]
      },
      {
        path: "cart",
        element: <CartList />
      },
      {
        path: "payment",
        element: <PaymentPage />
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "success",
        element: <SuccPage/>
      }

    ]
  }
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)