import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#851753",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const ManageProduct = (props) => { 
    const deleteProduct = props.deleteProduct;
    const [allProduct, setAllProduct] = useState([]);
    useEffect(() => {
        fetch('https://shielded-scrubland-74010.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setAllProduct(data))
    }, [])
    const classes = useStyles();

    return (
        <div style={{margin:"30px"}}>
            <h3>Manage Products</h3>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Product Name</StyledTableCell>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell align="left">Price</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allProduct.map((pd) => (
                            <StyledTableRow key={pd._id}>
                                <StyledTableCell component="th" scope="row">
                                    {pd.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {pd.details}
                                </StyledTableCell>
                                <StyledTableCell align="left">${pd.price}</StyledTableCell>
                                <StyledTableCell align="right"><button onClick={()=>deleteProduct(pd._id)}><FontAwesomeIcon icon={faTrashAlt} /></button></StyledTableCell>
                               
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageProduct;