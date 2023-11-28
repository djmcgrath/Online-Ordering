import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

export default function NavLayout() {
    return (
        <div>
            <header>
                <h1>Ski Colorado</h1>
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    <Link to='Menu'>Menu</Link>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
      )
}
