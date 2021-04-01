import React from 'react';
import AddProduct from '../AddProduct/AddProduct';
import Grid from '@material-ui/core/Grid';
import './Admin.css'
import Sidebar from '../Sidebar/Sidebar';

const Admin = () => {
    return (
        <div className="adminDiv">
           <Grid container>
           <Grid lg={4} className="sideMenu">
               <Sidebar></Sidebar>
            </Grid>
            <Grid lg={8}>
                <AddProduct></AddProduct>
            </Grid>
           </Grid>
        </div>
    );
};

export default Admin;