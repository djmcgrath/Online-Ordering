import React from 'react'

export default function CartCard({cartItem}) {
  return (
    <div>{cartItem.menu_item.item_name}</div>
  )
}
