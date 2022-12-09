import Item from "./Item.js"
//import axios from 'axios';

function Cart(props) {
  const {items, updateCart} = props
  
  return (
    <div className="Cart">
      {items.map( item => (
        <Item key={item.id} item={item} updateCart={updateCart}/>
      ))} 
    </div>
  );
}

export default Cart;