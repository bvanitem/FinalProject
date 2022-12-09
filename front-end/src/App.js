import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from "./Product.js"
import Cart from "./Cart.js"
import './App.css';

function App() {
  // setup state
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  var update = false;

  const fetchProducts = async() => {
    try {      
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch(error) {
      setError("error retrieving products: " + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchProducts();
  },[]);

  const fetchCart = async() => {
    try {      
      const response = await axios.get("/api/cart");
      setCart(response.data);
    } catch(error) {
      setError("error retrieving cart: " + error);
    }
  }
  
  const updateCart = async() => {
    update = true;
    fetchCart();
  }
  
  useEffect(() => {
    fetchCart();
  },[update]);
  
  // render results
  return (
    <div className="App">
      {error}
      <div id="topBar">
      <h1>SunDance Exotics!</h1>
      <h2>West Coast's Most Recognized Luxury Auto Broker</h2>
      </div>
      <h2 id="productIntro">The choice is yours:</h2>
      <form>
         <button type="submit" formaction="#cartIntro">Jump To Your Vehicles of Interest</button>
      </form>
      <div id="productList">
      {products.map( product => (
        <div class="item">
            <img class="mainimages" src={product.image} alt="Car"/>
            <Product key={product.id} product={product} updateCart={updateCart} setError={setError}/>
        </div>
      ))} 
      </div>
      <h1 id="cartIntro">Receive Information About These Vehicles:</h1>
      <Cart items={cart} updateCart={updateCart}/> 
    </div>
  );
}

export default App;
