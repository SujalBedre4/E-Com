import Nav from "./Components/navbar"
import Footer from "./Components/footer"
import Signup from "./Components/signup"
import PrivateComponent from "./Components/PrivateComponent"
import Login from "./Components/Login"
import StaticProduct from "./Components/StaticProduct"
import UpdateProduct from "./Components/updateProcut"
import './App.css'

import Product from "./Components/AddProduct"

import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>

          {/* Here, we don't wanna to give an access to the other components unles or untill the user gets login */}
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<StaticProduct />} />
            <Route path="/add" element={<Product />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Here, we are adding Logout Components</h1>} />
            <Route path="/logout" element={<h1>Here, we are adding Logout Components</h1>} />
            <Route path="/profile" element={<h1>Here, we are adding Profile Components</h1>} />
          </Route>

          <Route path="/*" element={<h1>Here, we are adding ErrorPage Components</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter >
      <Footer />
    </>
  )
}

export default App
