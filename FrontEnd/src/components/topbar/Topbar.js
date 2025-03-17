import React from 'react';
import './topbar.css'

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="toggle">
        <ion-icon name="menu-outline"></ion-icon>
      </div>
      <div className="search">
        <label>
          <input type="text" placeholder="Search here" />
          <ion-icon name="search-outline"></ion-icon>
        </label>
      </div>
      <div className="user">
        <img src={'https://i.pinimg.com/originals/26/61/9c/26619c16b5451afaa95956dff93ae3e5.jpg'} alt='icon'/>
      </div>
    </div>
  );
};

export default Topbar;
