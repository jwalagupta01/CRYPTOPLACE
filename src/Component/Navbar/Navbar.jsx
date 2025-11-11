import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { ImArrowUpRight2 } from "react-icons/im";
import { CoinContext } from "../../Context/CoinContex";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

 const navigate = useNavigate();

  let { setCurrency } = useContext(CoinContext);
  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      default : {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
    }
  };

  return (
    <nav className="navbar border-bottom border-2 border-secondary d-flex align-items-center justify-content-between">
      <img src={logo} alt="" onClick={() => navigate('/home')}/>
      <ul className="d-flex fw-medium text-light list-unstyled">
        <li onClick={() => navigate('/home')}>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav_right d-flex align-items-center">
        <select
          onChange={currencyHandler}
          name=""
          id=""
          className="rounded px-2 mt-1 border border-1 text-light"
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button className="btn bg-light rounded-pill px-4 py-2">
          Sign In <ImArrowUpRight2 />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
