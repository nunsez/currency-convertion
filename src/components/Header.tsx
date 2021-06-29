import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
    <nav>
        <ul>
            <li><Link to="/">Converter</Link></li>
            <li><Link to="/rates">Rates</Link></li>
        </ul>
    </nav>
);

export default Header;
