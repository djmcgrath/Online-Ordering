import React, { useEffect, useState } from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import NavLayout from "./NavLayout"
import Home from "./Home";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavLayout />}>
        <Route path="/home" element={<Home />} />
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App;
