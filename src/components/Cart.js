import React from 'react'
import{useEffect, useState} from 'react'

const Cart = ({singleCandle}) => {

    const [cart, setCart] = useState()

    const addToCart = async() => {
     

    }
useEffect(() => {
    addToCart(); 
       
},[]);

    return (
        <div className="App">
            <h1>Cart</h1>
            <p><b>Candle name: </b>{singleCandle.name}</p>
           <p><b>Price:</b> {singleCandle.price}</p>
           <p><b>Quantity: </b>1</p>
           <img src={singleCandle.imageURL}></img>
           <br></br>
           <button>Checkout</button>
        </div>
  );

}

export default Cart;