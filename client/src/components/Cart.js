import { React, useEffect, useState } from 'react';
import CartCard from './CartCard';


function Cart({currentId, setCurrentId, currentCart, setCurrentCart}) {

  let cartList = currentCart.map((cartItem)=> <CartCard key={cartItem.id} cartItem={cartItem} currentCart={currentCart} setCurrentCart={setCurrentCart}/>)

  useEffect(() => {
    fetch(`/carts/${currentId}`)
    .then(res => res.json())
    .then(response => setCurrentCart(response.cart_menu_item))
  }, [])


    return (
        <div className='bg-inherit'>
            <div className='bg-inherit'>
                <h2 className='text-4xl mx-2'>Cart</h2>
            </div>
            <div className='bg-inherit'>{cartList}</div>
            <footer className='height:100px bg-inherit'></footer>
        </div>
    )
}

export default Cart