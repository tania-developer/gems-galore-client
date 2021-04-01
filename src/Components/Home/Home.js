import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Container from '@material-ui/core/Container';
import './Home.css'

const Home = () => {
    const [products, setProduct] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])
    return (
        
            <div className="productContainer">
                {
                    products.map(pd => <ProductCard pd={pd}></ProductCard>)
                }
            </div>
       
    );
};

export default Home;