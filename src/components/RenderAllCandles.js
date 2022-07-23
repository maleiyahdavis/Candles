import React, {useEffect, useState} from 'react';
import {fetchCandles} from '../api/index'

const RenderAllCandles = ({allCandles}) => {
    const [candles, setCandles] = useState([])

    useEffect(() => {
       const fetchAllCandles = async () => {
           try {
            const response = await fetchCandles()
            //console.log(response);
            setCandles(response)
           } catch (error) {
              console.error("Error fetching all candles") 
           }
       }
       fetchAllCandles()
    })

    return (
        <div>
           <h1>Candles:</h1> 
           
           <div className="candles_map">
               
           {
              
               candles.map((candle, index) => {
                   return (
                      <div key={index}>
                        <h3>{candle.name}</h3>
                        <p>Description: {candle.description}</p>
                        <p>Price: {candle.price}</p>
                      </div> 
                   )
               })
           }
           </div>
           
           
        </div>
    );
};

export default RenderAllCandles;