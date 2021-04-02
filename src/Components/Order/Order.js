import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Order = () => {  
    const classes = useStyles();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext); 
    const [orderPd, setOrderPd] = useState([])

    const email = loggedInUser.email;

    useEffect(() => {
        fetch('http://localhost:5000/product?email='+email)
            .then(res => res.json())
            .then(data => setOrderPd(data))
    }, [])
    return (
        <div style={{width:'80%', margin:'0 auto'}}>
            <h2>{loggedInUser.name} your order items</h2>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderPd.map((pd) => (
                            <TableRow key={pd._id}>
                                <TableCell component="th" scope="row">
                                    {pd.name}
                                </TableCell>
                                <TableCell align="right">{pd.price}</TableCell>
                                <TableCell align="right">{pd.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Order;<h3>hi iam coming</h3>