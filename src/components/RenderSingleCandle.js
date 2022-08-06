import React from 'react';
import {useHistory, Link} from "react-router-dom"


const RenderSingleCandle = ({singleCandle, setSingleCandle, isLoggedIn}) => {
    const history = useHistory();
    console.log("outside",singleCandle)
    return (
        <form method="POST" onSubmit={async (e)=>{
            e.preventDefault();
            const response = await fetch(`http://localhost:4000/api/orders`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      user: {
                          //FIND OUT WHAT TO PASS IN FOR USER ID
                        userId: 1
                      },
                      candle: {
                        productId: singleCandle.id, 
                        price: singleCandle.price, 
                        quantity: 1,
                      },
                      order: {
                          status: 'created'
                      }
                    }),
                  });
                  const result = response.json();
                 console.log(result);
                 history.push('/cart');
                
        }}>
            
           <h1>{singleCandle.name}</h1>
           <p>{singleCandle.description}</p>
           <p><b>Price:</b> {singleCandle.price}</p>
           <img src={singleCandle.imageURL}></img>
           <br></br>
            {(singleCandle.inStock && isLoggedIn) ? 
            <button type='submit'>Add to Cart</button> : <p>Please login to purchase</p>}
            {singleCandle.inStock ? '': <p>Out of stock</p>}
           <button onClick={()=>{setSingleCandle({});  console.log("inside",singleCandle) }}><Link to='/candles'>Return to Shop</Link></button>
        </form>
    );
};

export default RenderSingleCandle;