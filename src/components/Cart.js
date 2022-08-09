import React from 'react'
import{useEffect, useState} from 'react'

const Cart = ({singleCandle}) => {

    console.log(singleCandle)


    if(singleCandle.name){
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
    
  else{
    return <h1>Cart Empty</h1>
  }
  

}

export default Cart;