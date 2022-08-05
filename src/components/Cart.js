import React from 'react'
import{useEffect, useState} from 'react'

const Cart = ({userData}) => {

    const [cart, setCart] = useState()

    const addToCart = async() => {
        try {
            const response = await fetch("http://localhost:4000/api/orders/cart", {
              method: "POST", 
              headers: {
                "Content-Type": "application/json",
                
              },
              body: JSON.stringify({})
              
        
    })
    //const result = await response.json();
    console.log("response", response)
    //console.log(result); 
            
        } catch (error) {
            console.log(error);
        }
}
useEffect(() => {
    addToCart(); 
       
},[]);

    return (
        <div className="App">
            <h1>Hello</h1>
            {/* <Nav cart={cart} emptyCart={emptyCart}/>
            <Grid centered stackable padded relaxed>
                <Grid.Column className='left-column' width={5}>
                    <LeftPanel />
                </Grid.Column>
                <Grid.Column width={9}>
                    <ProductContainer 
                        addToCart={addToCart} 
                    />
                </Grid.Column>
            </Grid>
            <Footer /> */}
        </div>
  );

}

export default Cart;