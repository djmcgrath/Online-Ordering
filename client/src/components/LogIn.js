import {useState, React} from 'react'
import { useNavigate } from 'react-router-dom'

function LogIn({user, setUser}) {
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
            navigate("/")
        })
    }

  return (
    <div className="flex flex-col">
        <h1>LogIn</h1>
        <div className="flex flex-col">
            <form onSubmit={(e)=>handleLogIn(e)} className="flex flex-col bg-[#111111] p-3 rounded-xl">
                <label>Username</label>
                <input 
                type="text"
                value={username}
                placeholder='Username'
                className='flex flex-grow bg-[#1a1a1a] rounded-xl p-3 text-gray-400'
                onChange={(e) => setUsername(e.target.value)}
                ></input>
                <label>Email</label>
                <input 
                type="text"
                value={email}
                placeholder='Email'
                className='flex flex-grow bg-[#1a1a1a] rounded-xl p-3 text-gray-400'
                onChange={(e) => setEmail(e.target.value)}
                ></input>
                <label>Password</label>
                <input 
                type="password"
                value={password}
                placeholder='Password'
                className='flex flex-grow bg-[#1a1a1a] rounded-xl p-3 text-gray-400'
                onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button type="submit" className='flex flex-grow bg-[#1a1a1a] rounded-xl p-3 text-gray-400'>Sign In</button>
            </form>
        </div>
        <button onClick={goToSignUp} className=''>Sign Up?</button>
    </div>
  )
}

export default LogIn