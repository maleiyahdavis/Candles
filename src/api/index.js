const BASE_URL = 'https://lit-coast-12281.herokuapp.com/api'  || 'http://localhost:4000';
//'https://lit-coast-12281.herokuapp.com'
//
//|| 'postgres://localhost:5432/candles-dev';

//process.env.DATABASE_URL || 'postgres://localhost:5432/candles-dev'


export const fetchCandles = async () => {
   try {
     const response = await fetch(`${BASE_URL}/candles`,{
       headers: {
           'Content-Type': 'application/json'
       }
       })
     const result = await response.json()
     
     //console.log("result:", result);
     return result
    
     
 } catch (error) {
     console.log(error)
 }
 }

 export const fetchSingleCandle = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/candles/${id}`,{
        headers: {
            'Content-Type': 'application/json'
        }
        })
      const result = await response.json()
      
      //console.log("result:", result);
      return result
     
      
  } catch (error) {
      console.log(error)
  }
  }

const registerUser = async (firstName, lastName, username, password, email) => {
    console.log("input", firstName, lastName, username, password, email)
    try{
        const response = await fetch(`${BASE_URL}/user/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password,
                    firstName: firstName, 
                    lastName: lastName, 
                    email: email
                }
            })
        })
        const result = await response.json()
        console.log("result", result.name)
        console.log("am I getting here?")
        return result
        
    }
    catch(err) {console.log(err)}
 
}


// const CheckForToken = async (username, password) => {
//     console.log("checking in here...", username)
//    const response = await fetch(`${BASE_URL}/user/login`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             user: {
//             password,
//             username,
//             }
//         })
//         })
//         const result = await response.json();
//         console.log(result)
//         return result
// }

export {registerUser};