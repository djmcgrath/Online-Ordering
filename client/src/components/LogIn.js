import {useState, React} from 'react'
import { useNavigate } from 'react-router-dom'

function LogIn({user, setUser, setCurrentId, setCurrentCart}) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const goToSignUp = () => {
        navigate("/signup")
    }

    function handleLogIn(e){
        e.preventDefault()
        let user_info = {
            "username": username,
            "email": email,
            "password": password
        }
        fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user_info)
        })
        .then(res => res.json())
        .then(res => {
            setUser(res)
            handleCheckCreateCart(res.id)
            navigate("/")
        })
    }

    function handleCheckCreateCart(customerId){
        let existingCart = null
        fetch("/carts")
        .then(res => res.json())
        .then(carts => {
            existingCart = carts.find((cart) => cart.customer_id === customerId)
            if(!existingCart){
                fetch("/carts", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({"customer_id": parseInt(customerId)})
                })
                .then(res => res.json())
                .then(newCart => {
                    console.log(newCart.id)
                    setCurrentId(newCart.id);
                    handleFetchCart(newCart.id)
                });
            }else{
                console.log(existingCart.id)
                setCurrentId(existingCart.id)
                handleFetchCart(existingCart.id)
            }
        })
    }
    function handleFetchCart(ncurrentID){
        fetch(`/carts/${ncurrentID}`)
      .then(res => res.json())
      .then(response => setCurrentCart(response.cart_menu_item))
    }

  return (
    <div className="flex flex-col border border-base-300 bg-base-200 rounded-xl p-3 w-2/4 mx-auto my-10">
        <h1 className="flex flex-row mx-auto my-3">Login</h1>
        <div className="flex flex-col">
            <form onSubmit={(e)=>handleLogIn(e)} className="flex flex-col bg-[#111111] p-3 rounded-xl">
                <label>Username:</label>
                <input 
                type="text"
                value={username}
                placeholder='Username'
                className='flex flex-grow bg-[#1a1a1a] rounded-xl p-3 text-gray-400'
                onChange={(e) => setUsername(e.target.value)}
                ></input>
                <label>Email:</label>
                <input 
                type="text"
                value={email}
                placeholder='Email'
                className='flex flex-grow bg-[#1a1a1a] rounded-xl p-3 text-gray-400'
                onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label>Password:</label>
                <input 
                type="password"
                value={password}
                placeholder='Password'
                className='flex flex-grow bg-[#1a1a1a] rounded-xl p-3 text-gray-400'
                onChange={(e) => setPassword(e.target.value)}
                ></input>
            </form>
        </div>
        <button onClick={(e) => handleLogIn(e)} type="submit" className='flex flex-row border border-base-300 bg-[#1a1a1a] rounded-xl p-3 text-gray-400 items-center mx-auto my-3 w-64 hover:border-2  hover:border-red-600 transition duration-500'>Sign In</button>

        <button onClick={goToSignUp} className='flex flex-row border border-base-300 items-center mx-auto my-3 w-64 hover:border-2  hover:border-red-600 transition duration-500'>Sign Up?</button>
    </div>
  )
}

export default LogIn