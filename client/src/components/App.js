import React, { useEffect, useState } from "react";
import { Switch, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import NavLayout from "./NavLayout";
import Menu from "./Menu";
import Cart from "./Cart";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

function App() {
  const [menuItems, setMenuItems] = useState([])
  const [currentId, setCurrentId] = useState(null)
  const [currentCart, setCurrentCart] = useState([])
  const [user, setUser] = useState(null)


  useEffect(() => {
    fetch("/checksession").then((response) => {
      if (response.ok) {
        response.json().then((user) => {setUser(user); setCurrentId(user.id)});
      }
    });
  }, []);



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavLayout currentCart = {currentCart} user={user} setUser={setUser} setCurrentId={setCurrentId} currentId={currentId} setCurrentCart={setCurrentCart}/>}>
        <Route path="/" element={<Home />} />
        <Route path="Menu" element={<Menu menuItems = {menuItems} setMenuItems = {setMenuItems} currentId = {currentId} setCurrentId = {setCurrentId} currentCart = {currentCart} setCurrentCart = {setCurrentCart}/>} />
        <Route path="Cart" element={<Cart currentId = {currentId} setCurrentId = {setCurrentId} currentCart = {currentCart} setCurrentCart = {setCurrentCart}/>} />
        <Route path="login" element={<LogIn setCurrentId={setCurrentId} user={user} setUser={setUser} setCurrentCart={setCurrentCart}/>} />
        <Route path="signup" element={<SignUp  user={user} setUser={setUser}/>} />
      </Route>
    )
  )

  return (
    <div className='bg-fit-screen'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
