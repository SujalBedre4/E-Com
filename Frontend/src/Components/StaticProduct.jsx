import React, { useEffect, useState } from "react";
import "./CSS File/products.css";
import { Link } from "react-router-dom";

function StaticProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    // This is for the API calling
    const token = JSON.parse(localStorage.getItem('token'))
    const getProducts = async () => {
        try {
            let result = await fetch("http://localhost:4500/products", {
                headers: {
                    authorization: `bearer ${token}`
                }
            });
            result = await result.json();
            setProducts(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            let result = await fetch(`http://localhost:4500/products/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `bearer ${token}`
                }
            });
            result = await result.json();
            if (result) {
                getProducts(); 
            } else {
                alert("Not deleted");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };


    const searchHandle = async (event) => {
        let key = event.target.value;

        // If there is no value in the "key" then we will call our main function
        if (key) {
            try {
                const token = JSON.parse(localStorage.getItem('token'));
                let result = await fetch(`http://localhost:4500/search/${key}`, {
                    headers: {
                        authorization: `bearer ${token}`
                    }
                });
                result = await result.json();
                if (result) {
                    setProducts(result);
                }
            } catch (error) {
                console.error("Error searching products:", error);
            }
        } else {
            getProducts();
        }
    };


    return (
        <div className="sunny">
            <div className="products">
                <h3>Product List</h3>
                <div className="search-container">
                    <div className="search">
                        <input type="text" placeholder="Search Product" onChange={searchHandle} />
                        {/* <button onClick={searchHandle}>Search</button> */}
                    </div>
                </div>
                <ul className="product-header">
                    <li>S. No</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Company</li>
                    <li>Operation</li>
                </ul>
                {
                    products.length > 0 ? products.map((product) => (
                        <ul key={product._id} className="product-item">
                            <li>{products.indexOf(product) + 1}</li>
                            <li>{product.name}</li>
                            <li>{product.price}</li>
                            <li>{product.category}</li>
                            <li>{product.company}</li>
                            <li>
                                <button onClick={() => deleteProduct(product._id)}>Delete</button>
                                <Link to={`/update/${product._id}`}>Update</Link>
                            </li>
                        </ul>
                    ))
                        : <h1>No result found</h1>
                }
            </div>
        </div >
    );
}

export default StaticProduct;
