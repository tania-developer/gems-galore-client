import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { UserContext } from '../../App';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const Checkout = () => {
    const { id } = useParams();
    const classes = useStyles();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext); 

    const [singleProduct, setSingleProduct] = useState([]);


        useEffect(() => {
            fetch(`https://shielded-scrubland-74010.herokuapp.com/product/${id}`)
                .then(res => res.json())
                .then(data => setSingleProduct(data))
        }, [id])

    const handleCheckOut = () => {
        console.log('clicked',singleProduct[0].name, loggedInUser.email);
        const orderData = {
            email: loggedInUser.email, 
            name : singleProduct[0].name, 
            price: singleProduct[0].price, 
            date: new Date(),
            image: singleProduct[0].image
        }
        fetch('https://shielded-scrubland-74010.herokuapp.com/orderProduct',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(res => console.log('server side response', res));
    }

    return (
        <div style={{width:'80%', margin:'0 auto'}}>
            <h2>Checkout</h2>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {singleProduct.map((pd) => (
                            <TableRow key={pd._id}>
                                <TableCell component="th" scope="row">
                                    {pd.name}
                                </TableCell>
                                <TableCell align="right">1</TableCell>
                                <TableCell align="right">{pd.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <button onClick={handleCheckOut}>CheckOut</button>

        </div>
    );
};

export default Checkout;