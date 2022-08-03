import React, {useEffect, useState} from 'react';
import {fetchCandles, fetchSingleCandle} from '../api/index'
import {useHistory, Route, Switch, Link} from "react-router-dom"
import RenderSingleCandle from './RenderSingleCandle'
import '../style/RenderAllCandles.css'

const RenderAllCandles = ({setSingleCandle}) => {
    const [candles, setCandles] = useState([])
    
    const history = useHistory();

    const getSelectedCandle = async(can) => {
        try {
            const candle = await fetchSingleCandle(can.id)
            console.log(candle)
            setSingleCandle(candle)
            history.push(`/candles/:${candle.id}`)
            
            
        } catch (error) {
            console.log(error)
        }
    }

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
    }, [])

    return (
        <div className="candles">
           <h1>Candles:</h1> 
           
           <div className="candles_map">
               
           {
              
               candles.map((candle, index) => {
                   return (
                      <div key={index}>
                       <h3>{candle.name}</h3>
                        <p>Description: {candle.description}</p>
                        <p>Price: {candle.price}</p>
                        
                        <button onClick={()=>{getSelectedCandle(candle)}}>View</button>

                      </div>
                   )
               })
           }
           </div>
           {/* <Switch>
           <Route path='/candles/:id'><RenderSingleCandle/></Route>
           </Switch> */}
        </div>
        
    );
};

export default RenderAllCandles;