import {useState, useEffect, React} from 'react'


export default function CartCard({cartItem, currentCart, setCurrentCart}) {
  let menuItem = cartItem.menu_item
  const [quantityValue, setQuantityValue] = useState(1)

  useEffect(()=>{setQuantityValue(cartItem.quantity)}, [])

  function handlePatch(cartItemId, newQuantity){
    let updatedQuantity = newQuantity
    if(newQuantity === ""){
      updatedQuantity = 1
    }
    // console.log(cartItemId)
    // console.log(updatedQuantity)
    fetch(`/cartmenuitems/${cartItemId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"quantity": updatedQuantity})
    })
    .then(res => res.json())
    .then(res => {
      let itemIndex = currentCart.findIndex((cItem)=> cItem.id === cartItemId)
      let updatedCart = [...currentCart]
      updatedCart[itemIndex].quantity = parseInt(updatedQuantity)
      setCurrentCart(updatedCart)
    })
  }

  function handleDelete(cartItemId){
    console.log(cartItemId)
    fetch(`/cartmenuitems/${cartItemId}`, {
      method: "DELETE"
    })
    .then(res => {
      let updatedCart = currentCart.filter((cItem)=> cItem.id !== cartItemId)
      console.log(updatedCart)
      setCurrentCart(updatedCart)
    })
  }

  return (
    <div id='cards' className="card card-side bg-base-100 shadow-xl mx-2 my-3">
      <figure><img className='height: 1rem; width: 1rem;' src={menuItem.image} alt={menuItem.item_name} /></figure>
      <div className="card-body">
        <h2 className="card-title">{menuItem.item_name}</h2>
        <p>{menuItem.description}</p>
        <p>${menuItem.cost}</p>
        <div className="card-actions justify-end">
          <input type="number" value={quantityValue} onChange={(e) => { setQuantityValue(e.target.value); handlePatch(cartItem.id, e.target.value) }} className="bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:border-red-600 transition duration-500 text-gray-400 width:0.5rem"></input>
          <button onClick={(e) => handleDelete(cartItem.id)} className="bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:bg-red-600 transition duration-500 text-gray-400">Remove</button>
        </div>
      </div>
    </div>
  )
}
