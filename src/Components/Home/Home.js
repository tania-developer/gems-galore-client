import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Container from '@material-ui/core/Container';
import './Home.css'
import { useHistory } from 'react-router';

const Home = () => {
    const [products, setProduct] = useState([]);
    

    const history = useHistory()
    const handleCheckOut = (id) => {
        history.push(`/checkout/${id}`);
      
        console.log(id);
    }

    useEffect(() => {
        fetch('https://shielded-scrubland-74010.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])
    return (
        
            <div className="productContainer">
                {
                    products.map(pd => <ProductCard pd={pd} handleCheckOut={handleCheckOut} key={pd._id}></ProductCard>)
                }
            </div>
       
    );
};

export default Home;