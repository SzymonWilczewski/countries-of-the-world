import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">
                <h2>COUNTRIES OF THE WORLD</h2>
            </Link>

            <ul id="navLinks">
                <Link to="/list">
                    <li>LIST OF COUNTRIES</li>
                </Link>
                <Link to="favourites">
                    <li>MY FAVOURITES</li>
                </Link>
                <Link to="/form">
                    <li>ADD YOUR OWN COUNTRY</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Navbar;
