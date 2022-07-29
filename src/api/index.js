const BASE_URL = 'https://lit-coast-12281.herokuapp.com' || 'postgres://localhost:5432/candles-dev';
//process.env.DATABASE_URL 
//|| 'postgres://localhost:5432/candles-dev';

//process.env.DATABASE_URL || 'postgres://localhost:5432/candles-dev'


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

const registerUser = async (firstName, lastName, username, pwd, email) => {
    console.log("input", firstName, lastName, username, pwd, email)
    //try{
        const response = await fetch(`${BASE_URL}/api/user/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: pwd,
                    firstName: firstName, 
                    lastName: lastName, 
                    email: email
                }
            })
        }).then(response => {console.log(response); response.json()})
        .then(result => {
            console.log("RESULT", result)

        }).catch(console.error);
        // const result = await response.json()
        // console.log("am I getting here?")
        // console.log('result: ', result)

    //     if(result.success) {
    //         localStorage.setItem('token', result.data.token)
    //         return result
    //     }
    // }
    // catch(err) {console.log(err)}
 
}


const CheckForToken = async (username, password) => {

   await fetch(`http://localhost:4000/api/user/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
            username: username,
            password: password
            }
        })
        }).then(response => response.json())
        .then(result => {
            console.log("result", result)
            return result;
        })
        .catch(console.error);
}

export {registerUser, CheckForToken};