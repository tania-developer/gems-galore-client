import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css'

const Sidebar = (props) => {
    const handleManage = props.handleManage;
    const handleAdd = props.handleAdd;
    return (
        <div className="sidebar">
            <h2>Gems Galore</h2>
            <button className="adminButton" onClick={handleManage}> <FontAwesomeIcon icon={faTasks} /> Manage Products </button>
            <button className="adminButton" onClick={handleAdd}><FontAwesomeIcon icon={faPlus} /> Add Products</button>
            <button className="adminButton"><FontAwesomeIcon icon={faEdit} /> Edit Product </button> 
        </div>
    );
};

export default Sidebar;