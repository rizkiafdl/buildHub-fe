import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"

import Ideas from "@/pages/Ideas"
import Dummy from "@/pages/Dummy"
import Menu from "./pages/Menu"
import BiddingPage from "./components/Modules/MenuPage/Bidding"

import HomePage from "./components/Modules/MenuPage/Home"
import InboxPage from "./components/Modules/MenuPage/Inbox"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dummy />, // Your default page (landing page)
  },
  {
    path: "/ideas",
    element: <Ideas />, // Your default page (landing page)
  },
  {
    path: "/about",
    element: <Ideas />, // Your default page (landing page)
  },
  {
    path: "/services",
    element: <Ideas />, // Your default page (landing page)
  },
  {
    path: "/careers",
    element: <Ideas />, // Your default page (landing page)
  },
  {
    path: "/contact",
    element: <Ideas />, // Your default page (landing page)
  },
  {
    path: "/menu",
    element: <Menu />, // Persistent layout
    children: [
      {
        path: "bidding", // Nested under "/menu"
        element: <BiddingPage />,
      },
      {
        path: "home", // Nested under "/menu"
        element: <HomePage />,
      },
      {
        path: "inbox", // Nested under "/menu"
        element: <InboxPage />,
      },
      {
        path: "careers", // Nested under "/menu"
        element: <Dummy />,
      },
      {
        path: "contact", // Nested under "/menu"
        element: <Dummy />,
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
