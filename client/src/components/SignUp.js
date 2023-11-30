import {useState, React} from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp({user, setUser}) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordCompare, setPasswordCompare] = useState(true)
    const [nname, setNname] = useState("")

    const navigate = useNavigate();

    const goToLogIn = () => {
        navigate("/login")
    }

    function handleSetPassword(pw) {
        setPassword(pw);
        handlePasswordCompare(pw, confirmPassword);
    }

    function handleSetConfirmPassword(pw) {
        setConfirmPassword(pw);
        handlePasswordCompare(password, pw);
    }

    function handlePasswordCompare(pw1, pw2) {
        setPasswordCompare(pw1 === pw2);
    }

    let passwordNotify = !passwordCompare ? <p className='font-bold text-red-600'>*Passwords must match.</p> : null


    function handleSignUp(e){
        e.preventDefault()
        if(passwordCompare == false){
            alert("Passwords must match")
        }else{
            let new_user = {
                username: username,
                email: email,
                customer_name: nname,
                password: password
            }
            fetch("/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(new_user)
            })
            .then(res => res.json())
            .then(goToLogIn)
        }
    }

  return (
      <div className="flex flex-col">
          <h1>Sign Up</h1>
          <div className="flex flex-col">
              <form onSubmit={(e) => handleSignUp(e)} className="flex flex-col bg-[#111111] p-3 rounded-xl">
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
                  <label>Name</label>
                  <input
                      type="text"
                      value={nname}
                      placeholder='Name'
                      className='flex flex-grow bg-[#1a1a1a] rounded-xl p-3 text-gray-400'
                      onChange={(e) => setNname(e.target.value)}
                  ></input>
                  <label>Password</label>
                  <input
                      type="password"
                      value={password}
                      placeholder='Password'
                      className='flex flex-grow bg-[#1a1a1a] rounded-xl p-3 text-gray-400'
                      onChange={(e) => {handleSetPassword(e.target.value)}}
                  ></input>
                  <label>Confirm Password</label>
                  <input
                      type="password"
                      value={confirmPassword}
                      placeholder='Confirm Password'
                      className='flex flex-grow bg-[#1a1a1a] rounded-xl p-3 text-gray-400'
                      onChange={(e) => {handleSetConfirmPassword(e.target.value)}}
                  ></input>
                  <div>
                    {passwordNotify}
                  </div>
                  <button type="submit" className='flex flex-grow bg-[#1a1a1a] rounded-xl p-3 text-gray-400'>Sign Up</button>
              </form>
          </div>
        <button onClick={goToLogIn}>Log In?</button>
    </div>
  )
}
export default SignUp
