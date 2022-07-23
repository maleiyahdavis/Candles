const BASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/candles-dev'

export const fetchCandles = async () => {
   try {
     const response = await fetch(`http://localhost:4000/api/candles`,{
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

 export const registerUser = async (username, pwd) => {
    try{
        const response = await fetch(`http://localhost:4000/api/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: pwd
                }
            })
        })
        const result = await response.json()
        console.log('result: ', result)
        if(result.success) {
            localStorage.setItem('token', result.data.token)
            return result
        }
    }
    catch(err) {console.log(err)}
 
}
