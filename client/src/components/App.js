import React, { useEffect, useState } from "react";
import { Switch, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import NavLayout from "./NavLayout";
import Menu from "./Menu";
import Cart from "./Cart";

function App() {
  const [menuItems, setMenuItems] = useState([])
  const [currentId, setCurrentId] = useState(1)
  const [currentCart, setCurrentCart] = useState([])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="Menu" element={<Menu menuItems = {menuItems} setMenuItems = {setMenuItems} currentId = {currentId} setCurrentId = {setCurrentId} currentCart = {currentCart} setCurrentCart = {setCurrentCart}/>} />
        <Route path="Cart" element={<Cart currentId = {currentId} setCurrentId = {setCurrentId} currentCart = {currentCart} setCurrentCart = {setCurrentCart}/>} />
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
