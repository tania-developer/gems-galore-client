import React, { useState } from 'react';
import AddProduct from '../AddProduct/AddProduct';
import Grid from '@material-ui/core/Grid';
import './Admin.css'
import Sidebar from '../Sidebar/Sidebar';
import ManageProduct from '../ManageProduct/ManageProduct';


const Admin = () => {
    const [manage, setManage] = useState(false);

    const handleManage= () => {
        setManage(true);
    }
    const handleAdd= () => {
        setManage(false);
    }
    const deleteProduct = (id) => {
        fetch(`http://localhost:5000/delete/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }
    return (
        <div className="adminDiv">
           <Grid container>
           <Grid lg={4} className="sideMenu">
               <Sidebar handleManage={handleManage} handleAdd={handleAdd}></Sidebar>
            </Grid>
            <Grid lg={8}>
                { manage ? <ManageProduct deleteProduct={deleteProduct}></ManageProduct> :
                      <AddProduct></AddProduct>
                  }
            </Grid>
           </Grid>
        </div>
    );
};

export default Admin;