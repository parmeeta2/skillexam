import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage and redirect to home page
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const isLoggedIn = localStorage.getItem('jwtToken') !== null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white mt-3 md-3">
      <div className="container">
        <Link className="navbar-brand fs-4" to="/" style={{ fontFamily: 'cursive' }}>
          MOODFOOD
        </Link>
{/* adding empty div for extra space */}
<div className="flex-grow-1"></div>
        <form className="mx-auto row g-3 align-items-center">
          <div className="col-auto">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
          </div>
          <div className="col-auto">
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </div>
        </form>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ml-auto">

            {isLoggedIn ? (
              <>
                {/* Display CART, MY ORDERS, and LOGOUT links when logged in */}
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    CART
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/myorders">
                    MY ORDERS
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    LOGOUT
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Display REGISTER and LOGIN links when not logged in */}
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    REGISTER
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    LOGIN
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
