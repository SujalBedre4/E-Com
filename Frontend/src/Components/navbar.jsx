import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Nav() {
    const auth = localStorage.getItem('user')
    const navigate = useNavigate()
    const logout = async () => {
        localStorage.clear()
        navigate('/signup')
    }
    return (
        <>
            <div className="nav">
            <img className="logo" alt="logo" src="https://cdnb.artstation.com/p/assets/images/images/055/228/903/large/chadrixy-randomlogo2.jpg?1666435943" />
                {auth ?
                    <ul className="Nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/add">Add Product</Link></li>
                        <li><Link to="/update">Update Product</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        {/* Here we are adding the user's name after loggged in. And convert that into the JSON data. */}
                        <li><Link onClick={logout} to="/logout">logout   ({JSON.parse(auth).name})</Link></li>

                    </ul> :
                    <ul className='Nav nav-right'>
                        <li><Link to="/signup">Sign up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                }
            </div >
        </>
    )
}

export default Nav


//             ) : (
//     <ul className="Nav">
//         <li><Link to="/signup">Sign up</Link></li>
//         <li><Link to="/login">Login</Link></li>
//     </ul>
// )}
//         </div >