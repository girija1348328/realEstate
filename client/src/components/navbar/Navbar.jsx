import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">RealEstate</span>
        </Link>
        
          <div className="navItems">
            <button className="navButton">Register</button>
            <Link to = "/login">
            <button className="navButton">Login</button>
            </Link>
            
          </div>
       
      </div>
    </div>
  );
};

export default Navbar;