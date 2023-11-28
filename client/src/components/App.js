import React, { useEffect, useState } from "react";
import { Switch, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import NavLayout from "./NavLayout";
import Menu from "./Menu";
import Cart from "./Cart";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="Menu" element={<Menu />} />
        <Route path="Cart" element={<Cart />} />
      </Route>
    )
  )

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
