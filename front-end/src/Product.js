import axios from 'axios';

function Product(props) {
  const {product, updateCart, setError} = props
  
  const addToCart = async(productID) => {
    try {
      await axios.post("/api/cart/" + productID);
      updateCart();
    } catch(error) {
      setError("Error adding product to cart.");
    }
  };
  
  return (
    <div className="Product">
      <p>
      {product.name}, {product.price}   </p>
      <button onClick={e => addToCart(product.id)}>Interested</button>
      
    </div>
  );
}

export default Product;