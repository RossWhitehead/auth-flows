## Auth Code Flow

![Auth Code Flow diagram](../docs/auth-sequence-auth-code.png)

Use for private apps, which can seurely store the client id and secret.

1. The user clicks Login within the regular web application.

2. Auth0's SDK redirects the user to the Auth0 Authorization Server (/authorize endpoint).

3. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.

4. The user authenticates using one of the configured login options and may see a consent page listing the permissions Auth0 will give to the regular web application.

5. Your Auth0 Authorization Server redirects the user back to the application with an authorization code, which is good for one use.

6. Auth0's SDK sends this code to the Auth0 Authorization Server (/oauth/token endpoint) along with the application's Client ID and Client Secret.

7. Your Auth0 Authorization Server verifies the code, Client ID, and Client Secret.

8. Your Auth0 Authorization Server responds with an ID Token and Access Token (and optionally, a Refresh Token).

9. Your application can use the Access Token to call an API to access information about the user.

10. The API responds with requested data.
