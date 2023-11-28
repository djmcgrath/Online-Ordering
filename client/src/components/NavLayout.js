import React from 'react'
import { NavLink, Outlet }  from 'react-router-dom'

export default function NavLayout() {
    
    return (
        <div>
           <header> 
            <nav >
                <h1 className='handtext'>Online Ordering</h1>
                <button className='dropdown'><NavLink to="/home">Home</NavLink></button>
            </nav>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      )
}
