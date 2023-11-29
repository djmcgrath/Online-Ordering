import React from 'react'

function MenuItem({handleAdd, menuItem}) {

    function handleAddToCart(){
        console.log(menuItem.id)
        handleAdd(menuItem.id)
    }


    return(
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200 mx-2 my-3">
            <div className="collapse-title text-2xl font-medium">
                <div>
                    {menuItem.item_name}
                    <button className="bg-[#1a1a1a] btn btn-xs hover:bg-red-600 justify-center mx-3" onClick={handleAddToCart}>Add To Cart</button>
                </div>
            </div>
            <div className="collapse-content">
                <p>{menuItem.description}</p>
                <div>
                    <p className="text-xl font-extrabold">${menuItem.cost}</p>
                </div>
            </div>
        </div>
        // <div>
        //     <h1>{menuItem.item_name}</h1>
        // </div>
    )
}


export default MenuItem;