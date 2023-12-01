import { React, useEffect, useState } from 'react';
import CartCard from './CartCard';


function Cart({currentId, setCurrentId, currentCart, setCurrentCart}) {

  let cartList

  cartList = currentCart.map((cartItem)=> <CartCard key={cartItem.id} cartItem={cartItem} currentCart={currentCart} setCurrentCart={setCurrentCart}/>)

  console.log(currentCart)

  function sumCost(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].quantity === 1) {
          sum += array[i].menu_item.cost
      }
      else{
          sum += (array[i].menu_item.cost * array[i].quantity)
      }
    }
    return sum;
  }


  useEffect(() => {
    if(currentId !== null){
      fetch(`/carts/${currentId}`)
      .then(res => res.json())
      .then(response => setCurrentCart(response.cart_menu_item))
    }
  }, [])


    return (
      <>
        <div className='bg-inherit'>
            <div className='bg-inherit'>
                <h2 className='text-4xl mx-2'>Cart</h2>
            </div>
            <div className='bg-inherit'>{cartList}</div>
            <footer className='height:100px bg-inherit'></footer>
        </div>
        <div className='flex justify-center'>
          <div className="card w-96 bg-base-100 shadow-xl ">
            <div className="card-body">
              <h2 className="card-title justify-center">Total Cost:</h2>
              <p className="card-title justify-center">${sumCost(currentCart)}</p>
            </div>
          </div>
        </div>
      </>
    )
}

export default Cart