import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import './AddProduct.css'

const AddProduct = () => {
    const { register, handleSubmit, errors } = useForm();
    const [imgUrl, setImgUrl] = useState(null);

    const onSubmit = data => {
        const pdData = {
            name: data.Name,
            price: data.price,
            details: data.details,
            imgUrl: imgUrl
        }
        fetch('http://localhost:5000/addProduct',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(pdData)
        })
        .then(res => console.log('server side response', res));
        };

    const handleImage = event =>{
        const imageData = new FormData();
        imageData.set('key', 'c2591ce672b45bd63749672d354a304d');
        imageData.append('image', event.target.files[0]);


        axios.post('https://api.imgbb.com/1/upload', 
            imageData
          )
          .then(function (response) {
            setImgUrl(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="addForm">
            <h3>Add products</h3>
            <label>Product Name</label>
            <input name="Name" defaultValue="ring" ref={register} />
            <label>Product Description</label>
            <input
                name="details"
                ref={register({ required: true, maxLength: 40 })}
            />
            <label>Price</label>
            <input name="price" type="number" required ref={register}/>
            <input name="image" type="file" onChange={handleImage}/>
            {errors.exampleRequired && <p>This field is required</p>}
            <input type="submit" />
        </form>
    );
};

export default AddProduct;