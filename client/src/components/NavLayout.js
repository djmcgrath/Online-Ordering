import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

export default function NavLayout({currentCart}) {

    function sumQuantity(array) {
        let sum = 0;
    
        for (let i = 0; i < array.length; i += 1) {
            sum += array[i].quantity
        }
        return sum;
      }


    return (
        <div>
            <header>
                <h1 className='mx-2'>Online Ordering</h1>
                <nav className=' flex align-center my-2 mx-2'>
                    <NavLink to='/' className="mx-0.5 bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:border-red-600 transition duration-500 text-gray-400" >Home</NavLink>
                    <NavLink to='Menu' className="mx-0.5 bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:border-red-600 transition duration-500 text-gray-400" >Menu</NavLink>
                    <div className="indicator">
                        <span className="indicator-item badge badge-primary">{sumQuantity(currentCart)}</span> 
                        <NavLink to='Cart' className="mx-0.5 bg-[#1a1a1a] p-3 rounded-xl border-gray-900 hover:border-2  hover:border-red-600 transition duration-500" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </NavLink>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
