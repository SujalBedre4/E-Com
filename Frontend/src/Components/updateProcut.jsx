import React, { useEffect, useState } from "react";


import { Navigate, useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate()


    // This is for API calling:
    const getProductDetails = async () => {
        // Here, we are fetching the "Dynamic" ID's
        let result = await fetch(`http://localhost:4500/products/${params.id}`)
        result = await result.json()
        // console.log(result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const params = useParams()
    // We want to just call this atmost once. So, we are using the useEffect
    useEffect(() => {
        console.log(params)
        getProductDetails()
    }, [])

    const token = JSON.parse(localStorage.getItem('token'))

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:4500/products/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json",
                authorization: `bearer ${token}`
            }
        })
        result = await result.json()
        console.warn(result)
        navigate("/")
    };

    return (
        <div className="products">
            <h1>Update Product</h1>
            <input
                className="InputBoxs"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter product name"
            />
            <input
                className="InputBoxs"
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="Enter product price"
            />
            <input
                className="InputBoxs"
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder="Enter product category"
            />
            <input
                className="InputBoxs"
                type="text"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
                placeholder="Enter product company"
            />
            <button className="appButtons" type="button" onClick={updateProduct}>
                Update  Product
            </button>
        </div>
    );
}

export default UpdateProduct;
