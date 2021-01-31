## Client Credentials Flow

![Client Credentials Flow diagram](../docs/auth-sequence-client-credentials.png)

Used for machine-to-machine applications, such as CLIs, daemons, and backend services.

The application is both the client and the resource owner.

1. The application authenticates with the authorization server using it's Client ID and Secret.

2. The authorization server validates the Client ID and Secret.

3. The authorization server responds with an access token.

4. The application uses the access token to request a resource from the resource server.

5. The resource server validates the access token.

6. The resource server responds with the resource.

### Client Requests

The application authenticates with the authorization server using it's Client ID and Secret.

```bash
domain=<YOUR_DOMAIN>
client_id=<YOUR_CLIENT_ID>
client_secret=<YOUR_CLIENT_SECRET>
audience=<YOUR_AUDIENCE>

curl --request POST \
  --url "https://${domain}/oauth/token" \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=client_credentials \
  --data client_id=$client_id \
  --data client_secret=$client_secret \
  --data audience=$audience
```

The authorization server responds with an access token.

```json
{
    "access_token":"eyJhbGciOiJ...",
    "scope":"read:all",
    "expires_in":86400,
    "token_type":"Bearer"
}
```

The application uses the access token to request a resource from the resource server.

```bash
access_token=<ACCESS_TOKEN>

curl --request GET \
  --url https://myapi.com/api \
  --header 'authorization: Bearer ${access_token}' \
  --header 'content-type: application/json'
```

### Resource Server Access Token Validation

1. Perform standard JWT validation.
    * Check that the JWT is well formed.
    * Check the signature.
    * Check the standard claims
2. Verify token audience claims.
3. Verify permissions (scopes).

