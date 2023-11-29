import { React, useEffect, useState } from 'react';
import CartCard from './CartCard';


function Cart({currentId, setCurrentId, currentCart, setCurrentCart}) {

  let cartList = currentCart.map((cartItem)=> <CartCard key={cartItem.id} cartItem={cartItem} currentCart={currentCart}/>)

  useEffect(() => {
    fetch(`/carts/${currentId}`)
    .then(res => res.json())
    .then(response => setCurrentCart(response.cart_menu_item))
  }, [])

  function handlePost() {
    fetch("/carts")
  }

  console.log(currentCart)

  return (
    <div>{cartList}</div>
  )
}

export default Cart;