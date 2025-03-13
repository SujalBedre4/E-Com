import React, { useState } from "react";

function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const addProduct = async () => {
        // Check if any field is empty
        if (!name || !price || !category || !company) {
            setError(true);
            return;
        }

        setError(false); // Reset error state if all fields are valid

        console.log(name, price, category, company);

        try {
            const userId = JSON.parse(localStorage.getItem("user"))._id;
            console.log(userId);

            let result = await fetch("http://localhost:4500/add", {
                method: "post",
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            result = await result.json();
            console.log(result);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="products">
            <input
                className="InputBoxs"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter product name"
            />
            {error && !name && <span className="invalidInput">Enter valid name</span>}

            <input
                className="InputBoxs"
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="Enter product price"
            />
            {error && !price && <span className="invalidInput">Enter valid price</span>}

            <input
                className="InputBoxs"
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                placeholder="Enter product category"
            />
            {error && !category && <span className="invalidInput">Enter valid category</span>}

            <input
                className="InputBoxs"
                type="text"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
                placeholder="Enter product company"
            />
            {error && !company && <span className="invalidInput">Enter valid company</span>}

            <button className="appButtons" type="button" onClick={addProduct}>
                Add Product
            </button>
        </div>
    );
}

export default AddProduct;
