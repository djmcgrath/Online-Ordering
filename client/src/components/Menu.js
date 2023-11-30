import React from 'react'
import { useState , useEffect} from 'react'
import MenuItem from './MenuItem'


function Menu({currentId, setCurrentId, currentCart, setCurrentCart, menuItems, setMenuItems}) {
// const [menuItemId, setMenuItemId] = useState(0)

  useEffect(() => {
    fetch(`/carts/${currentId}`)
    .then(res => res.json())
    .then(response => setCurrentCart(response.cart_menu_item))
  }, [currentCart.length])


  console.log(currentCart)
  // handleAdd()
  function handleAdd(menuItemId){
    let cartItemIds = currentCart.map((cartItem) => cartItem.menu_item_id)
    if(!cartItemIds.includes(menuItemId)){
      handlePost(menuItemId)
    }else{
      let cartItem = currentCart.find((cartItem) => cartItem.menu_item_id == menuItemId)
      console.log(cartItem)
      let newQuantity = cartItem.quantity + 1
      console.log(newQuantity)
      handlePatch(cartItem.id, newQuantity)
    }
  }

  function handlePatch(cartItemId, newQuantity){
    fetch(`/cartmenuitems/${cartItemId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"quantity": newQuantity})
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      let updatedCart = [...currentCart]
      console.log(updatedCart[cartItemId-1].quantity)
      updatedCart[cartItemId-1].quantity = res.quantity
      console.log(updatedCart[cartItemId-1].quantity)
      setCurrentCart(updatedCart)
      console.log(currentCart)
    })
  }

  function handlePost(menuItemId, quantity = 1) {
    let addToCart = {
      "cart_id": currentId,
      'quantity': quantity,
      "menu_item_id": menuItemId
      }
    fetch("/cartmenuitems", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(addToCart)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setCurrentCart([...currentCart, addToCart])
    })
  }

  useEffect(()=>{
    fetch("/menuitems")
    .then(res => res.json())
    .then(res => setMenuItems(res))
  }, [])

  let menuItemsList = menuItems.map((menuItem)=> <MenuItem key={menuItem.id} menuItem={menuItem}/>)

  let dessertMenuItemsList = menuItems.filter((menuItem)=> menuItem.item_category === "Desserts")
  let dessertMenuItems = dessertMenuItemsList.map((menuItem)=> <MenuItem key={menuItem.id} handleAdd={handleAdd} menuItem={menuItem}/>)

  let appetizersMenuItemsList = menuItems.filter((menuItem)=> menuItem.item_category === "Appetizers")
  let appetizersMenuItems = appetizersMenuItemsList.map((menuItem)=> <MenuItem key={menuItem.id} handleAdd={handleAdd} menuItem={menuItem}/>)

  let mainCourseMenuItemsList = menuItems.filter((menuItem)=> menuItem.item_category === "Main Course")
  let mainCourseMenuItems = mainCourseMenuItemsList.map((menuItem)=> <MenuItem key={menuItem.id} handleAdd={handleAdd} menuItem={menuItem}/>)

  let saladsMenuItemsList = menuItems.filter((menuItem)=> menuItem.item_category === "Salads")
  let saladsMenuItems = saladsMenuItemsList.map((menuItem)=> <MenuItem key={menuItem.id} handleAdd={handleAdd} menuItem={menuItem}/>)

  let soupsMenuItemsList = menuItems.filter((menuItem)=> menuItem.item_category === "Soups")
  let soupsMenuItems = soupsMenuItemsList.map((menuItem)=> <MenuItem key={menuItem.id} handleAdd={handleAdd} menuItem={menuItem}/>)

  let beveragesMenuItemsList = menuItems.filter((menuItem)=> menuItem.item_category === "Beverages")
  let beveragesMenuItems = beveragesMenuItemsList.map((menuItem)=> <MenuItem key={menuItem.id} handleAdd={handleAdd} menuItem={menuItem}/>)
  
  // console.log(filteredMenuItems)
  // console.log(cCatagory)

  return (
    <>
      <div>
        <h2 className='text-4xl mx-2'>Menu</h2>
      </div>
      <div>
        <div className="flex justify-center w-full py-2 gap-2">
          <a href="#item1" className="bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:border-red-600 transition duration-500 text-gray-400">Appetizers</a>
          <a href="#item2" className="bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:border-red-600 transition duration-500 text-gray-400">Beverages</a>
          <a href="#item3" className="bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:border-red-600 transition duration-500 text-gray-400">Soups</a>
          <a href="#item4" className="bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:border-red-600 transition duration-500 text-gray-400">Salads</a>
          <a href="#item5" className="bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:border-red-600 transition duration-500 text-gray-400">Main Courses</a>
          <a href="#item6" className="bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:border-red-600 transition duration-500 text-gray-400">Desserts</a>
        </div>
        <div className="carousel w-full">
          <div id="item1" className="carousel-item w-full justify-center">
            <div className="flex-row">
              {appetizersMenuItems}
            </div>
          </div>
          <div id="item2" className="carousel-item w-full justify-center">
            <div className="flex-row">
              {beveragesMenuItems}
            </div>
          </div>
          <div id="item3" className="carousel-item w-full justify-center">
            <div className="flex-row">
              {soupsMenuItems}
            </div>
          </div>
          <div id="item4" className="carousel-item w-full justify-center">
            <div className="flex-row">
              {saladsMenuItems}
            </div>
          </div>
          <div id="item5" className="carousel-item w-full justify-center">
            <div className="flex-row">
              {mainCourseMenuItems}
            </div>
          </div>
          <div id="item6" className="carousel-item w-full justify-center">
            <div className="flex-row">
              {dessertMenuItems}
            </div>
          </div>
        </div>
      </div>
      {/* <div>{filteredMenuItems}</div> */}
    </>
  )
}

export default Menu;