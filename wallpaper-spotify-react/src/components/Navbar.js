import React, { useState } from 'react'
import './Navbar.css';

function Navbar() {
  const [state1, setState1] = useState(false)
  return (
    <>
      <div id="NavbarWrap">
        <div id="logo">
        </div>
    </div>
    </>
  )
}

export default Navbar











// import React, { useState } from 'react'
// import {Link} from 'react-router-dom'

// function Navbar() {
//   const [click, setClick] = useState(false)
//   const handleClick = () => setClick(!click)
//   return (
//     <>
//       <nav className="navbar">
//         <div className="navbar-container">
//           <Link to="/" className="navbar-logo">
//             SPTWP
//           </Link>
//           <div className="menu-icon" onClick={handleClick}>
//             <i className={click ? 'fas fa-times':'fas fa-bars'} />
//           </div>
//           <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//             <li className='nav-item'>
//               <Link to='/' className='nav-links'>
//                 Home
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </>
//   )
// }

// export default Navbar