const express = require('express');
const app = express();
require("./Components/DB_Config");
const cors = require('cors');

const Users = require("./Components/users");
const Product = require('./Components/Product');

app.use(express.json());
app.use(cors());

// Here, we are adding the JWT authorization

const jwt = require('jsonwebtoken')
const jwtKey = 'e-comm'





app.post("/register", async (req, resp) => {
    try {
        let user = new Users(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        if (result) {
            jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Somthing went wrong" })
                } else {
                    resp.send({ result, auth: token });
                    // resp.send(result);
                }
            })
        } else {
            resp.send({ result: 'No user found' });
        }
    } catch (error) {
        resp.status(500).send({ error: "Internal Server Error" });
    }
});

app.post("/login", async (req, resp) => {
    try {
        if (req.body.password && req.body.email) {
            let user = await Users.findOne(req.body).select("-password");
            if (user) {
                jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        resp.send({ result: "Somthing went wrong" })
                    } else {
                        resp.send({ user, auth: token });
                    }
                })
            } else {
                resp.send({ result: 'No user found' });
            }
        } else {
            resp.send({ result: "No user found" });
        }
    } catch (error) {
        resp.status(500).send({ error: "Internal Server Error" });
    }
});

app.post("/add", verifyToken, async (req, resp) => {
    try {
        let product = new Product(req.body);
        let result = await product.save();
        resp.send(result);
    } catch (error) {
        resp.status(500).send({ error: "Internal Server Error" });
    }
});

app.get("/products", verifyToken, async (req, resp) => {
    try {
        let products = await Product.find();
        if (products.length > 0) {
            resp.send(products);
        } else {
            resp.send({ result: "No products found" });
        }
    } catch (error) {
        resp.status(500).send({ error: "Internal Server Error" });
    }
});

app.delete("/products/:id", verifyToken, async (req, resp) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.id });
        resp.send(result);
    } catch (error) {
        resp.status(500).send({ error: "Internal Server Error" });
    }
});

app.get("/products/:id", verifyToken, async (req, resp) => {
    try {
        let result = await Product.findOne({ _id: req.params.id });
        if (result) {
            resp.send(result);
        } else {
            resp.send({ result: "No record found" });
        }
    } catch (error) {
        resp.status(500).send({ error: "Internal Server Error" });
    }
});

app.put("/products/:id", async (req, resp) => {
    try {
        let result = await Product.updateOne(
            { _id: req.params.id }, { $set: req.body }
        );
        resp.send(result);
    } catch (error) {
        resp.status(500).send({ error: "Internal Server Error" });
    }
});

app.get("/search/:key", verifyToken, async (req, resp) => {
    try {
        let result = await Product.find({
            "$or": [
                { name: { $regex: req.params.key } },
                { company: { $regex: req.params.key } },
                { category: { $regex: req.params.key } },
                { price: { $regex: req.params.key } }
            ]
        });
        resp.send(result);
    } catch (error) {
        resp.status(500).send({ error: "Internal Server Error" });
    }
});


function verifyToken(req, resp, next) {
    let token = req.headers['authorization']
    // next()
    if (token) {
        // Now, separating the keyword "bearer"
        token = token.split(' ')[1]
        // console.log("Middleware called", token)
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send("Please provide valid token")
            } else {
                next()
            }
        })
    } else {
        resp.status(403).send({ result: "Please add token with header" })
    }
}

app.listen(4500, (err) => {
    if (err) {
        console.error("Error found ", err);
    } else {
        console.log("Port is running on 4500");
    }
});
