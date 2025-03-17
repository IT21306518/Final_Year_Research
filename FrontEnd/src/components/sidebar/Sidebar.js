// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBill, FaHome, FaUser, FaCommentDots, FaQuestionCircle, FaCog, FaSignOutAlt, FaHatCowboy, FaChartBar } from 'react-icons/fa';
import './sidebar.css'

const Sidebar = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <Link to="#">
            <span className="nav-icon"><img src={'https://cdn-icons-png.flaticon.com/512/1473/1473504.png'} height={60} alt='icon'/></span>
            <span className="title">GOLD PROJECT</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <span className="nav-icon"><FaHome className="ic"/></span>
            <span className="title">Summary</span>
          </Link>
        </li>
        <li>
          <Link to="#">
            <span className="nav-icon"><FaUser className="ic"/></span>
            <span className="title">My Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/gold-prediction">
            <span className="nav-icon"><FaMoneyBill className="ic"/></span>
            <span className="title">Future Preiction</span>
          </Link>
        </li>
        <li>
          <Link to="#">
            <span className="nav-icon"><FaCog className="ic"/></span>
            <span className="title">Settings</span>
          </Link>
        </li>
        <li>
          <Link to="#">
            <span className="nav-icon"><FaSignOutAlt className="ic"/></span>
            <span className="title">Sign Out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
