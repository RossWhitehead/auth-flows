const axios = require('axios')
require('dotenv').config()

const authDomain = process.env.AUTH_DOMAIN
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const apiURL = process.env.API_URL

const tokenEndpoint = `https://${authDomain}/oauth/token`

const main = async () => {
    try {
        // Authenticate with client ID + client token to /token endpoint
        const tokenResponse = await axios({
            method: 'post',
            url: tokenEndpoint,
            headers: { 'content-type': 'application/json' },
            data: {
                client_id: clientId,
                client_secret: clientSecret,
                audience: 'https://localhost:8080',
                grant_type: 'client_credentials'
            }
        })
    
        console.log(tokenResponse.data)
    
        const tokenType = tokenResponse.data.token_type
        const accessToken = tokenResponse.data.access_token
    
        // Request data with access token
        const apiResponse = await axios({
            method: 'get',
            url: apiURL,
            headers: { authorization: `${tokenType} ${accessToken}` },
        })
    
        console.log(apiResponse.data)
    
    } catch (error) {
        console.log(error)
    }
}

main()


