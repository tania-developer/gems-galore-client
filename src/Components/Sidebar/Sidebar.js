import React from 'react';
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Gems Galore</h2>
            <button>Manage Products</button>
            <p>Add Products</p>
            <p>Edit Products</p> 
        </div>
    );
};

export default Sidebar;