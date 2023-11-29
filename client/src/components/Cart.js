import { React, useEffect, useState } from 'react';
import CartCard from './CartCard';


function Cart({ currentId, setCurrentId, currentCart, setCurrentCart }) {

    const [quantityValue, setQuantityValue] = useState(1)

    function handlePatch(cartItemId, qv){
        console.log(cartItemId)
        console.log(quantityValue)
        fetch(`/cartmenuitems/${cartItemId}`, {
          method: "PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({"quantity": qv})
        })
        .then(res => res.json())
        .then(res => console.log(res))
    }

    console.log(currentCart)
    let cartList = currentCart.map((cartItem) => <CartCard quantityValue={quantityValue} setQuantityValue={setQuantityValue} handlePatch={handlePatch} key={cartItem.id} cartItem={cartItem} />)

    useEffect(() => {
        fetch(`/carts/${currentId}`)
            .then(res => res.json())
            .then(response => setCurrentCart(response.cart_menu_item))
    }, [])


    function handlePost() {
        fetch("/carts")
    }

    console.log(currentCart)
    console.log(quantityValue)
    console.log(typeof quantityValue)

    return (
        <div>
            <div>
                <h2 className='text-4xl'>Cart</h2>
            </div>
            <div>{cartList}</div>
        </div>
    )
}

export default Cart