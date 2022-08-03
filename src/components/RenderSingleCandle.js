import React from 'react';
import {useHistory, Link} from "react-router-dom"

const RenderSingleCandle = ({singleCandle, setSingleCandle}) => {
    const history = useHistory();
    console.log("outside",singleCandle)
    return (
        <div>
            
           <h1>{singleCandle.name}</h1>
           <p>{singleCandle.description}</p>
           <p><b>Price:</b> {singleCandle.price}</p>
           <img src={singleCandle.imageURL}></img>
           <br></br>
            {singleCandle.inStock ? <button>Add to Cart</button> : <p>Out of stock</p>}
           <button onClick={()=>{setSingleCandle({});  console.log("inside",singleCandle) }}><Link to='/candles'>Return to Shop</Link></button>
        </div>
    );
};

export default RenderSingleCandle;