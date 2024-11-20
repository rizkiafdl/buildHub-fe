import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"

import Ideas from "@/pages/Ideas"
import Dummy from "@/pages/Dummy"
import Menu from "./pages/Menu"
import BiddingPage from "./components/Modules/MenuPage/Bidding"
import ItemsPage from "@/components/Modules/MenuPage/Bidding/ItemsPage/itemsPage"
import HomePage from "@/components/Modules/MenuPage/Home"
import InboxPage from "@/components/Modules/MenuPage/Inbox"

import PaymentPage from "./components/Modules/MenuPage/Cart/OrderPage/PaymentPage/PaymentPage"
import OrderPage from "./components/Modules/MenuPage/Cart/OrderPage/OrderPage"

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
        path: "bidding",
        element: <BiddingPage />,
        children: [
          {
            path: ":itemId", // Changed to use URL parameter
            element: <ItemsPage />
          }
        ]
      },
      {
        path: "home",
        element: <HomePage />
      },
      {
        path: "inbox",
        element: <InboxPage />
      },
      {
        path: "cart",
        children: [
          {
            path: "order", // Changed to use URL parameter
            element: <OrderPage />,
            children: [
              {
                path: "payment", // Changed to use URL parameter
                element: <PaymentPage />
              }
            ]
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)